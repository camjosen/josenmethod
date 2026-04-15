import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { auth } from '../auth';
import { client } from '../api';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await client.users.profile.$get();
      if (!res.ok) {
        const err = await res.json() as { message: string };
        throw new Error(err.message);
      }
      return res.json();
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await client.auth.logout.$post({});
    },
    onSettled() {
      auth.clearToken();
      navigate('/login');
    },
  });

  function handleLogout() {
    logout.mutate();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-destructive">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">josenmethod</h1>
          <button
            onClick={handleLogout}
            disabled={logout.isPending}
            className="inline-flex items-center justify-center rounded-md px-3 h-8 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 text-muted-foreground"
          >
            {logout.isPending ? 'Signing out…' : 'Sign out'}
          </button>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                {profile?.name
                  ? profile.name.charAt(0).toUpperCase()
                  : profile?.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-semibold leading-none tracking-tight">
                  {profile?.name ?? 'Your profile'}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 space-y-4">
            <Field label="Email" value={profile!.email} />
            {profile?.name && <Field label="Name" value={profile.name} />}
            <Field
              label="Member since"
              value={new Date(profile!.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

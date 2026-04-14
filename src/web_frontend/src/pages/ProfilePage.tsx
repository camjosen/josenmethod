import { useNavigate } from 'react-router-dom';
import { auth } from '../auth';
import { trpc } from '../trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const logout = trpc.auth.logout.useMutation();

  const { data: profile, isLoading, error } = trpc.users.getProfile.useQuery();

  function handleLogout() {
    logout.mutate(undefined, {
      onSettled() {
        auth.clearToken();
        navigate('/login');
      },
    });
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
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={logout.isPending}
            className="text-muted-foreground"
          >
            {logout.isPending ? 'Signing out…' : 'Sign out'}
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                {profile?.name
                  ? profile.name.charAt(0).toUpperCase()
                  : profile?.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-base">
                  {profile?.name ?? 'Your profile'}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

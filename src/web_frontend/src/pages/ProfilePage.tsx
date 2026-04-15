import { useAuth } from '@workos-inc/authkit-react';
import { useState } from 'react';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  function handleSignOut() {
    setIsSigningOut(true);
    signOut();
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  // Build display name from WorkOS user object
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || null;

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">josenmethod</h1>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="inline-flex items-center justify-center rounded-md px-3 h-8 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 text-muted-foreground"
          >
            {isSigningOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <div className="flex items-center gap-3">
              {user.profilePictureUrl ? (
                <img
                  src={user.profilePictureUrl}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                  {displayName
                    ? displayName.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-base font-semibold leading-none tracking-tight">
                  {displayName ?? 'Your profile'}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 space-y-4">
            <Field label="Email" value={user.email} />
            {displayName && <Field label="Name" value={displayName} />}
            <Field label="User ID" value={user.id} />
            {user.createdAt && (
              <Field
                label="Member since"
                value={new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

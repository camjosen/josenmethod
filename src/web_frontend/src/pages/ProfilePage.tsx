import { useAuth } from "@workos-inc/authkit-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useApiClient } from "../api";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const client = useApiClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await client.accounts.profile.$get();
      if (!res.ok) {
        const err = (await res.json()) as { message: string };
        throw new Error(err.message);
      }
      return res.json();
    },
    enabled: !!user,
  });

  async function handleSignOut() {
    setIsSigningOut(true);
    await signOut();
  }

  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        {error instanceof Error ? error.message : "Failed to load profile"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            josenmethod
          </h1>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="inline-flex items-center justify-center rounded-md px-3 h-8 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 text-muted-foreground"
          >
            {isSigningOut ? "Signing out…" : "Sign out"}
          </button>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                {(profile.displayName ?? profile.email).charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-semibold leading-none tracking-tight">
                  {profile.displayName ?? "Your profile"}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 space-y-4">
            <Field label="Email" value={profile.email} />
            {profile.displayName && (
              <Field label="Name" value={profile.displayName} />
            )}
            <Field
              label="Member since"
              value={new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

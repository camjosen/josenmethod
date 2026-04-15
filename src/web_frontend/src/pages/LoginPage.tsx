import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    window.location.href = 'http://localhost:3001/auth/workos';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
      Redirecting to sign in…
    </div>
  );
}

import { useAuth } from '@workos-inc/authkit-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CallbackPage() {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // AuthKitProvider handles the OAuth callback automatically.
    // Once the user is loaded, redirect to the profile page.
    if (!isLoading && user) {
      navigate('/me', { replace: true });
    }
  }, [isLoading, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
      Signing you in…
    </div>
  );
}

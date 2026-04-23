import { useAuth } from '@workos-inc/authkit-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { isLoading, user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      navigate('/me', { replace: true });
      return;
    }
    signIn();
  }, [isLoading, user, signIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
      Redirecting to sign in…
    </div>
  );
}

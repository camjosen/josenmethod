import { useAuth } from '@workos-inc/authkit-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CallbackPage from './pages/CallbackPage';
import HostPage from './pages/HostPage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ReadingExercisePage from './pages/ReadingExercisePage';
import SessionIndexPage from './pages/SessionIndexPage';
import StudentSessionPage from './pages/StudentSessionPage';
import TeacherSessionPage from './pages/TeacherSessionPage';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/reading-exercise" element={<ReadingExercisePage />} />
        <Route path="/session" element={<SessionIndexPage />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/teacher/:code" element={<TeacherSessionPage />} />
        <Route path="/student/:code" element={<StudentSessionPage />} />
        <Route
          path="/me"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useEffect } from 'react';

function UserProfile() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
  }, [user, navigate])

  return (
    <>
      <h1>User Profile</h1>
      {!user && <p>Not Logged In. Redirecting...</p>}
      {user && <p>Name: {user.name}</p>}
      {user && <p>Name: {user.email}</p>}
    </>
  );
}

export default UserProfile;

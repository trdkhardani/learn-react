import { useUserStore } from '../stores/useUserStore';

function Home() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <h1>Home</h1>
      { user?.sessionId && <p>Welcome, {user.name}!</p> }
    </>
  );
}

export default Home;

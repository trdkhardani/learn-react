import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from './stores/useCartStore';
import { useUserStore } from './stores/useUserStore';

function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/')
  }

  let cartItemsTotal = 0;
  for (const cartItem of cartItems) {
    cartItemsTotal += cartItem.quantity
  }

  return (
    <header>
      <nav>
        <Link to="/"><strong>Home</strong></Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">{cartItemsTotal > 0 ? `Cart (${cartItemsTotal})` : 'Cart'}</Link>
        { user?.sessionId ? <Link to="/profile">{user.name}</Link> : <Link to="/login">Login</Link>}
        { user?.sessionId && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  )
}

export default Navbar
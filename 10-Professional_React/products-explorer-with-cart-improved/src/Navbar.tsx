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
        <Link aria-label='Link to Home Page' to="/"><strong>Home</strong></Link>
        <Link aria-label='Link to Products Page' to="/products">Products</Link>
        <Link data-testid="cart-nav-link" aria-label='Link to Cart Page' to="/cart">{cartItemsTotal > 0 ? `Cart (${cartItemsTotal})` : 'Cart'}</Link>
        { user?.sessionId ? <Link to="/profile">{user.name}</Link> : <Link aria-label='Link to Login Page' to="/login">Login</Link>}
        { user?.sessionId && <button aria-label='Logout Button' onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  )
}

export default Navbar
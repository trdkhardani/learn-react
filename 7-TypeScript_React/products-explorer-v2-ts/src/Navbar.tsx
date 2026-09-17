import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <nav>
        <Link to="/"><strong>Home</strong></Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}

export default Navbar
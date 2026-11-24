import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Search, ShoppingBag } from 'lucide-react';
import './Header.css';

export default function Header({ onCartToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header" role="banner">
      <button className="header-brand" onClick={() => navigate('/')} aria-label="Mother's Kitchen home">
        <img src="/logo.png" alt="" className="header-brand-logo" />
        <span>Mother's Kitchen</span>
      </button>

      <nav className="header-nav" aria-label="Customer navigation">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/menu')}>Menu</button>
        <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About Us</button>
        <button onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>Reviews</button>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button>
      </nav>

      <form className="header-search" onSubmit={handleSearch} role="search">
        <Search size={18} className="header-search-icon" />
        <input
          type="search"
          className="header-search-input"
          placeholder="Search for delicious food & drinks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for food"
          id="header-search"
        />
      </form>

      <div className="header-right">
        <button
          className="header-icon-btn"
          onClick={onCartToggle}
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <ShoppingBag size={20} />
          {itemCount > 0 && <span className="header-badge">{itemCount}</span>}
        </button>

      </div>
    </header>
  );
}

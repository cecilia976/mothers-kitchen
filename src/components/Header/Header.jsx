import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Search, Bell, ShoppingBag, Menu, MapPin, ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header({ onMenuToggle, onCartToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'G';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        <div className="header-location" tabIndex={0} role="button" aria-label="Change delivery location">
          <MapPin size={20} className="header-location-icon" />
          <div>
            <div className="header-location-label">Deliver to</div>
            <div className="header-location-value">
              218 Baker Street, London
              <ChevronDown size={14} className="header-location-chevron" />
            </div>
          </div>
        </div>
      </div>

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
        <button className="header-icon-btn desktop-only" aria-label="Notifications">
          <Bell size={20} />
          <span className="header-badge">3</span>
        </button>

        <button
          className="header-icon-btn header-cart-btn-mobile"
          onClick={onCartToggle}
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <ShoppingBag size={20} />
          {itemCount > 0 && <span className="header-badge">{itemCount}</span>}
        </button>

        <div
          className="header-avatar"
          onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
          role="button"
          tabIndex={0}
          aria-label={isAuthenticated ? 'Go to profile' : 'Sign in'}
        >
          {isAuthenticated ? getInitials(user?.name) : 'G'}
        </div>
      </div>
    </header>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import {
  HiOutlineMagnifyingGlass, HiOutlineBell, HiOutlineShoppingBag,
  HiOutlineBars3, HiOutlineMapPin, HiOutlineChevronDown
} from 'react-icons/hi2';
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
          <HiOutlineBars3 />
        </button>

        <div className="header-location" tabIndex={0} role="button" aria-label="Change delivery location">
          <HiOutlineMapPin className="header-location-icon" />
          <div>
            <div className="header-location-label">Deliver to</div>
            <div className="header-location-value">
              218 Baker Street, London
              <HiOutlineChevronDown className="header-location-chevron" />
            </div>
          </div>
        </div>
      </div>

      <form className="header-search" onSubmit={handleSearch} role="search">
        <HiOutlineMagnifyingGlass className="header-search-icon" />
        <input
          type="search"
          className="header-search-input"
          placeholder="Search for restaurants or cuisines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for food or restaurants"
          id="header-search"
        />
      </form>

      <div className="header-right">
        <button className="header-icon-btn desktop-only" aria-label="Notifications">
          <HiOutlineBell />
          <span className="header-badge">3</span>
        </button>

        <button
          className="header-icon-btn header-cart-btn-mobile"
          onClick={onCartToggle}
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <HiOutlineShoppingBag />
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

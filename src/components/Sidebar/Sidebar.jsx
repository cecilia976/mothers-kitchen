import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import {
  HiOutlineHome, HiOutlineBuildingStorefront, HiOutlineSquares2X2,
  HiOutlineHeart, HiOutlineClipboardDocumentList, HiOutlineMapPin,
  HiOutlineUser, HiOutlineCog6Tooth, HiOutlineXMark,
  HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';
import './Sidebar.css';

const navItems = [
  { to: '/', label: 'Home', icon: HiOutlineHome },
  { to: '/restaurants', label: 'Restaurants', icon: HiOutlineBuildingStorefront },
  { to: '/categories', label: 'Categories', icon: HiOutlineSquares2X2 },
  { to: '/favorites', label: 'Favorites', icon: HiOutlineHeart },
  { to: '/orders', label: 'Orders', icon: HiOutlineClipboardDocumentList },
  { to: '/addresses', label: 'Addresses', icon: HiOutlineMapPin },
];

const bottomItems = [
  { to: '/profile', label: 'Profile', icon: HiOutlineUser },
  { to: '/settings', label: 'Settings', icon: HiOutlineCog6Tooth },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Main navigation">
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <HiOutlineXMark />
        </button>

        <div className="sidebar-brand">
          <img src="/logo.png" alt="Mother's Kitchen" className="sidebar-brand-logo" />
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">Mother's Kitchen</span>
            <span className="sidebar-brand-tagline">Every Meal Feels Like Home</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-nav-label">Menu</span>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
              end={item.to === '/'}
            >
              <span className="sidebar-link-icon"><item.icon /></span>
              {item.label}
              {item.label === 'Orders' && itemCount > 0 && (
                <span className="sidebar-link-badge">{itemCount}</span>
              )}
            </NavLink>
          ))}

          <span className="sidebar-nav-label" style={{ marginTop: '8px' }}>Account</span>
          {bottomItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon"><item.icon /></span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-promo">
          <div className="sidebar-promo-title">Get 50% OFF</div>
          <div className="sidebar-promo-text">on your first order!</div>
          <span className="sidebar-promo-code">WELCOME50</span>
        </div>

        {isAuthenticated ? (
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {getInitials(user?.name)}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'Guest'}</div>
              <div className="sidebar-user-email">{user?.email || ''}</div>
            </div>
            <button
              onClick={logout}
              style={{ color: 'var(--color-text-muted)', padding: '4px' }}
              aria-label="Logout"
              title="Logout"
            >
              <HiOutlineArrowRightOnRectangle size={20} />
            </button>
          </div>
        ) : (
          <div className="sidebar-user">
            <NavLink to="/login" className="sidebar-link" onClick={onClose} style={{ flex: 1 }}>
              <span className="sidebar-link-icon"><HiOutlineArrowRightOnRectangle /></span>
              Sign In
            </NavLink>
          </div>
        )}
      </aside>
    </>
  );
}

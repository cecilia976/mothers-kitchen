import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Home, Search, Heart, User, Menu } from 'lucide-react';
import './BottomNav.css';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/menu', label: 'Menu', icon: Menu },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <div className="bottom-nav-list">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              <Icon size={22} className="bottom-nav-icon" />
              <span>{item.label}</span>
              {item.label === 'Profile' && itemCount > 0 && (
                <span className="bottom-nav-badge">{itemCount}</span>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

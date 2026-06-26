import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import {
  HiOutlineHome, HiOutlineMagnifyingGlass,
  HiOutlineHeart, HiOutlineClipboardDocumentList, HiOutlineUser
} from 'react-icons/hi2';
import './BottomNav.css';

const items = [
  { to: '/', label: 'Home', icon: HiOutlineHome },
  { to: '/search', label: 'Search', icon: HiOutlineMagnifyingGlass },
  { to: '/favorites', label: 'Favorites', icon: HiOutlineHeart },
  { to: '/orders', label: 'Orders', icon: HiOutlineClipboardDocumentList },
  { to: '/profile', label: 'Profile', icon: HiOutlineUser },
];

export default function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <div className="bottom-nav-list">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            end={item.to === '/'}
          >
            <item.icon className="bottom-nav-icon" />
            <span>{item.label}</span>
            {item.label === 'Orders' && itemCount > 0 && (
              <span className="bottom-nav-badge">{itemCount}</span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

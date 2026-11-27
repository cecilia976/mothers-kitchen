import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Home, Menu, ShoppingBag } from 'lucide-react';
import './BottomNav.css';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/menu', label: 'Menu', icon: Menu },
  { to: '/checkout', label: 'Cart', icon: ShoppingBag },
];

export default function BottomNav({ onCartToggle }) {
  const { itemCount } = useCart();
  const { pathname } = useLocation();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    setFooterVisible(false);
    const footer = document.querySelector('.footer-section');
    if (!footer) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      className={`bottom-nav${footerVisible ? ' bottom-nav--footer-visible' : ''}`}
      aria-label="Bottom navigation"
      aria-hidden={footerVisible}
    >
      <div className="bottom-nav-list">
        {items.map(item => {
          const Icon = item.icon;
          return (
            item.label === 'Cart' ? (
              <button
                key={item.to}
                type="button"
                className="bottom-nav-item"
                onClick={onCartToggle}
              >
                <Icon size={22} className="bottom-nav-icon" />
                <span>{item.label}</span>
                {itemCount > 0 && <span className="bottom-nav-badge">{itemCount}</span>}
              </button>
            ) : (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              <Icon size={22} className="bottom-nav-icon" />
              <span>{item.label}</span>
              {item.label === 'Cart' && itemCount > 0 && (
                <span className="bottom-nav-badge">{itemCount}</span>
              )}
            </NavLink>
            )
          );
        })}
      </div>
    </nav>
  );
}

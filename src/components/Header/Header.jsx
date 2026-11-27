import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Search, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import './Header.css';

export default function Header({ onCartToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname === '/menu' ? 'menu' : 'home');
      return undefined;
    }

    const sectionIds = ['home', 'menu', 'about', 'reviews', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] });

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSection = (section) => {
    setActiveSection(section);
    setMobileOpen(false);
    if (section === 'home') {
      navigate('/');
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      return;
    }
    if (section === 'menu') {
      if (location.pathname !== '/') {
        navigate('/');
        window.setTimeout(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      } else {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const links = [
    ['home', 'Home'],
    ['menu', 'Menu'],
    ['about', 'About Us'],
    ['reviews', 'Reviews'],
    ['contact', 'Contact'],
  ];

  return (
    <header className="header" role="banner">
      <button className="header-brand" onClick={() => navigate('/')} aria-label="Mother's Kitchen home">
        <img src="/logo.png" alt="" className="header-brand-logo" />
        <span>Mother's Kitchen</span>
      </button>

      <nav className="header-nav" aria-label="Customer navigation">
        {links.map(([section, label]) => (
          <button
            key={section}
            className={activeSection === section ? 'active' : ''}
            aria-current={activeSection === section ? 'location' : undefined}
            onClick={() => handleSection(section)}
          >
            {label}
          </button>
        ))}
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
          className="header-mobile-menu"
          onClick={() => setMobileOpen(open => !open)}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
        <button
          className="header-icon-btn"
          onClick={onCartToggle}
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <ShoppingBag size={20} />
          {itemCount > 0 && <span className="header-badge">{itemCount}</span>}
        </button>
      </div>
      {mobileOpen && (
        <nav className="header-mobile-nav" aria-label="Mobile navigation">
          {links.map(([section, label]) => (
            <button
              key={section}
              className={activeSection === section ? 'active' : ''}
              aria-current={activeSection === section ? 'location' : undefined}
              onClick={() => handleSection(section)}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

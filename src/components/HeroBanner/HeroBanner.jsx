import { useNavigate } from 'react-router-dom';
import { ArrowRight, Utensils } from 'lucide-react';
import './HeroBanner.css';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner" id="home" aria-label="Mother's Kitchen home">
      <div className="hero-banner-image-container">
        <img 
          src="/images/hero.jpg"
          alt="A selection of freshly prepared restaurant dishes"
          className="hero-banner-image"
          loading="eager"
        />
        <div className="hero-banner-overlay" />
      </div>
      
      <div className="hero-banner-content">
        <span className="hero-banner-chip"><Utensils size={14} /> Mother's Kitchen</span>
        <h1 className="hero-banner-title">
          Every Meal<br />
          Feels Like <span className="text-highlight">Home.</span>
        </h1>
        <p className="hero-banner-subtitle">
          Experience authentic, comforting recipes crafted with love. Delivered hot and fresh to your door in under 45 minutes.
        </p>
        <div className="hero-banner-actions">
          <button className="btn-primary" onClick={() => navigate('/menu')}>
            Order Now <ArrowRight size={18} />
          </button>
          <button
            className="btn-outline hero-btn-secondary"
            onClick={() => {
              if (window.location.pathname !== '/') {
                navigate('/');
                window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 50);
              } else {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
}

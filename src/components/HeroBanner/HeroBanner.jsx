import { useNavigate } from 'react-router-dom';
import { ArrowRight, Utensils } from 'lucide-react';
import './HeroBanner.css';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="hero-banner animate-fade-in-up">
      <div className="hero-banner-image-container">
        <img 
          src="https://images.unsplash.com/photo-1549488344-c5c25eb662cb?w=1200&h=600&fit=crop" 
          alt="Delicious home cooked meal" 
          className="hero-banner-image"
          loading="lazy"
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
          <button className="btn-outline hero-btn-secondary" onClick={() => navigate('/about')}>
            Our Story
          </button>
        </div>
      </div>
    </div>
  );
}

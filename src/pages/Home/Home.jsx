import { useNavigate } from 'react-router-dom';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Menu from '../Menu/Menu';
import { customerReviews } from '../../data/mockData';
import { Star, ArrowRight, MessageCircle } from 'lucide-react';
import { restaurant } from '../../config/restaurant';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <HeroBanner />
      <Menu embedded />

      <section className="about-section" id="about">
        <div className="about-copy">
          <span className="about-eyebrow">About Mother's Kitchen</span>
          <h2>Good food,<br /><em>great vibes.</em></h2>
          <p>
            Mother's Kitchen brings comforting meals and refreshing drinks together
            in one welcoming menu. Explore familiar favourites, hearty main dishes,
            and something sweet for every appetite.
          </p>
          <button className="about-menu-button" onClick={() => navigate('/menu')}>
            Explore our menu <ArrowRight size={18} />
          </button>
        </div>
        <div className="about-image-wrap">
          <img src="/images/salmon.jpg" alt="Grilled salmon with fresh vegetables" loading="lazy" />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section" id="reviews">
        <div className="reviews-heading">
          <span>Customer reviews</span>
          <h2>What Our Customers Say</h2>
          <p>Real experiences from our guests.</p>
        </div>
        <div className="reviews-grid">
          {customerReviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < review.rating ? 'var(--color-accent)' : 'none'} color="var(--color-accent)" />
                ))}
              </div>
              <p className="review-comment">“{review.comment}”</p>
              <div className="review-author">
                <div className="review-avatar">{review.name[0]}</div>
                <div>
                  <div className="review-name">{review.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section" id="contact">
        <svg className="footer-wave" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0H1440V34C1200 75 1010 84 720 58C430 32 220 80 0 50Z" />
        </svg>
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="Mother's Kitchen" className="footer-logo" />
            <h3 className="footer-title">{restaurant.name}</h3>
            <p className="footer-tagline">{restaurant.tagline}</p>
          </div>
          <div className="footer-contact">
            <p>WhatsApp: {restaurant.whatsappDisplay}</p>
            <a
              className="footer-whatsapp"
              href={`https://wa.me/${restaurant.whatsappInternational}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Continue on WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mother's Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

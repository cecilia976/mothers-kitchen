import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import FoodCard from '../../components/FoodCard/FoodCard';
import { foodItems, drinkItems, todaysSpecials, customerReviews } from '../../data/mockData';
import { Truck, Clock, Star, MapPin, ArrowRight, Quote } from 'lucide-react';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [activeFoodCategory, setActiveFoodCategory] = useState('main-meals');
  const [activeDrinkCategory, setActiveDrinkCategory] = useState('coffee');

  const popularFoods = foodItems.filter(f => f.isPopular).slice(0, 4);
  const popularDrinks = drinkItems.filter(d => d.isPopular).slice(0, 4);
  const specialItems = todaysSpecials.map(s => {
    const item = foodItems.find(f => f.id === s.foodId);
    return { ...item, ...s };
  }).filter(Boolean);

  return (
    <div className="home-page">
      <HeroBanner />

      {/* Quick Info Bar */}
      <div className="info-bar animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="info-card">
          <div className="info-icon bg-orange"><Clock size={24} /></div>
          <div>
            <div className="info-value">Open 8am - 10pm</div>
            <div className="info-label">Everyday access</div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon bg-green"><Truck size={24} /></div>
          <div>
            <div className="info-value">Free Delivery</div>
            <div className="info-label">On orders over $25</div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon bg-blue"><MapPin size={24} /></div>
          <div>
            <div className="info-value">Central London</div>
            <div className="info-label">Delivery within 3 miles</div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon bg-purple"><Star size={24} /></div>
          <div>
            <div className="info-value">4.8★ Avg Rating</div>
            <div className="info-label">Based on 2k+ reviews</div>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      {specialItems.length > 0 && (
        <section className="specials-section">
          <div className="section-header">
            <div>
              <h2 className="section-title text-primary">Today's Specials</h2>
              <p className="section-subtitle">Exclusive deals valid for a limited time</p>
            </div>
          </div>
          <div className="specials-grid">
            {specialItems.map(item => (
              <div key={item.id} className="special-card" onClick={() => navigate(`/food/${item.id}`)}>
                <img src={item.image} alt={item.name} className="special-image" loading="lazy" />
                <div className="special-content">
                  <span className="special-badge">{item.discount}% OFF</span>
                  <h3 className="special-title">{item.name}</h3>
                  <div className="special-price-row">
                    <span className="special-price">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                    <span className="special-price-old">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="special-validity">Valid: {item.validUntil}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Food Items */}
      <section className="highlights-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Most Popular Meals</h2>
            <p className="section-subtitle">Our household favorites ordered by foodies</p>
          </div>
          <button className="section-view-all" onClick={() => navigate('/menu')}>
            See full menu <ArrowRight size={18} />
          </button>
        </div>
        <div className="food-grid">
          {popularFoods.map(food => (
            <FoodCard key={food.id} food={food} type="food" />
          ))}
        </div>
      </section>

      {/* Food Categories */}
      <CategorySlider 
        type="food" 
        activeCategory={activeFoodCategory} 
        onCategoryChange={setActiveFoodCategory} 
      />

      {/* Popular Drinks */}
      <section className="highlights-section" style={{ marginTop: 'var(--space-10)' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Refreshing Drinks & Beverages</h2>
            <p className="section-subtitle">The perfect pairing for your meal</p>
          </div>
          <button className="section-view-all" onClick={() => navigate('/menu')}>
            See drinks menu <ArrowRight size={18} />
          </button>
        </div>
        <div className="food-grid">
          {popularDrinks.map(drink => (
            <FoodCard key={drink.id} food={drink} type="drink" />
          ))}
        </div>
      </section>

      {/* Drinks Categories */}
      <div style={{ marginTop: 'var(--space-10)' }}>
        <CategorySlider 
          type="drinks" 
          activeCategory={activeDrinkCategory} 
          onCategoryChange={setActiveDrinkCategory} 
        />
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2 className="section-title text-center" style={{ marginBottom: 'var(--space-6)' }}>
          What our customers say
        </h2>
        <div className="reviews-grid">
          {customerReviews.map(review => (
            <div key={review.id} className="review-card">
              <Quote className="review-quote-icon" size={32} />
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? 'var(--color-primary)' : 'none'} color="var(--color-primary)" />
                ))}
              </div>
              <p className="review-comment">"{review.comment}"</p>
              <div className="review-author">
                <div className="review-avatar">{review.name[0]}</div>
                <div>
                  <div className="review-name">{review.name}</div>
                  <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join the Mother's Kitchen Family</h2>
          <p>Subscribe to our newsletter to receive weekly specials and a 15% discount on your next order.</p>
          <form className="newsletter-form" onClick={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" aria-label="Email for newsletter" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="Mother's Kitchen" className="footer-logo" />
            <h3 className="footer-title">Mother's Kitchen</h3>
            <p className="footer-tagline">Every Meal Feels Like Home.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="/menu">Our Menu</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/refunds">Refund Policy</a>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>218 Baker Street, London</p>
            <p>hello@motherskitchen.com</p>
            <p>+44 20 7123 4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mother's Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

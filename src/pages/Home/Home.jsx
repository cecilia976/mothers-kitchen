import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import FoodCard from '../../components/FoodCard/FoodCard';
import { restaurants, foodItems } from '../../data/mockData';
import { HiOutlineStar, HiOutlineBuildingStorefront, HiOutlineTruck, HiOutlineClock } from 'react-icons/hi2';
import './Home.css';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFoods = useMemo(() => {
    if (activeCategory === 'all') return foodItems;
    return foodItems.filter(f => f.category === activeCategory);
  }, [activeCategory]);

  const popularFoods = useMemo(() => foodItems.filter(f => f.isPopular), []);
  const featuredRestaurants = useMemo(() => restaurants.filter(r => r.featured), []);

  return (
    <div className="home-page">
      <HeroBanner />

      {/* Quick Stats */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-icon orange"><HiOutlineBuildingStorefront /></div>
          <div>
            <div className="stat-value">200+</div>
            <div className="stat-label">Restaurants</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><HiOutlineTruck /></div>
          <div>
            <div className="stat-value">Free</div>
            <div className="stat-label">Delivery $25+</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><HiOutlineClock /></div>
          <div>
            <div className="stat-value">25 min</div>
            <div className="stat-label">Avg Delivery</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><HiOutlineStar /></div>
          <div>
            <div className="stat-value">4.8★</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategorySlider activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Popular Restaurants */}
      <section className="restaurants-section" aria-label="Popular restaurants">
        <div className="section-header">
          <h2 className="section-title">Popular restaurants</h2>
          <Link to="/restaurants" className="section-view-all">View all</Link>
        </div>
        <div className="restaurant-grid">
          {featuredRestaurants.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* Food Items */}
      <section className="food-section" aria-label="Food items">
        <div className="section-header">
          <h2 className="section-title">
            {activeCategory === 'all' ? 'All dishes' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} dishes`}
          </h2>
        </div>
        <div className="food-grid">
          {filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
        {filteredFoods.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🍽️</div>
            <p>No dishes found in this category yet.</p>
          </div>
        )}
      </section>

      {/* Top Picks */}
      <section className="top-picks-section" aria-label="Top picks for you">
        <div className="section-header">
          <h2 className="section-title">Top picks for you</h2>
          <Link to="/restaurants" className="section-view-all">View all</Link>
        </div>
        <div className="top-picks-scroll">
          {popularFoods.map(food => (
            <div key={food.id} className="top-pick-card">
              <div className="top-pick-image-wrap">
                <img src={food.image} alt={food.name} className="top-pick-image" loading="lazy" />
                {food.isPopular && <span className="top-pick-badge">🔥 Popular</span>}
              </div>
              <div className="top-pick-body">
                <div className="top-pick-name">{food.name}</div>
                <div className="top-pick-meta">
                  <span className="top-pick-price">${food.price.toFixed(2)}</span>
                  <span className="top-pick-rating">
                    <HiOutlineStar /> {food.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FoodCard from '../../components/FoodCard/FoodCard';
import { restaurants, foodItems } from '../../data/mockData';
import { HiOutlineStar, HiOutlineClock, HiOutlineTruck, HiOutlineMapPin } from 'react-icons/hi2';
import './RestaurantDetail.css';

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const foods = useMemo(() => foodItems.filter(f => f.restaurantId === parseInt(id)), [id]);

  if (!restaurant) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">🍽️</span>
        <h3>Restaurant not found</h3>
      </div>
    );
  }

  return (
    <div className="restaurant-detail animate-fade-in">
      <div className="rd-hero">
        <img src={restaurant.image} alt={restaurant.name} className="rd-hero-image" />
        <div className="rd-hero-overlay" />
        <div className="rd-hero-content">
          <h1 className="rd-hero-name">{restaurant.name}</h1>
          <p className="rd-hero-cuisine">{restaurant.cuisine}</p>
          <div className="rd-hero-meta">
            <span className="rd-meta-item"><HiOutlineStar /> {restaurant.rating} ({restaurant.reviewCount})</span>
            <span className="rd-meta-dot" />
            <span className="rd-meta-item"><HiOutlineClock /> {restaurant.deliveryTime}</span>
            <span className="rd-meta-dot" />
            <span className="rd-meta-item"><HiOutlineTruck /> {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee}`}</span>
            <span className="rd-meta-dot" />
            <span className="rd-meta-item"><HiOutlineMapPin /> {restaurant.distance}</span>
          </div>
        </div>
      </div>

      {restaurant.promo && (
        <div className="rd-promo-banner">
          🎉 {restaurant.promo}
        </div>
      )}

      <section className="rd-menu">
        <h2 className="section-title">Menu</h2>
        <div className="food-grid" style={{ marginTop: '20px' }}>
          {foods.map(food => <FoodCard key={food.id} food={food} />)}
        </div>
        {foods.length === 0 && (
          <div className="empty-state" style={{ padding: '48px 0' }}>
            <span className="empty-state-icon">📋</span>
            <h3>Menu coming soon</h3>
            <p>This restaurant is preparing its menu.</p>
          </div>
        )}
      </section>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHeart, HiHeart, HiOutlineStar, HiOutlineClock, HiOutlineTruck } from 'react-icons/hi2';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  return (
    <article
      className="restaurant-card"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      tabIndex={0}
      role="link"
      aria-label={`View ${restaurant.name}`}
    >
      <div className="restaurant-card-image-wrap">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-card-image"
          loading="lazy"
        />
        {restaurant.promo && (
          <span className="restaurant-card-promo">{restaurant.promo}</span>
        )}
        <button
          className={`restaurant-card-favorite ${isFavorited ? 'favorited' : ''}`}
          onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? <HiHeart /> : <HiOutlineHeart />}
        </button>
        {restaurant.tags?.length > 0 && (
          <div className="restaurant-card-tags">
            {restaurant.tags.map(tag => (
              <span key={tag} className="restaurant-card-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="restaurant-card-body">
        <h3 className="restaurant-card-name">{restaurant.name}</h3>
        <p className="restaurant-card-cuisine">{restaurant.cuisine}</p>
        <div className="restaurant-card-meta">
          <span className="restaurant-card-meta-item restaurant-card-rating">
            <HiOutlineStar className="restaurant-card-meta-icon" />
            {restaurant.rating}
          </span>
          <span className="restaurant-card-dot" />
          <span className="restaurant-card-meta-item">
            <HiOutlineClock className="restaurant-card-meta-icon" />
            {restaurant.deliveryTime}
          </span>
          <span className="restaurant-card-dot" />
          <span className="restaurant-card-meta-item">
            <HiOutlineTruck className="restaurant-card-meta-icon" />
            {restaurant.deliveryFee === 0 ? 'Free' : `$${restaurant.deliveryFee}`}
          </span>
        </div>
      </div>
    </article>
  );
}

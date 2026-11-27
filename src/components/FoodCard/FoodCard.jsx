import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Star, Plus } from 'lucide-react';
import './FoodCard.css';

export default function FoodCard({ food, type = 'food' }) {
  const { addItem } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const handleAdd = (e) => {
    e.stopPropagation();
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      type: type, // differentiate if needed
    });
    toast.success(`${food.name} added to cart!`);
  };

  const handleClick = () => {
    navigate(`/${type}/${food.id}`);
  };

  return (
    <article className="food-card" onClick={handleClick} tabIndex={0} aria-label={`View ${food.name}`}>
      <div className="food-card-image-wrap">
        <img
          src={food.image || '/logo.png'}
          alt={food.name}
          className="food-card-image"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/logo.png';
          }}
        />
        <div className="food-card-badges">
          {food.isPopular && <span className="food-card-badge popular">Popular</span>}
          {food.isNew && <span className="food-card-badge new">New</span>}
          {food.originalPrice && (
            <span className="food-card-badge discount">
              -{Math.round((1 - food.price / food.originalPrice) * 100)}%
            </span>
          )}
        </div>
        <button
          className="food-card-add-btn"
          onClick={handleAdd}
          aria-label={`Add ${food.name} to cart`}
          id={`add-food-${food.id}`}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="food-card-body">
        <h3 className="food-card-name">{food.name}</h3>
        <p className="food-card-description">{food.description}</p>
        <div className="food-card-footer">
          <div className="food-card-price">
            <span className="food-card-price-current">${food.price.toFixed(2)}</span>
            {food.originalPrice && (
              <span className="food-card-price-original">${food.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="food-card-rating">
            <Star size={14} className="food-card-rating-icon" />
            {food.rating}
          </div>
        </div>
      </div>
    </article>
  );
}

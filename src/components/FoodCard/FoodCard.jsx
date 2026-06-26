import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { HiOutlineStar, HiPlus } from 'react-icons/hi2';
import './FoodCard.css';

export default function FoodCard({ food }) {
  const { addItem } = useCart();
  const toast = useToast();

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
    });
    toast.success(`${food.name} added to cart!`);
  };

  return (
    <article className="food-card" tabIndex={0} aria-label={food.name}>
      <div className="food-card-image-wrap">
        <img
          src={food.image}
          alt={food.name}
          className="food-card-image"
          loading="lazy"
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
          <HiPlus />
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
            <HiOutlineStar className="food-card-rating-icon" />
            {food.rating}
          </div>
        </div>
      </div>
    </article>
  );
}

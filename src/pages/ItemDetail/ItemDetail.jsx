import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { foodItems, drinkItems, reviews } from '../../data/mockData';
import { Star, Clock, Minus, Plus, ShoppingBag, ArrowLeft, Heart, Info, Flame, ThumbsUp } from 'lucide-react';
import './ItemDetail.css';

export default function ItemDetail({ type = 'food' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useCart();
  const toast = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const item = useMemo(() => {
    const list = type === 'food' ? foodItems : drinkItems;
    return list.find(i => i.id === parseInt(id));
  }, [id, type]);

  const itemReviews = useMemo(() => {
    return reviews.filter(r => r.itemId === parseInt(id) && r.itemType === type);
  }, [id, type]);

  if (!item) {
    return (
      <div className="empty-state">
        <Info size={48} className="empty-state-icon" />
        <h3>Item not found</h3>
        <button className="btn-primary" onClick={() => navigate('/menu')} style={{ marginTop: 16 }}>
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        cart.addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            type: type
        });
    }
    toast.success(`Added ${quantity} ${item.name} to cart`);
  };

  return (
    <div className="item-detail animate-fade-in">
      <button className="btn-outline back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="item-detail-grid">
        <div className="item-image-section">
          <img src={item.image} alt={item.name} className="item-detail-image" />
          <button 
            className={`item-favorite-btn ${isFavorited ? 'active' : ''}`}
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="item-info-section">
          <div className="item-badges">
            {item.isPopular && <span className="badge popular">Popular</span>}
            {item.isNew && <span className="badge new">New</span>}
          </div>
          
          <h1 className="item-title">{item.name}</h1>
          <p className="item-desc">{item.description}</p>
          
          <div className="item-meta">
            <div className="meta-pill">
              <Star size={16} className="text-primary" fill="currentColor" />
              <span>{item.rating} ({item.reviewCount} reviews)</span>
            </div>
            {item.prepTime && (
              <div className="meta-pill">
                <Clock size={16} />
                <span>{item.prepTime}</span>
              </div>
            )}
            {item.calories && (
              <div className="meta-pill">
                <Flame size={16} className="text-error" />
                <span>{item.calories} kcal</span>
              </div>
            )}
          </div>

          <div className="item-price-section">
            <span className="current-price">${item.price.toFixed(2)}</span>
            {item.originalPrice && <span className="old-price">${item.originalPrice.toFixed(2)}</span>}
          </div>

          <div className="item-controls">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>
                <Plus size={18} />
              </button>
            </div>
            
            <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingBag size={20} />
              Add {quantity} to Cart · ${(item.price * quantity).toFixed(2)}
            </button>
          </div>

          {item.ingredients && (
            <div className="item-details-block">
              <h3>Ingredients</h3>
              <p>{item.ingredients.join(', ')}</p>
            </div>
          )}

          {item.nutrition && (
            <div className="item-details-block">
              <h3>Nutrition (per serving)</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <div className="nutr-value">{item.nutrition.protein}</div>
                  <div className="nutr-label">Protein</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutr-value">{item.nutrition.carbs}</div>
                  <div className="nutr-label">Carbs</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutr-value">{item.nutrition.fat}</div>
                  <div className="nutr-label">Fat</div>
                </div>
                <div className="nutrition-item">
                  <div className="nutr-value">{item.nutrition.fiber}</div>
                  <div className="nutr-label">Fiber</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="item-reviews-section">
        <h2 className="section-title">Customer Reviews</h2>
        {itemReviews.length > 0 ? (
          <div className="reviews-list">
            {itemReviews.map(review => (
              <div key={review.id} className="detail-review-card">
                <div className="review-header">
                  <div className="review-user">
                    <div className="review-avatar">{review.userName[0]}</div>
                    <div>
                      <div className="review-author-name">{review.userName}</div>
                      <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="review-stars-small">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? 'var(--color-primary)' : 'none'} color="var(--color-primary)" />
                    ))}
                  </div>
                </div>
                <p className="detail-review-comment">{review.comment}</p>
                <button className="btn-helpful">
                  <ThumbsUp size={14} /> Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ padding: '32px 0' }}>
            <p>No reviews yet for this item.</p>
          </div>
        )}
      </div>
    </div>
  );
}

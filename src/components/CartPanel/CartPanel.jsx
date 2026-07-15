import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { coupons } from '../../data/mockData';
import {
  ShoppingBag, X, Plus, Minus, Trash2, Clock, Ticket
} from 'lucide-react';
import './CartPanel.css';

export default function CartPanel({ isOpen, onClose }) {
  const cart = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    const found = coupons.find(c => c.code.toLowerCase() === couponCode.trim().toLowerCase());
    if (!found) {
      toast.error('Invalid coupon code.');
      return;
    }
    if (cart.subtotal < found.minOrder) {
      toast.warning(`Minimum order of $${found.minOrder} required.`);
      return;
    }
    cart.applyCoupon(found);
    toast.success(`Coupon "${found.code}" applied!`);
    setCouponCode('');
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const freeDeliveryThreshold = 25;
  const remaining = Math.max(0, freeDeliveryThreshold - cart.subtotal);
  const progress = Math.min(100, (cart.subtotal / freeDeliveryThreshold) * 100);

  return (
    <>
      <div
        className={`cart-panel-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-panel-header">
          <h2 className="cart-panel-title">
            Your cart
            {cart.itemCount > 0 && <span className="cart-panel-count">{cart.itemCount}</span>}
          </h2>
          <button className="cart-panel-close" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="cart-panel-items">
            <div className="cart-panel-empty">
              <ShoppingBag size={48} className="cart-panel-empty-icon" />
              <div className="cart-panel-empty-title">Your cart is empty</div>
              <div className="cart-panel-empty-text">Add some delicious meals to get started!</div>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-panel-items">
              {cart.items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" loading="lazy" />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="cart-item-controls">
                      <button
                        className="cart-item-qty-btn"
                        onClick={() => cart.decrement(item.id)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button
                        className="cart-item-qty-btn"
                        onClick={() => cart.increment(item.id)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => { cart.removeItem(item.id); toast.info('Item removed'); }}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Free delivery progress */}
            <div className="cart-progress">
              {remaining > 0 ? (
                <div className="cart-progress-text">
                  Add <span>${remaining.toFixed(2)}</span> more for <span>free delivery</span>
                </div>
              ) : (
                <div className="cart-progress-text">
                  You've unlocked <span>free delivery!</span>
                </div>
              )}
              <div className="cart-progress-bar">
                <div className="cart-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Coupon */}
            <div className="cart-coupon">
              {cart.coupon ? (
                <div className="cart-coupon-applied">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Ticket size={16} />{cart.coupon.code} applied
                  </span>
                  <button onClick={cart.removeCoupon} style={{ color: 'var(--color-error)', fontSize: '12px', fontWeight: 600 }}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="cart-coupon-form">
                  <input
                    type="text"
                    className="cart-coupon-input"
                    placeholder="Enter promo code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    aria-label="Promo code"
                  />
                  <button className="cart-coupon-btn" onClick={handleApplyCoupon}>Apply</button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery Fee</span>
                <span>{cart.deliveryFee === 0 ? 'Free' : `$${cart.deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="cart-summary-row">
                <span>Taxes & Fees</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="cart-summary-row" style={{ color: 'var(--color-success)' }}>
                  <span>Discount</span>
                  <span>-${cart.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="cart-summary-row total">
                <span>Grand Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout */}
            <div className="cart-checkout">
              <button
                className="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={cart.items.length === 0}
                id="checkout-btn"
              >
                Checkout · ${cart.total.toFixed(2)}
              </button>
              <button className="cart-schedule">
                <Clock size={16} style={{ marginRight: 8 }} />
                Schedule order
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Floating button for mobile */}
      {cart.itemCount > 0 && (
        <button
          className="cart-float-btn"
          onClick={onClose}
          aria-label="Open cart"
          style={{ display: isOpen ? 'none' : undefined }}
        >
          <ShoppingBag size={24} />
          <span className="cart-float-btn-badge">{cart.itemCount}</span>
        </button>
      )}
    </>
  );
}

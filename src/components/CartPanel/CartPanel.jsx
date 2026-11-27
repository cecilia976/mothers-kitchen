import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import {
  ShoppingBag, X, Plus, Minus, Trash2
} from 'lucide-react';
import { restaurant } from '../../config/restaurant';
import './CartPanel.css';

export default function CartPanel({ isOpen, onClose }) {
  const cart = useCart();
  const toast = useToast();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  const handleWhatsAppOrder = () => {
    if (cart.items.length === 0) {
      toast.info('Add at least one item before ordering');
      return;
    }
    if (!customerName.trim() || !deliveryLocation.trim()) {
      toast.info('Please enter your name and delivery location');
      return;
    }

    const itemLines = cart.items.flatMap((item, index) => [
      `${index + 1}. ${item.name}`,
      `Quantity: ${item.quantity}`,
      `Unit Price: $${item.price.toFixed(2)}`,
      `Subtotal: $${(item.price * item.quantity).toFixed(2)}`,
    ]);
    const message = [
      "MOTHER'S KITCHEN — NEW ORDER",
      '',
      'Hello Mother\'s Kitchen!',
      '',
      'I would like to place an order.',
      '',
      'CUSTOMER DETAILS',
      `Name: ${customerName.trim()}`,
      `Delivery Location: ${deliveryLocation.trim()}`,
      '',
      'ORDER DETAILS',
      '',
      ...itemLines,
      '',
      '---',
      '',
      `TOTAL: $${cart.subtotal.toFixed(2)}`,
      '',
      'Please confirm my order.',
      '',
      'Thank you!',
    ].join('\n');

    const url = `https://wa.me/${restaurant.whatsappInternational}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) toast.info('Please allow pop-ups to continue on WhatsApp');
  };

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
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/logo.png';
                    }}
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${item.price.toFixed(2)} each</div>
                    <div className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)} subtotal</div>
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

            {/* Summary */}
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Grand Total</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-checkout">
              {!detailsOpen ? (
                <button
                  className="cart-checkout-btn"
                  onClick={() => setDetailsOpen(true)}
                  disabled={cart.items.length === 0}
                  id="checkout-btn"
                >
                  Add delivery details · ${cart.subtotal.toFixed(2)}
                </button>
              ) : (
                <div className="cart-details">
                  <label>
                    <span>Your name</span>
                    <input
                      value={customerName}
                      onChange={event => setCustomerName(event.target.value)}
                      placeholder="Enter your name"
                    />
                  </label>
                  <label>
                    <span>Delivery location</span>
                    <input
                      value={deliveryLocation}
                      onChange={event => setDeliveryLocation(event.target.value)}
                      placeholder="Enter your delivery location"
                    />
                  </label>
                  <button
                    className="cart-checkout-btn"
                    onClick={handleWhatsAppOrder}
                    disabled={!customerName.trim() || !deliveryLocation.trim()}
                  >
                    Continue to WhatsApp · ${cart.subtotal.toFixed(2)}
                  </button>
                  <p className="cart-whatsapp-note">Press Send in WhatsApp to submit your order.</p>
                </div>
              )}
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

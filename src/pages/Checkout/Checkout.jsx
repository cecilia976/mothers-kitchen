import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { MapPin, ShoppingCart, MessageCircle } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page animate-fade-in">
        <div className="empty-state">
          <ShoppingCart size={48} className="empty-state-icon" />
          <h3>Your cart is empty</h3>
          <p>Add some items before checking out</p>
          <button className="btn-primary" onClick={() => navigate('/menu')} style={{ marginTop: 20 }}>Browse Menu</button>
        </div>
      </div>
    );
  }

  const handleContinueToWhatsApp = () => {
    if (!customerName.trim() || !deliveryLocation.trim()) return;

    const lines = [
      "Hello Mother's Kitchen,",
      '',
      `Customer name: ${customerName.trim()}`,
      'Order:',
      ...cart.items.map(item =>
        `- ${item.quantity} x ${item.name} - $${item.price.toFixed(2)} each - $${(item.price * item.quantity).toFixed(2)}`
      ),
      '',
      `Total: $${cart.subtotal.toFixed(2)}`,
      `Delivery location: ${deliveryLocation.trim()}`,
    ];

    window.open(`https://wa.me/254794541304?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="checkout-page animate-fade-in">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-section animate-fade-in-up">
        <h2 className="checkout-section-title"><MapPin size={24} className="text-primary" /> Delivery details</h2>
        <div className="checkout-form">
          <label>
            <span>Your name</span>
            <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Enter your name" />
          </label>
          <label>
            <span>Delivery location</span>
            <input value={deliveryLocation} onChange={e => setDeliveryLocation(e.target.value)} placeholder="Enter your delivery location" />
          </label>
        </div>

        <div className="checkout-order-summary">
          <div className="checkout-order-summary">
            <h3>Order Summary</h3>
            {cart.items.map(item => (
              <div key={item.id} className="checkout-item-row">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="checkout-total-row">
              <span>Total</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          className="btn-primary whatsapp-checkout"
          onClick={handleContinueToWhatsApp}
          disabled={!customerName.trim() || !deliveryLocation.trim()}
        >
          <MessageCircle size={20} />
          Continue to WhatsApp
        </button>
        <p className="checkout-whatsapp-note">Your order will open in WhatsApp. Press Send in WhatsApp to complete it.</p>
      </div>
    </div>
  );
}

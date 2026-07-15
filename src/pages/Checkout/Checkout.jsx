import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { addresses } from '../../data/mockData';
import { MapPin, CreditCard, CheckCircle, Info, ShoppingCart, Rocket, Smartphone, Banknote } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const cart = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = () => {
    setStep(3);
    toast.success('Order placed successfully!');
    setTimeout(() => cart.clearCart(), 500);
  };

  const getPaymentIcon = (id) => {
    switch (id) {
      case 'card': return <CreditCard size={24} />;
      case 'cash': return <Banknote size={24} />;
      case 'wallet': return <Smartphone size={24} />;
      default: return <CreditCard size={24} />;
    }
  };

  if (cart.items.length === 0 && step !== 3) {
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

  return (
    <div className="checkout-page animate-fade-in">
      <h1 className="page-title">Checkout</h1>

      {/* Steps */}
      <div className="checkout-steps">
        {['Delivery', 'Payment', 'Confirm'].map((label, i) => (
          <div key={label} className={`checkout-step ${step >= i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
            <div className="checkout-step-circle">{step > i + 1 ? '✓' : i + 1}</div>
            <span className="checkout-step-label">{label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="checkout-section animate-fade-in-up">
          <h2 className="checkout-section-title"><MapPin size={24} className="text-primary" /> Delivery Address</h2>
          <div className="address-list">
            {addresses.map(addr => (
              <label key={addr.id} className={`address-option ${selectedAddress === addr.id ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  checked={selectedAddress === addr.id}
                  onChange={() => setSelectedAddress(addr.id)}
                />
                <div className="address-option-content">
                  <div className="address-option-icon"><MapPin size={20} /></div>
                  <div>
                    <div className="address-option-label">{addr.label}</div>
                    <div className="address-option-text">{addr.address}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setStep(2)} style={{ marginTop: 24, width: '100%' }}>Continue to Payment</button>
        </div>
      )}

      {step === 2 && (
        <div className="checkout-section animate-fade-in-up">
          <h2 className="checkout-section-title"><CreditCard size={24} className="text-primary" /> Payment Method</h2>
          <div className="payment-methods">
            {[
              { id: 'card', label: 'Credit Card', sub: '**** 4242' },
              { id: 'cash', label: 'Cash on Delivery', sub: 'Pay when delivered' },
              { id: 'wallet', label: 'Digital Wallet', sub: 'Apple Pay / Google Pay' },
            ].map(pm => (
              <label key={pm.id} className={`payment-option ${paymentMethod === pm.id ? 'selected' : ''}`}>
                <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} />
                <div className="payment-option-content">
                  <span className="payment-option-icon">{getPaymentIcon(pm.id)}</span>
                  <div>
                    <div className="payment-option-label">{pm.label}</div>
                    <div className="payment-option-sub">{pm.sub}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

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
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</button>
            <button className="btn-primary" onClick={handlePlaceOrder} style={{ flex: 2 }}>Place Order · ${cart.total.toFixed(2)}</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="checkout-confirmation animate-scale-in">
          <div className="confirmation-icon"><CheckCircle size={64} color="var(--color-success)" /></div>
          <h2>Order Confirmed!</h2>
          <p>Your order has been placed successfully and is being prepared with love.</p>
          <div className="confirmation-order-id">Order #MK-{Date.now().toString().slice(-6)}</div>
          <div className="confirmation-eta">
             <Rocket size={16} /> Estimated delivery: <strong>25-35 minutes</strong>
          </div>
          <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: 24 }}>Back to Home</button>
        </div>
      )}
    </div>
  );
}

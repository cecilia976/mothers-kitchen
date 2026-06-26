import { useAuth } from '../../context/AuthContext';
import { orderHistory } from '../../data/mockData';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page animate-fade-in">
      <h1 className="page-title">My Profile</h1>
      
      <div className="profile-content">
        <div className="profile-info-section">
          <div className="profile-avatar-large">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="profile-details">
            <h2>{user?.name || 'Alex Morgan'}</h2>
            <p>{user?.email || 'alex.morgan@example.com'}</p>
            <p>{user?.phone || '+1 (555) 000-0000'}</p>
            <button className="btn-outline" style={{ marginTop: '12px' }}>Edit Profile</button>
          </div>
        </div>

        <div className="profile-history-section">
          <h3>Recent Orders</h3>
          <div className="order-list">
            {orderHistory.map(order => (
              <div key={order.id} className="order-item-card">
                <div className="order-header">
                  <span className="order-id">{order.id}</span>
                  <span className={`order-status ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-body">
                  <div className="order-restaurant">{order.restaurant}</div>
                  <div className="order-date">{order.date}</div>
                  <div className="order-total">Total: ${order.total.toFixed(2)}</div>
                </div>
                <button className="btn-link">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

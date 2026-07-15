import { useAuth } from '../../context/AuthContext';
import { orderHistory } from '../../data/mockData';
import { CheckCircle, Clock } from 'lucide-react';
import './Profile.css';

export default function Profile({ initialTab = 'profile' }) {
  const { user } = useAuth();
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="profile-page animate-fade-in">
      <h1 className="page-title">{initialTab === 'orders' ? 'My Orders' : 'My Profile'}</h1>
      
      <div className="profile-content">
        <div className="profile-info-section">
          <div className="profile-avatar-large">
            {getInitials(user?.name)}
          </div>
          <div className="profile-details">
            <h2>{user?.name || 'Guest User'}</h2>
            <p>{user?.email || 'N/A'}</p>
            <p>{user?.phone || '+44 7000 000000'}</p>
            <button className="btn-outline" style={{ marginTop: '12px' }}>Edit Profile</button>
          </div>
        </div>

        <div className="profile-history-section">
          <h3 className="section-title" style={{ marginBottom: 16 }}>Recent Orders</h3>
          <div className="order-list">
            {orderHistory.map(order => (
              <div key={order.id} className="order-item-card">
                <div className="order-header">
                  <span className="order-id">{order.id}</span>
                  <span className={`order-status ${order.status}`}>
                    {order.status === 'delivered' ? <CheckCircle size={14} style={{ marginRight: 4 }} /> : <Clock size={14} style={{ marginRight: 4 }} />}
                    {order.status}
                  </span>
                </div>
                <div className="order-body">
                  <div className="order-restaurant">Mother's Kitchen</div>
                  <div className="order-date">{order.date}</div>
                  <div className="order-details-small">
                     <ul>
                       {order.items.map((it, i) => (
                           <li key={i}>{it.qty}x {it.name}</li>
                       ))}
                     </ul>
                  </div>
                  <div className="order-total" style={{ marginTop: 8 }}>Total: ${order.total.toFixed(2)}</div>
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

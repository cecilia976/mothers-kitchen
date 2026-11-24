import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import CartPanel from './components/CartPanel/CartPanel';
import BottomNav from './components/BottomNav/BottomNav';
import ToastContainer from './components/Toast/Toast';

import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import Checkout from './pages/Checkout/Checkout';
import Search from './pages/Search/Search';
import { Navigate } from 'react-router-dom';

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  // Close sidebars on route change
  useEffect(() => {
    setCartOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <div className="main-layout">
        <Header onCartToggle={() => setCartOpen(true)} />
        <main className="content-area">
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/food/:id" element={<ItemDetail type="food" />} />
              <Route path="/drink/:id" element={<ItemDetail type="drink" />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
              <Route path="/profile" element={<Navigate to="/" replace />} />
              <Route path="/favorites" element={<Navigate to="/menu" replace />} />
              <Route path="/orders" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        <BottomNav />
      </div>
      <CartPanel isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

      <ToastContainer />

      <style jsx="true">{`
        .app-container {
          display: flex;
          min-height: 100vh;
        }

        .main-layout {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .content-area {
          flex: 1;
          padding: var(--space-8);
          padding-bottom: 100px;
        }

        .container-fluid {
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
        }

        @media (max-width: 1024px) {
        }

        @media (max-width: 768px) {
          .content-area {
            padding: var(--space-4);
            padding-bottom: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;

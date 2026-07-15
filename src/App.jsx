import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import CartPanel from './components/CartPanel/CartPanel';
import BottomNav from './components/BottomNav/BottomNav';
import ToastContainer from './components/Toast/Toast';

import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  // Close sidebars on route change
  useEffect(() => {
    setSidebarOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  const showLayout = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="app-container">
      {showLayout && (
        <>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="main-layout">
            <Header 
              onMenuToggle={() => setSidebarOpen(true)} 
              onCartToggle={() => setCartOpen(true)} 
            />
            <main className="content-area">
              <div className="container-fluid">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/food/:id" element={<ItemDetail type="food" />} />
                  <Route path="/drink/:id" element={<ItemDetail type="drink" />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/orders" element={<Profile initialTab="orders" />} />
                </Routes>
              </div>
            </main>
            <BottomNav />
          </div>
          <CartPanel isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
        </>
      )}

      {/* Auth routes don't show the main layout navigation */}
      {!showLayout && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}

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
          margin-left: var(--sidebar-width);
          min-width: 0;
          transition: margin-left var(--transition-base);
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
          .main-layout {
            margin-left: 0;
          }
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

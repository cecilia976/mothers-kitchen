import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section className="hero-banner" aria-label="Promotional banner">
      <div className="hero-banner-bg">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop"
          alt=""
          aria-hidden="true"
          loading="eager"
        />
      </div>
      <div className="hero-banner-overlay" />

      <div className="hero-banner-content">
        <div className="hero-banner-left">
          <div className="hero-banner-badge">🔥 Hot Deal</div>
          <h1 className="hero-banner-title">
            <span>50% OFF</span> on your<br />first order 🎉
          </h1>
          <p className="hero-banner-subtitle">
            Discover home-cooked meals crafted with love. Fresh ingredients, bold flavors, delivered to your doorstep.
          </p>
          <button className="hero-banner-cta" id="hero-order-now">
            Order Now →
          </button>
        </div>

        <div className="hero-banner-right">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop"
            alt="Delicious pizza"
            className="hero-banner-image"
            loading="eager"
          />
          <div className="hero-banner-float-card">
            <div className="hero-banner-float-icon">🚀</div>
            <div>
              <div className="hero-banner-float-text">Free Delivery</div>
              <div className="hero-banner-float-sub">Orders above $25</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { categories } from '../../data/mockData';
import './CategorySlider.css';

export default function CategorySlider({ activeCategory, onCategoryChange }) {
  return (
    <section className="category-section" aria-label="Food categories">
      <div className="category-section-header">
        <h2 className="category-section-title">What are you craving?</h2>
      </div>
      <div className="category-slider" role="tablist" aria-label="Category filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.slug)}
            role="tab"
            aria-selected={activeCategory === cat.slug}
            aria-label={cat.name}
            id={`category-${cat.slug}`}
          >
            <span className="category-chip-icon">{cat.icon}</span>
            <span className="category-chip-name">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

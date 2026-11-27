import { useState } from 'react';
import { foodCategories, drinkCategories } from '../../data/mockData';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CategorySlider.css';

export default function CategorySlider({ activeCategory, onCategoryChange, type = 'food' }) {
  const categories = type === 'food' ? foodCategories : drinkCategories;
  const navigate = useNavigate();

  return (
    <section className="category-section" aria-label={`${type} categories`}>
      <div className="section-header">
        <div>
          <h2 className="section-title">{type === 'food' ? 'Food Menu' : 'Drinks Menu'}</h2>
          <p className="section-subtitle">Explore our carefully crafted selections</p>
        </div>
        <button className="section-view-all" onClick={() => navigate('/menu')}>
          View all <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="category-slider" role="tablist" aria-label="Category filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => onCategoryChange && onCategoryChange(cat.slug)}
            role="tab"
            aria-selected={activeCategory === cat.slug}
            aria-label={cat.name}
            id={`category-${cat.slug}`}
          >
            {cat.image && (
              <div className="category-chip-image-wrap">
                <img src={cat.image} alt={cat.name} className="category-chip-image" />
              </div>
            )}
            <div className="category-chip-content">
              <span className="category-chip-name">{cat.name}</span>
              <span className="category-chip-count">{cat.count} items</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

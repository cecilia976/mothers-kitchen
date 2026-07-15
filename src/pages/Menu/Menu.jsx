import { useState, useMemo } from 'react';
import FoodCard from '../../components/FoodCard/FoodCard';
import { foodItems, drinkItems, foodCategories, drinkCategories } from '../../data/mockData';
import { Search, Filter, Coffee, Utensils } from 'lucide-react';
import './Menu.css';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('food'); // 'food' or 'drinks'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high

  const items = activeTab === 'food' ? foodItems : drinkItems;
  const categories = activeTab === 'food' ? foodCategories : drinkCategories;

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) || 
        (item.description && item.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'popular') result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));

    return result;
  }, [items, activeCategory, searchQuery, sortBy]);

  return (
    <div className="menu-page animate-fade-in">
      <div className="menu-header">
        <h1 className="page-title">Our Menu</h1>
        <p className="page-subtitle">Handcrafted dishes and refreshing beverages</p>
      </div>

      <div className="menu-tabs">
        <button 
          className={`menu-tab ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => { setActiveTab('food'); setActiveCategory('all'); }}
        >
          <Utensils size={18} /> Food
        </button>
        <button 
          className={`menu-tab ${activeTab === 'drinks' ? 'active' : ''}`}
          onClick={() => { setActiveTab('drinks'); setActiveCategory('all'); }}
        >
          <Coffee size={18} /> Drinks
        </button>
      </div>

      <div className="menu-toolbar">
        <div className="menu-search-wrap">
          <Search size={18} className="menu-search-icon" />
          <input
            type="search"
            className="menu-search"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="menu-sort">
          <Filter size={18} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="menu-categories-pills">
        <button 
          className={`menu-category-pill ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All {activeTab === 'food' ? 'Food' : 'Drinks'}
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={`menu-category-pill ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="food-grid">
        {filteredItems.map(item => (
          <FoodCard key={item.id} food={item} type={activeTab} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <Search size={48} className="empty-state-icon" />
          <h3>No items found</h3>
          <p>Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
}

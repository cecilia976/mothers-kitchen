import { useState, useMemo } from 'react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { restaurants } from '../../data/mockData';
import { HiOutlineMagnifyingGlass, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import './Restaurants.css';

export default function Restaurants() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let list = [...restaurants];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
    }
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'time') list.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    else if (sortBy === 'fee') list.sort((a, b) => a.deliveryFee - b.deliveryFee);
    return list;
  }, [search, sortBy]);

  return (
    <div className="restaurants-page animate-fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Restaurants</h1>
          <p className="page-subtitle">Discover the best places to eat near you</p>
        </div>
      </div>

      <div className="restaurants-toolbar">
        <div className="restaurants-search-wrap">
          <HiOutlineMagnifyingGlass className="restaurants-search-icon" />
          <input
            type="search"
            className="restaurants-search"
            placeholder="Search restaurants or cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search restaurants"
          />
        </div>
        <div className="restaurants-sort">
          <HiOutlineAdjustmentsHorizontal />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort restaurants">
            <option value="rating">Top Rated</option>
            <option value="time">Fastest</option>
            <option value="fee">Lowest Fee</option>
          </select>
        </div>
      </div>

      <div className="restaurant-grid">
        {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <span className="empty-state-icon">🔍</span>
          <h3>No restaurants found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

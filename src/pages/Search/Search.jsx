import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodCard from '../../components/FoodCard/FoodCard';
import { foodItems } from '../../data/mockData';
import './Search.css';

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = foodItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  return (
    <div className="search-page animate-fade-in">
      <h1 className="page-title">
        {query ? `Search results for "${query}"` : 'Discover delicious food'}
      </h1>
      
      {results.length > 0 ? (
        <div className="food-grid" style={{ marginTop: '24px' }}>
          {results.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state-icon">🔎</span>
          <h3>No results found</h3>
          <p>Try searching for different keywords</p>
        </div>
      )}
    </div>
  );
}

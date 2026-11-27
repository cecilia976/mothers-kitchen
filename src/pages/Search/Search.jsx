import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodCard from '../../components/FoodCard/FoodCard';
import { foodItems, drinkItems } from '../../data/mockData';
import { SearchIcon } from 'lucide-react';
import './Search.css';

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const allItems = [...foodItems, ...drinkItems];
    const filtered = allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );
    // Sort so exact matches or popular items appear first roughly
    filtered.sort((a, b) => b.isPopular ? 1 : -1);
    setResults(filtered);
  }, [query]);

  return (
    <div className="search-page animate-fade-in">
      <h1 className="page-title">
        {query ? `Search results for "${query}"` : 'Discover delicious food'}
      </h1>
      
      {results.length > 0 ? (
        <div className="food-grid" style={{ marginTop: '24px' }}>
          {results.map(item => (
            <FoodCard key={`${item.type || 'item'}-${item.id}`} food={item} type={item.type || (foodItems.includes(item) ? 'food' : 'drink')} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <SearchIcon size={48} className="empty-state-icon" />
          <h3>No results found</h3>
          <p>Try searching for different keywords or checking our Menu.</p>
        </div>
      )}
    </div>
  );
}

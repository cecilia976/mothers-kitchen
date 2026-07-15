import { useState } from 'react';
import FoodCard from '../../components/FoodCard/FoodCard';
import { foodItems, drinkItems } from '../../data/mockData';
import { Heart } from 'lucide-react';
import './Favorites.css';

export default function Favorites() {
  // In a real app, these would come from a global context or API.
  // For this mock, let's just pick some popular items.
  const [favoriteFoods] = useState(foodItems.filter(f => f.isPopular).slice(0, 3));
  const [favoriteDrinks] = useState(drinkItems.filter(d => d.isPopular).slice(0, 2));

  const allFavorites = [...favoriteFoods, ...favoriteDrinks];

  return (
    <div className="favorites-page animate-fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Favorites</h1>
          <p className="page-subtitle">Your personalized list of go-to meals and drinks</p>
        </div>
      </div>

      {allFavorites.length > 0 ? (
        <div className="food-grid" style={{ marginTop: '32px' }}>
          {favoriteFoods.map(food => (
            <FoodCard key={`food-${food.id}`} food={food} type="food" />
          ))}
          {favoriteDrinks.map(drink => (
            <FoodCard key={`drink-${drink.id}`} food={drink} type="drink" />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={48} className="empty-state-icon" />
          <h3>No favorites yet</h3>
          <p>Tap the heart icon on any item to save it here for quick access later.</p>
        </div>
      )}
    </div>
  );
}

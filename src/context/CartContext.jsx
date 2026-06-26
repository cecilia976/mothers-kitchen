import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + 1 };
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'INCREMENT': {
      const items = state.items.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { ...state, items };
    }
    case 'DECREMENT': {
      const items = state.items
        .map(item => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0);
      return { ...state, items };
    }
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    case 'CLEAR_CART':
      return { ...state, items: [], coupon: null };
    case 'SET_DELIVERY_ADDRESS':
      return { ...state, deliveryAddress: action.payload };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  coupon: null,
  deliveryAddress: null,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item) => dispatch({ type: 'ADD_ITEM', payload: item }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);
  const increment = useCallback((id) => dispatch({ type: 'INCREMENT', payload: id }), []);
  const decrement = useCallback((id) => dispatch({ type: 'DECREMENT', payload: id }), []);
  const applyCoupon = useCallback((coupon) => dispatch({ type: 'APPLY_COUPON', payload: coupon }), []);
  const removeCoupon = useCallback(() => dispatch({ type: 'REMOVE_COUPON' }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const setDeliveryAddress = useCallback((addr) => dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: addr }), []);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 25 ? 0 : 3.99;
  const tax = subtotal * 0.08;

  let discount = 0;
  if (state.coupon) {
    if (state.coupon.type === 'percentage') {
      discount = subtotal * (state.coupon.discount / 100);
    } else if (state.coupon.type === 'fixed') {
      discount = state.coupon.discount;
    } else if (state.coupon.type === 'freeDelivery') {
      discount = deliveryFee;
    }
  }

  const total = Math.max(0, subtotal + deliveryFee + tax - discount);

  return (
    <CartContext.Provider value={{
      ...state,
      itemCount,
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      addItem,
      removeItem,
      increment,
      decrement,
      applyCoupon,
      removeCoupon,
      clearCart,
      setDeliveryAddress,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

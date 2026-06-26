import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mk_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const userData = {
      id: 1,
      name: 'Alex Morgan',
      email,
      avatar: null,
      phone: '+1 (555) 123-4567',
      role: 'user',
    };
    setUser(userData);
    localStorage.setItem('mk_user', JSON.stringify(userData));
    setLoading(false);
    return userData;
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const userData = {
      id: Date.now(),
      name,
      email,
      avatar: null,
      phone: '',
      role: 'user',
    };
    setUser(userData);
    localStorage.setItem('mk_user', JSON.stringify(userData));
    setLoading(false);
    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mk_user');
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('mk_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

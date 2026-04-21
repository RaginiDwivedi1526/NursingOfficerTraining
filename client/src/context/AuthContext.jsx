import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('nursingUser');
    return stored ? JSON.parse(stored) : null;
  });

  const loginUser = (userData) => {
    localStorage.setItem('nursingUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('nursingUser');
    localStorage.removeItem('nursingToken');
    sessionStorage.removeItem('ai_chat_history');
    setUser(null);
  };

  const isPro = () => user?.role === 'pro';

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isPro }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

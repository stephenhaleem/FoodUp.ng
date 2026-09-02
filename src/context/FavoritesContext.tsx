import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favoriteIds: string[];
  isFavorite: (restaurantId: string) => boolean;
  toggleFavorite: (restaurantId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('favoriteRestaurants');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favoriteRestaurants', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (restaurantId: string) => {
    setFavoriteIds((current) =>
      current.includes(restaurantId)
        ? current.filter((id) => id !== restaurantId)
        : [...current, restaurantId]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite: (restaurantId) => favoriteIds.includes(restaurantId),
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};

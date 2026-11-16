
import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { CampusEvent } from '../data/events';

type SavedEventsContextType = {
  favorites: CampusEvent[];
  toggleFavorite: (event: CampusEvent) => void;
  isFavorite: (id: string) => boolean;
};

const SavedEventsContext = createContext<
  SavedEventsContextType | undefined
>(undefined);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<CampusEvent[]>([]);

  const toggleFavorite = (event: CampusEvent) => {
    setFavorites((previous) => {
      const exists = previous.some(
        (item) => item.id === event.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== event.id
        );
      }

      return [...previous, event];
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <SavedEventsContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </SavedEventsContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(SavedEventsContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );
  }

  return context;
}

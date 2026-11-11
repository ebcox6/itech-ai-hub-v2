import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { load, save } from './storage';

// Per-viewer preferences: chosen audience, favorites, and recent history. Stored in this browser only.
const StoreContext = createContext(null);
const HISTORY_LIMIT = 15;

export function StoreProvider({ children }) {
  const [audience, setAudienceState] = useState(() => load('hub.audience', null));
  const [favorites, setFavorites] = useState(() => load('hub.favorites', []));
  const [history, setHistory] = useState(() => load('hub.history', []));

  useEffect(() => save('hub.audience', audience), [audience]);
  useEffect(() => save('hub.favorites', favorites), [favorites]);
  useEffect(() => save('hub.history', history), [history]);

  const setAudience = useCallback((key) => setAudienceState(key), []);
  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);
  const toggleFavorite = useCallback(
    (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [id, ...f])),
    [],
  );
  const logUse = useCallback((entry) => {
    // entry: { id, kind: 'prompt' | 'agent', title, text, action }
    setHistory((h) => [{ ...entry, at: Date.now() }, ...h.filter((x) => x.text !== entry.text)].slice(0, HISTORY_LIMIT));
  }, []);
  const clearHistory = useCallback(() => setHistory([]), []);

  const value = useMemo(
    () => ({ audience, setAudience, favorites, isFavorite, toggleFavorite, history, logUse, clearHistory }),
    [audience, setAudience, favorites, isFavorite, toggleFavorite, history, logUse, clearHistory],
  );
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}

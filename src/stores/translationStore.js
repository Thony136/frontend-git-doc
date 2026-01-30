import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/utils/constants';

export const useTranslationStore = create(
  persist(
    (set, get) => ({
      // State
      history: [],
      favorites: [],
      recentTranslations: [],
      preferences: {
        defaultSourceLanguage: 'qu',
        defaultTargetLanguage: 'es',
        saveHistory: true,
        maxHistoryItems: 100,
      },

      // Actions
      addToHistory: (translation) => {
        const state = get();
        const newHistory = [
          {
            ...translation,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
          },
          ...state.history,
        ].slice(0, state.preferences.maxHistoryItems);

        set({ history: newHistory });
      },

      removeFromHistory: (id) => {
        const state = get();
        const newHistory = state.history.filter(item => item.id !== id);
        set({ history: newHistory });
      },

      clearHistory: () => {
        set({ history: [] });
      },

      addToFavorites: (translation) => {
        const state = get();
        const exists = state.favorites.find(fav => 
          fav.originalText === translation.originalText && 
          fav.sourceLanguage === translation.sourceLanguage
        );

        if (!exists) {
          const newFavorites = [
            {
              ...translation,
              id: Date.now().toString(),
              favoriteId: Date.now().toString(),
            },
            ...state.favorites,
          ];
          set({ favorites: newFavorites });
        }
      },

      removeFromFavorites: (id) => {
        const state = get();
        const newFavorites = state.favorites.filter(item => item.favoriteId !== id);
        set({ favorites: newFavorites });
      },

      updatePreferences: (newPreferences) => {
        const state = get();
        set({
          preferences: { ...state.preferences, ...newPreferences }
        });
      },

      // Getters
      getHistoryByLanguage: (sourceLanguage, targetLanguage) => {
        const state = get();
        return state.history.filter(item => 
          item.sourceLanguage === sourceLanguage && 
          item.targetLanguage === targetLanguage
        );
      },

      searchHistory: (query) => {
        const state = get();
        const lowercaseQuery = query.toLowerCase();
        return state.history.filter(item =>
          item.originalText.toLowerCase().includes(lowercaseQuery) ||
          item.translatedText.toLowerCase().includes(lowercaseQuery)
        );
      },
    }),
    {
      name: STORAGE_KEYS.TRANSLATION_HISTORY,
      partialize: (state) => ({
        history: state.history,
        favorites: state.favorites,
        preferences: state.preferences,
      }),
    }
  )
);
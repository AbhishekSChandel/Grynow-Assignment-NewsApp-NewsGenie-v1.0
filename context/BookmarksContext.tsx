import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Article {
  title: string;
  url: string;
  image?: string | null;
  description?: string;
  author?: string;
  published_at?: string;
  category?: string;
}

interface BookmarksContextType {
  bookmarks: { [key: string]: Article };
  addBookmark: (article: Article) => void;
  removeBookmark: (url: string) => void;
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: {},
  addBookmark: () => {},
  removeBookmark: () => {},
});

export const useBookmarks = () => useContext(BookmarksContext);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: Article }>({});

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem('bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const addBookmark = async (article: Article) => {
    try {
      const newBookmarks = { ...bookmarks, [article.url]: article };
      setBookmarks(newBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const removeBookmark = async (url: string) => {
    try {
      const newBookmarks = { ...bookmarks };
      delete newBookmarks[url];
      setBookmarks(newBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
} 
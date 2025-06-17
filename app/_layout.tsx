import { BookmarksProvider } from '@/context/BookmarksContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <BookmarksProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
      </Stack>
    </BookmarksProvider>
  );
} 
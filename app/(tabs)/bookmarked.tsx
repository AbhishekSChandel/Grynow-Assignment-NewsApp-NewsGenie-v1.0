import { ArticleCard } from '@/components/ArticleCard';
import { useBookmarks } from '@/context/BookmarksContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

interface Article {
  title: string;
  url: string;
  image?: string | null;
  description?: string;
  author?: string;
  published_at?: string;
  category?: string;
}

export default function BookmarkedScreen() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const router = useRouter();

  const bookmarkedArticles = Object.values(bookmarks) as Article[];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ backgroundColor: '#fff', paddingTop: 32, paddingBottom: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Ionicons name="menu" size={28} color="#111827" style={{ width: 32 }} />
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 28, fontWeight: 'bold', color: '#2563EB', letterSpacing: 1, fontFamily: 'sans-serif' }}>NewsGenie</Text>
        <Ionicons name="search" size={26} color="#111827" style={{ width: 32, textAlign: 'right' }} />
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', fontFamily: 'sans-serif' }}>Bookmarked</Text>
        <Text style={{ fontSize: 16, color: '#6B7280', marginTop: 4, fontFamily: 'sans-serif' }}>Your saved articles</Text>
      </View>
      <FlatList
        data={bookmarkedArticles}
        keyExtractor={(item) => item.url}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ArticleCard
            title={item.title}
            description={item.description || ''}
            imageUrl={item.image || ''}
            isBookmarked={true}
            onPress={() => router.push({ pathname: '/detail', params: { url: encodeURIComponent(item.url) } })}
            onBookmark={() => removeBookmark(item.url)}
            author={item.author}
            date={item.published_at}
            category={item.category}
          />
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 32 }}>
            <Ionicons name="bookmark-outline" size={48} color="#9CA3AF" />
            <Text style={{ fontSize: 16, color: '#6B7280', marginTop: 8, textAlign: 'center', fontFamily: 'sans-serif' }}>
              No bookmarked articles yet.{'\n'}Save articles to read them later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
} 
import { ArticleCard } from '@/components/ArticleCard';
import { useBookmarks } from '@/context/BookmarksContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Article {
  title: string;
  url: string;
  image?: string | null;
  description?: string;
  author?: string;
  published_at?: string;
  source?: string;
  category?: string;
}

const MEDIASTACK_API_KEY = 'c2d9f5632c6e0bd589b2b432c536e1a7';
const MEDIASTACK_BASE = 'https://api.mediastack.com/v1/news';

const MOCK_ARTICLES: Article[] = [
  {
    title: 'Breaking: Major Tech Company Announces Revolutionary AI Breakthrough',
    url: 'https://example.com/ai-breakthrough',
    image: 'https://picsum.photos/800/400',
    description: 'A leading technology company has unveiled a groundbreaking artificial intelligence system that promises to transform how we interact with machines.',
    author: 'Tech Reporter',
    published_at: '2024-03-20T10:00:00Z',
    source: 'Tech Daily',
    category: 'technology'
  },
  {
    title: 'Global Climate Summit Reaches Historic Agreement',
    url: 'https://example.com/climate-summit',
    image: 'https://picsum.photos/800/401',
    description: 'World leaders have agreed on unprecedented measures to combat climate change, setting ambitious targets for carbon reduction.',
    author: 'Environmental Correspondent',
    published_at: '2024-03-20T09:30:00Z',
    source: 'Global News',
    category: 'environment'
  },
  {
    title: 'Sports: Underdog Team Makes Stunning Championship Victory',
    url: 'https://example.com/sports-victory',
    image: 'https://picsum.photos/800/402',
    description: 'In an unexpected turn of events, the underdog team has secured a dramatic victory in the championship finals.',
    author: 'Sports Analyst',
    published_at: '2024-03-20T08:45:00Z',
    source: 'Sports Central',
    category: 'sports'
  },
  {
    title: 'Economic Report: Global Markets Show Strong Recovery',
    url: 'https://example.com/market-recovery',
    image: 'https://picsum.photos/800/403',
    description: 'Financial markets worldwide are showing signs of robust recovery, with key indices reaching new heights.',
    author: 'Financial Expert',
    published_at: '2024-03-20T08:00:00Z',
    source: 'Business Times',
    category: 'business'
  }
];

const getDisplayDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const router = useRouter();

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const endpoint = `${MEDIASTACK_BASE}?access_key=${MEDIASTACK_API_KEY}&languages=en&limit=20`;
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        setArticles(data.data.map((item: any) => ({
          title: item.title,
          url: item.url,
          image: item.image,
          description: item.description,
          author: item.author,
          published_at: item.published_at,
          source: item.source || 'Unknown',
          category: item.category || 'general',
        })));
      } else {
        setArticles(MOCK_ARTICLES);
      }
    } catch (error) {
      setArticles(MOCK_ARTICLES);
      setHasError(true);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const checkSplashSeen = async () => {
      try {
        const splashSeen = await AsyncStorage.getItem('splashSeen');
        if (!splashSeen) {
          router.replace('/splash');
        } else {
          fetchArticles();
        }
      } catch (error) {
        console.error('Error checking splash screen status:', error);
        fetchArticles();
      }
    };
    checkSplashSeen();
  }, [fetchArticles, router]);

  const handleBookmark = (article: Article) => {
    if (bookmarks[article.url]) removeBookmark(article.url);
    else addBookmark(article);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchArticles();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ backgroundColor: '#fff', paddingTop: 32, paddingBottom: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Ionicons name="menu" size={28} color="#111827" style={{ width: 32 }} />
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 28, fontWeight: 'bold', color: '#2563EB', letterSpacing: 1, fontFamily: 'sans-serif' }}>NewsGenie</Text>
        <Ionicons name="search" size={26} color="#111827" style={{ width: 32, textAlign: 'right' }} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 16, fontFamily: 'sans-serif' }}>Breaking News</Text>
          <FlatList
            data={articles.slice(0, 5)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push({ pathname: '/detail', params: { url: encodeURIComponent(item.url) } })}
                style={{ width: 300, marginRight: 16, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
              >
                <View style={{ height: 160, backgroundColor: '#E5E7EB' }}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="newspaper-outline" size={48} color="#9CA3AF" />
                    </View>
                  )}
                </View>
                <View style={{ padding: 12 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4, fontFamily: 'sans-serif' }} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 8, fontFamily: 'sans-serif' }} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#6B7280', fontFamily: 'sans-serif' }}>
                      {item.source} • {getDisplayDate(item.published_at)}
                    </Text>
                    <TouchableOpacity onPress={() => handleBookmark(item)}>
                      <Ionicons
                        name={bookmarks[item.url] ? 'bookmark' : 'bookmark-outline'}
                        size={20}
                        color={bookmarks[item.url] ? '#2563EB' : '#6B7280'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginTop: 24, marginBottom: 16, fontFamily: 'sans-serif' }}>Recommendations</Text>
          <FlatList
            data={articles.slice(5)}
            scrollEnabled={false}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <ArticleCard
                title={item.title}
                description={item.description || ''}
                imageUrl={item.image || ''}
                isBookmarked={!!bookmarks[item.url]}
                onPress={() => router.push({ pathname: '/detail', params: { url: encodeURIComponent(item.url) } })}
                onBookmark={() => handleBookmark(item)}
                author={item.author}
                date={item.published_at}
                category={item.category}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
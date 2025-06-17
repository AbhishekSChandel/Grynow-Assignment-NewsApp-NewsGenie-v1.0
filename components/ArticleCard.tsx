import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isBookmarked: boolean;
  onPress: () => void;
  onBookmark: () => void;
  showRemove?: boolean;
  author?: string;
  date?: string;
  category?: string;
  cardScale?: number;
}

// Use a remote placeholder image URL
const fallbackImage = { uri: 'https://via.placeholder.com/120x120.png?text=No+Image' };

export function ArticleCard({
  title,
  description,
  imageUrl,
  isBookmarked,
  onPress,
  onBookmark,
  showRemove,
  author,
  date,
  category,
  cardScale = 1,
}: ArticleCardProps) {
  const [imageError, setImageError] = React.useState(false);
  // Scale values
  const cardPadding = 12 * cardScale;
  const cardMarginBottom = 24 * cardScale;
  const cardBorderRadius = 16 * cardScale;
  const imageSize = 104 * cardScale;
  const imageRadius = 12 * cardScale;
  const tagFontSize = 12 * cardScale;
  const tagPaddingH = 8 * cardScale;
  const tagPaddingV = 2 * cardScale;
  const tagRadius = 999 * cardScale;
  const titleFontSize = 16 * cardScale;
  const authorFontSize = 12 * cardScale;
  const descFontSize = 12 * cardScale;
  const iconSize = 22 * cardScale;
  const iconPadding = 8 * cardScale;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: cardBorderRadius, marginBottom: cardMarginBottom, shadowColor: '#111827', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, padding: cardPadding, borderWidth: 1, borderColor: '#E5E7EB' }}
      activeOpacity={0.85}
      accessibilityRole="button"
    >
      <Image
        source={imageError || !imageUrl ? fallbackImage : { uri: imageUrl }}
        style={{ borderRadius: imageRadius, backgroundColor: '#F3F4F6', marginRight: 16 * cardScale, width: imageSize, height: imageSize }}
        resizeMode="cover"
        onError={() => setImageError(true)}
        accessibilityLabel={title}
      />
      <View style={{ flex: 1, minHeight: imageSize, justifyContent: 'center' }}>
        {category && (
          <View style={{ alignSelf: 'flex-start', backgroundColor: '#2563EB', borderRadius: tagRadius, paddingHorizontal: tagPaddingH, paddingVertical: tagPaddingV, marginBottom: 4 * cardScale }}>
            <Text style={{ fontSize: tagFontSize, color: '#fff', fontWeight: 'bold', fontFamily: 'sans-serif' }}>{category}</Text>
          </View>
        )}
        <Text style={{ fontSize: titleFontSize, fontWeight: 'bold', color: '#111827', marginBottom: 2 * cardScale, fontFamily: 'sans-serif' }} numberOfLines={2}>{title}</Text>
        {author && (
          <Text style={{ fontSize: authorFontSize, color: '#6B7280', marginBottom: 2 * cardScale, fontFamily: 'sans-serif' }}>{author}{date ? ` • ${date}` : ''}</Text>
        )}
        <Text style={{ fontSize: descFontSize, color: '#6B7280', fontFamily: 'sans-serif' }} numberOfLines={2}>{description}</Text>
      </View>
      <TouchableOpacity
        onPress={onBookmark}
        style={{ marginLeft: 8 * cardScale, padding: iconPadding }}
        accessibilityRole="button"
        accessibilityLabel={showRemove ? 'Remove Bookmark' : isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      >
        {showRemove ? (
          <Ionicons name="trash-outline" size={iconSize} color="#EF4444" />
        ) : (
          <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={iconSize} color={isBookmarked ? '#2563EB' : '#6B7280'} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
} 
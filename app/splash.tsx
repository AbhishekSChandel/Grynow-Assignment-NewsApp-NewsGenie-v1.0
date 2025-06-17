import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 44, fontWeight: 'bold', color: '#2563EB', letterSpacing: 1, fontFamily: 'sans-serif', textAlign: 'center', marginBottom: 48 }}>
        NewsGenie
      </Text>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 999, paddingVertical: 16, paddingHorizontal: 24, marginBottom: 16, width: '100%', borderWidth: 1, borderColor: '#E5E7EB' }}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Sign up with Google"
      >
        <Ionicons name="logo-google" size={22} color="#2563EB" style={{ marginRight: 12 }} />
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', fontFamily: 'sans-serif' }}>
          Sign up with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 999, paddingVertical: 16, paddingHorizontal: 24, width: '100%', borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16, backgroundColor: '#fff' }}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Log in to my account"
      >
        <Ionicons name="person-outline" size={22} color="#2563EB" style={{ marginRight: 12 }} />
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', fontFamily: 'sans-serif' }}>
          Log in to my account
        </Text>
      </TouchableOpacity>
      <Text style={{ marginVertical: 8, color: '#6B7280', fontWeight: 'bold', fontSize: 14 }}>OR</Text>
      <TouchableOpacity
        style={{ borderRadius: 999, paddingVertical: 16, paddingHorizontal: 24, width: '100%', marginTop: 8, backgroundColor: '#2563EB', borderWidth: 1, borderColor: '#2563EB' }}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel="Continue to Home"
        onPress={async () => {
          await AsyncStorage.setItem('hasSeenSplash', 'true');
          router.replace('/(tabs)');
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', textAlign: 'center', fontFamily: 'sans-serif' }}>
          Continue without Login
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 32, textAlign: 'center', fontFamily: 'sans-serif' }}>
        By creating account you accept terms of use and privacy policy
      </Text>
    </View>
  );
} 
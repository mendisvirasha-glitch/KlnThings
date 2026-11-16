
import { Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

import { ProfileProvider } from '../context/ProfileContext';
import { FavoritesProvider } from '../context/SavedEventsContext';

import {
  requestNotificationPermission,
  sendWelcomeNotification,
} from '../utils/notifications';

export default function RootLayout() {
  const appState = useRef<string | null | undefined>(
    AppState.currentState
  );

  useEffect(() => {
    async function setupNotifications() {
      const permissionGranted =
        await requestNotificationPermission();

      if (permissionGranted) {
        await sendWelcomeNotification();
      }
    }

    setupNotifications().catch((error) => {
      console.log('Notification setup error:', error);
    });

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (
          appState.current?.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log(
            'KlnThings is back in the foreground!'
          );
        }

        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <FavoritesProvider>
      <ProfileProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ProfileProvider>
    </FavoritesProvider>
  );
}

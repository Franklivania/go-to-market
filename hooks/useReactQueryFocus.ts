import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { focusManager } from '@tanstack/react-query';

function onAppStateChange(status: string) {
  // When app comes to foreground, set focused = true
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

/**
 * Call this once at the top of your app to sync AppState to React Query focusManager.
 */
export function useReactQueryFocus() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);
}

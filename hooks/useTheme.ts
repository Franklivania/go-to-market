import { colors } from '@/constants/Colours';
import { FONT_FAMILIES } from '@/constants/Fonts';
import { ThemeColors, themes } from '@/constants/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

// Define available theme modes
type ThemeMode = 'light' | 'dark' | 'system';

// Hook to manage theme
export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [currentTheme, setCurrentTheme] = useState<ThemeColors & { fonts: { regular: string; italic: string; semibold: string } }>(
    { ...themes.light, fonts: {
      regular: FONT_FAMILIES.regular,
      italic: FONT_FAMILIES.italic,
      semibold: FONT_FAMILIES.regular, // Adjust if you have a semibold font file
    } }
  );

  // Load saved theme preference from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode');
        if (savedTheme) {
          setThemeMode(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Update theme based on device appearance or user preference
  useEffect(() => {
    const updateTheme = (deviceTheme: ColorSchemeName) => {
      if (themeMode === 'system') {
        setCurrentTheme({ ...themes[deviceTheme === 'dark' ? 'dark' : 'light'] });
      } else {
        setCurrentTheme({ ...themes[themeMode] });
      }
    };

    // Set initial theme
    updateTheme(Appearance.getColorScheme());

    // Listen for device theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme(colorScheme);
    });

    return () => subscription.remove();
  }, [themeMode]);

  // Function to set and persist theme preference
  const setUserTheme = async (mode: ThemeMode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return {
    theme: currentTheme,
    themeMode,
    setTheme: setUserTheme,
    themes, // Expose themes for flexibility
    colors, // Expose raw colors for custom usage
  };
};
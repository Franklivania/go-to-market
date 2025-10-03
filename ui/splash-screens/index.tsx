import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import ScreenOne from "./screen-one";
import ScreenTwo from "./screen-two";

const { width: screenWidth } = Dimensions.get("window");

interface SplashScreensProps {
  isNewUser?: boolean;
}

export default function SplashScreens({ isNewUser = true }: SplashScreensProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Auto-advance functionality
  useEffect(() => {
    if (!autoAdvance) return;

    const timer = setTimeout(() => {
      if (currentIndex < 1) {
        const nextIndex = currentIndex + 1;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, autoAdvance]);

  const handleNext = () => {
    setAutoAdvance(false); // Stop auto-advance when user interacts
    if (currentIndex < 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const handleBack = () => {
    setAutoAdvance(false); // Stop auto-advance when user interacts
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({
        x: prevIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(prevIndex);
    }
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / screenWidth);
    setCurrentIndex(index);
    setAutoAdvance(false); // Stop auto-advance when user manually scrolls
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        <View style={styles.screen}>
          <ScreenOne onNext={handleNext} />
        </View>
        <View style={styles.screen}>
          <ScreenTwo isNewUser={isNewUser} onBack={handleBack} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  screen: {
    width: screenWidth,
    flex: 1,
  },
});

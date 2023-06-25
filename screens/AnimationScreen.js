//AnimationScreen.js

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, SafeAreaView, View } from 'react-native';

const AnimationScreen = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const animationLoop = useRef(null);

  useEffect(() => {
    animationLoop.current = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    // Start the animation loop
    animationLoop.current.start();

    // Stop the animation loop after 10 seconds
    setTimeout(() => {
      animationLoop.current.stop();
    }, 10000);

    // Clean up the animation loop when the component unmounts
    return () => {
      animationLoop.current.stop();
    };
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'blue',
            transform: [{ rotate }],
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AnimationScreen;


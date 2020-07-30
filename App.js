import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Carousel from './src/components/Carousel';
import CarouselDetail from './src/components/CarouselDetail';
import { createAppContainer } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const AppNavigator = createSharedElementStackNavigator(
  {
    Places: {
      screen: Carousel,
    },
    Details: {
      screen: CarouselDetail,
    },
  },
  {
    initialRouteName: 'Places',
    headerMode: 'none',
    defaultNavigationOptions: {
      gestureEnabled: false,
      cardStyleInterpolator: ({ current: { progress } }) => {
        return {
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0.2, 1],
            }),
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [200, 0],
                }),
              },
            ],
          },
        };
      },
      cardStyle: {
        backgroundColor: 'transparent',
      },
    },
  }
);

export default createAppContainer(AppNavigator);

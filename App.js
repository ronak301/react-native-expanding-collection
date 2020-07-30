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
  }
);

export default createAppContainer(AppNavigator);

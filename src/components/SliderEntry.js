import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import { SharedElement } from 'react-navigation-shared-element';

export default (props) => {
  const {
    data: { title, subtitle },
    even,
    id,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const expand = () => {
    if (!isExpanded) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      props.navigation.navigate('Details');
    }
  };

  const headerTitle = title ? (
    <Text style={styles.headerTitle} numberOfLines={1}>
      {title.toUpperCase()}
    </Text>
  ) : (
    false
  );

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const textScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const getImage = () => {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
      even,
      id,
    } = props;

    return false ? (
      <SharedElement id={id}>
        <ParallaxImage
          source={{ uri: illustration }}
          containerStyle={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}
          style={[styles.image]}
          parallaxFactor={0.35}
          showSpinner={true}
          spinnerColor={
            even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'
          }
          {...parallaxProps}
        />
      </SharedElement>
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  };

  const uppercaseTitle = title ? (
    <Animated.Text
      style={[
        styles.title,
        {
          transform: [
            {
              scale: textScale,
            },
          ],
        },
      ]}
      numberOfLines={2}
    >
      {title.toUpperCase()}
    </Animated.Text>
  ) : (
    false
  );

  const txtCtr = (
    <Animated.View
      style={[
        styles.textContainer,
        {
          transform: [
            {
              translateY,
            },
            {
              scale,
            },
          ],
        },
      ]}
    >
      <View style={styles.textInnerCtr}>
        {uppercaseTitle}
        <Animated.Text
          style={[
            styles.subtitle,
            {
              transform: [
                {
                  scale: textScale,
                },
              ],
            },
          ]}
          numberOfLines={2}
        >
          {subtitle}
        </Animated.Text>
      </View>
    </Animated.View>
  );

  const nameOverlay = <View style={styles.nameOverlay}>{headerTitle}</View>;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={() => {
        setSelectedIndex(id);
        setIsExpanded(true);
        expand();
      }}
    >
      <View style={styles.shadow} />
      <View
        style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
      >
        {txtCtr}
        {getImage()}
        {nameOverlay}
      </View>
    </TouchableOpacity>
  );
};

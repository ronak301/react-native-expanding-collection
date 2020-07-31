import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from '../styles/index.style';
import { ENTRIES1 } from '../static/entries';
import { BlurView } from '@react-native-community/blur';

const SLIDER_1_FIRST_ITEM = 1;

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
        {...this.props}
      />
    );
  };

  _renderLightItem({ item }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item }) {
    return <SliderEntry data={item} even={true} />;
  }

  mainExample() {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Explore`}</Text>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={-40}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loopClonesPerSide={2}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
      </View>
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const example1 = this.mainExample();
    const { slider1ActiveSlide } = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={{ uri: ENTRIES1[slider1ActiveSlide].illustration }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          {example1}
        </View>
      </SafeAreaView>
    );
  }
}

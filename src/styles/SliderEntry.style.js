import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.42;
const slideWidth = wp(68);
const itemHorizontalMargin = wp(4);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
  },
  imageContainerEven: {},
  image: {
    width: slideWidth,
    height: slideHeight,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {},
  textContainer: {
    ...StyleSheet.absoluteFill,
    width: slideWidth,
    height: slideHeight * 0.9,
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    opacity: 0.8,
  },
  textInnerCtr: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  nameOverlay: {
    ...StyleSheet.absoluteFill,
    width: slideWidth,
    height: slideHeight - 20,
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
    backgroundColor: 'transparent',
  },
  textContainerEven: {},
  title: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    alignSelf: 'center',
    textAlign: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
  titleEven: {
    color: 'black',
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

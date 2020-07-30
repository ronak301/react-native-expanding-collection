import React from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Description from './Description';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width,
    height: 300,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
  },
});

const Detail = (props) => {
  const data = props.navigation.getParam('data');
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <SharedElement id={data.placeId}>
        <Image source={{ uri: data.illustration }} style={styles.image} />
      </SharedElement>
      <SafeAreaView style={styles.thumbnailOverlay}>
        <Icon.Button
          size={24}
          name="x"
          backgroundColor="transparent"
          underlayColor="transparent"
          onPress={() => goBack()}
          style={{
            shadowColor: 'black',
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
          }}
        />
      </SafeAreaView>
      <Description data={data} />
    </View>
  );
};

export default Detail;

Detail.sharedElements = (navigation) => {
  const data = navigation.getParam('data');
  return [data.placeId];
};

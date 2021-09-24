import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BackIcon } from '../components/BackIcon';
import { animation2Specs } from '../shared/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SharedElement } from 'react-navigation-shared-element';
AntDesign.loadFont();
const { FULL_SIZE, ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING } = animation2Specs;

interface Props {
  navigation: any;
  route: any;
}

const TravelListDetail: React.FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <AntDesign
          name="arrowleft"
          size={24}
          style={styles.backButton}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <SharedElement
          id={`item.${item.id}.photo`}
          style={StyleSheet.absoluteFillObject}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { overflow: 'hidden', borderRadius: RADIUS },
            ]}>
            <Image
              source={{ uri: item.image }}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  resizeMode: 'cover',
                },
              ]}
            />
          </View>
        </SharedElement>
      </View>
      <SharedElement id={`item.${item.id}.location`}>
        <Text style={[styles.location]}>{item.location}</Text>
      </SharedElement>
    </SafeAreaView>
  );
};

export default TravelListDetail;

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    position: 'absolute',
    top: 100,
    left: SPACING * 2,
  },
  backButton: {
    paddingHorizontal: SPACING,
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 2,
  },
});

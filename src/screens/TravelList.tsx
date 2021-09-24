import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated,
} from 'react-native';
import { travelData } from '../shared/statics';
import { animation2Specs } from '../shared/constants';
import { SharedElement } from 'react-navigation-shared-element';

const { FULL_SIZE, ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING } = animation2Specs;

interface Props {
  navigation: any;
}

export const TravelList: React.FC<Props> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        data={travelData}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate={'fast'} // makes the snaping faster
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          });

          // const scale = scrollX.interpolate({
          //   inputRange,
          //   outputRange: [1, 1.1, 1],
          // });

          return (
            <TouchableOpacity
              onPress={() => navigation.push('TravelListDetail', { item })} // currently this screen TravelListDetail doesn't exist
              style={styles.itemContainer}>
              <SharedElement
                id={`item.${item.id}.photo`}
                style={StyleSheet.absoluteFillObject}>
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { overflow: 'hidden', borderRadius: RADIUS },
                  ]}>
                  <Animated.Image
                    source={{ uri: item.image }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        resizeMode: 'cover',
                        // transform: [
                        //   {
                        //     scale,
                        //   },
                        // ],
                      },
                    ]}
                  />
                </View>
              </SharedElement>

              <SharedElement id={`item.${item.id}.location`}>
                <Animated.Text
                  style={[
                    styles.location,
                    {
                      transform: [{ translateX }],
                    },
                  ]}>
                  {item.location}
                </Animated.Text>
              </SharedElement>
              <View style={styles.daysContainer}>
                <Text style={styles.numberOfDaysValue}>
                  {item.numberOfDays}
                </Text>
                <Text style={styles.numberOfDaysLabel}>days</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  location: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    position: 'absolute',
    top: SPACING * 2,
    left: SPACING * 2,
  },
  numberOfDaysValue: {
    fontWeight: '800',
    color: '#ffffff',
    fontSize: 18,
  },
  numberOfDaysLabel: {
    color: '#ffffff',
    fontSize: 10,
  },
  daysContainer: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

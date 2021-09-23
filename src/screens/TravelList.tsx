import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import { travelData } from '../shared/statics';
import { animation2Specs } from '../shared/constants';

const { FULL_SIZE, ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING } = animation2Specs;

interface Props {
  navigation: any;
}

export const TravelList: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={travelData}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate={'fast'} // makes the snaping faster
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => null} style={styles.itemContainer}>
              <Image
                source={{ uri: item.image }}
                style={[StyleSheet.absoluteFillObject, { resizeMode: 'cover' }]}
              />
              <Text style={styles.location}>{item.location}</Text>
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
    top: SPACING,
    left: SPACING,
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

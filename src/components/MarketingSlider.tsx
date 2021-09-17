import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ITEM_WIDTH, SPACING, width } from '../shared/constants';
import { SLIDER_DATA } from '../shared/statics';

export const MarketingSlider = () => {
  return (
    <View>
      <FlatList
        data={SLIDER_DATA}
        keyExtractor={item => item.color}
        horizontal
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        contentContainerStyle={{
          paddingVertical: 40,
          paddingRight: width - ITEM_WIDTH - SPACING * 2,
        }}
        style={{
          paddingHorizontal: SPACING + 12,
        }}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={[styles.itemContainer, { backgroundColor: item.color }]}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING,
  },
  itemText: {
    textTransform: 'uppercase',
    color: '#555555',
    fontWeight: '600',
    fontSize: 18,
  },
});

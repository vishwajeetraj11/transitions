import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Icon } from '../components/Icon';
import { MarketingSlider } from '../components/MarketingSlider';
import { SPACING } from '../shared/constants';
import { DATA } from '../shared/statics';

const List = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MarketingSlider />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 'auto',
        }}>
        {DATA.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              style={{
                padding: SPACING,
              }}
              onPress={() => {}}>
              <Icon uri={item.imageUri} />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default List;

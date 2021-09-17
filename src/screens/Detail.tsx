import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { BackIcon } from '../components/BackIcon';
import { Icon } from '../components/Icon';
import { SPACING, width } from '../shared/constants';
import { DATA } from '../shared/statics';

interface Props {
  navigation: any;
  sharedElements: any;
}

const Detail: React.FC<Props> = ({ navigation }) => {
  const item = DATA[0];
  const ref = React.useRef();
  const selectedItemIndex = DATA.findIndex(i => i.id === item.id);
  return (
    <SafeAreaView>
      <BackIcon onPress={() => navigation?.goBack()} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginVertical: 20,
        }}>
        {DATA.map(item => (
          <TouchableOpacity style={{ padding: SPACING }} key={item.id}>
            <SharedElement id={`item.${item.id}.icon`}>
              <Icon uri={item.imageUri} />
            </SharedElement>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={selectedItemIndex}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <ScrollView
              style={{
                width: width - SPACING * 2,
                margin: SPACING,
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: 16,
              }}>
              <View style={{ padding: SPACING }}>
                <Text style={{ fontSize: 16, color: '#000000' }}>
                  {Array(50).fill(`${item.title} inner text \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </SafeAreaView>
  );
};

// Detail.sharedElements = (route: any, otherRoute: any, showing: any) => {
//   // const { item } = route.params;
//   return DATA.map(item => `item.${item.id}.icon`);

//   // In case if you want to animate only 1 item
//   // return [`item.${item.id}.icon`];
// };

export default Detail;

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { BackIcon } from '../components/BackIcon';
import { Icon } from '../components/Icon';
import { ICON_SIZE, SPACING, width } from '../shared/constants';
import { DATA } from '../shared/statics';

interface Props {
  navigation: any;
  sharedElements: any;
  route: any;
}

const Detail: React.FC<Props> = ({ navigation, route }) => {
  // const item = DATA[0];
  const item = route.params.item;
  const ref: any = React.useRef();
  const selectedItemIndex = DATA.findIndex(i => i.id === item.id);

  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
  const activeIndexAnimation = useRef(
    new Animated.Value(selectedItemIndex),
  ).current;

  const SIZE = ICON_SIZE + SPACING * 2;

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [SIZE, 0, -SIZE],
  });

  const animation = (toValue: number, delay?: number) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start();
  });

  return (
    <SafeAreaView>
      <BackIcon
        onPress={() => {
          // wait for the animation for finish before back
          animation(0).start(() => {
            navigation.goBack();
          });
        }}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginVertical: 20,
          marginLeft: width / 2 - ICON_SIZE / 2 - SPACING, // for icons list to start at the middle of the screen
          transform: [{ translateX }],
        }}>
        {DATA.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];
          const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          return (
            <TouchableOpacity
              style={{ padding: SPACING, alignItems: 'center' }}
              key={item.id}
              onPress={() => {
                // Animated the list to any other index (ICON and ICON CONTENT)
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true,
                });
              }}>
              <Animated.View style={{ opacity }}>
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
              </Animated.View>
              <Text style={{ fontSize: 12, marginTop: 15 }}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.FlatList
        style={{
          opacity: mountedAnimated,
          transform: [{ translateY }],
        }}
        ref={ref}
        onMomentumScrollEnd={event => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / width,
          );
          activeIndex.setValue(newIndex);
        }}
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

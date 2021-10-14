import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
  View,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { SharedElement } from 'react-navigation-shared-element';
import { width } from '../shared/constants';
import { A3data } from '../shared/statics';

const IMAGE_WIDTH = width * 0.86;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIBLE_ITEMS = 4;

interface Props {
  navigation: any;
}

export const TravelUpList: React.FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactiveAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, reactiveAnimated]);

  const setActiveSlide = useCallback(
    newIndex => {
      setActiveIndex(newIndex);
      reactiveAnimated.setValue(newIndex);
    },
    [reactiveAnimated],
  );

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={event => {
        if (event.nativeEvent.state === State.END) {
          // increment index
          if (activeIndex === 0) return;
          setActiveSlide(activeIndex - 1);
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.END) {
            // increment index
            if (activeIndex === A3data.length - 1) return;
            setActiveSlide(activeIndex + 1);
          }
        }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1D1D' }}>
          <StatusBar hidden />
          <FlatList
            scrollEnabled={false}
            data={A3data}
            keyExtractor={item => item.key}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            CellRendererComponent={({
              index,
              item,
              children,
              style,
              ...props
            }) => {
              // in order to make the flatlist position absolute, the cellRendererComponent needs to be modified
              const newStyle = [
                style,
                {
                  zIndex: A3data.length - index,
                  left: -IMAGE_WIDTH / 2,
                  top: -IMAGE_HEIGHT / 2,
                },
              ];
              return (
                <View index={index} {...props} style={newStyle}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateY = animatedValue.interpolate({
                inputRange,
                outputRange: [-30, 0, 30],
              });
              const opacity = animatedValue.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const scale = animatedValue.interpolate({
                inputRange,
                outputRange: [0.92, 1, 1.2],
              });
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    opacity,
                    transform: [
                      {
                        translateY,
                      },
                      {
                        scale,
                      },
                    ],
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // console.log('LIST SCREEN: ', `item.${item.key}.name`);
                      // console.log('LIST SCREEN: ', `item.${item.key}.image`);
                      navigation.navigate('TravelUpDetail', {
                        item: A3data[activeIndex],
                      });
                    }}>
                    <>
                      <SharedElement
                        id={`item.${item.key}.image`}
                        style={styles.image}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.image}
                        />
                      </SharedElement>
                      <View
                        style={{ position: 'absolute', bottom: 20, left: 20 }}>
                        <SharedElement id={`item.${item.key}.name`}>
                          <Text
                            style={styles.name}
                            numberOfLines={1}
                            adjustsFontSizeToFit>
                            {item.name}
                          </Text>
                        </SharedElement>
                      </View>
                    </>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  name: {
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '900',
  },
});

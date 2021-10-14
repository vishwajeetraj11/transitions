import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { avatars } from '../shared/statics';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
import { width, height } from '../shared/constants';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

const Height = () => {
  return (
    <View>
      <Text style={styles.heading}>Height</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={styles.number}>
          {Math.floor(Math.random() * 2200) + 1000}
        </Text>
        <Text style={styles.numberType}>m</Text>
      </View>
    </View>
  );
};

const Distance = () => {
  return (
    <View>
      <Text style={styles.heading}>Distance</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={styles.number}>{Math.floor(Math.random() * 40) + 20}</Text>
        <Text style={styles.numberType}>km</Text>
      </View>
    </View>
  );
};

const Avatars = () => {
  return (
    <View>
      <Text style={styles.heading}>Your Team</Text>
      <View style={{ flexDirection: 'row' }}>
        {avatars.map((uri, index) => {
          return (
            <Image
              key={index}
              source={{ uri: uri.uri }}
              style={[
                styles.avatar,
                {
                  zIndex: avatars.length - index,
                  marginLeft: index === 0 ? 0 : -20,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export const TravelUpDetails = ({ navigation, route }: any) => {
  const { item } = route.params;
  // console.log(item);
  // refs are needed to fade out the bottom details before navigating back to the earlier screeen
  const topRef = useRef<any>();
  const bottomRef = useRef<any>();
  // console.log('DETAIL SCREEN: ', `item.${item.key}.name`);
  // console.log('DETAIL SCREEN: ', `item.${item.key}.image`);

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1D1D' }}>
      <SharedElement id={`item.${item.key}.image`} style={styles.image}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </SharedElement>

      <Animatable.View
        ref={topRef}
        animation="fadeIn"
        duration={800}
        delay={600}
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: 'rgba(0,0,0,0.3)' },
        ]}>
        <AntDesign
          name="arrowleft"
          size={28}
          style={{
            padding: 12,
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 2,
          }}
          color="#ffffff"
          onPress={() => {
            Promise.all([
              topRef.current.fadeOut(300),
              bottomRef.current.fadeOut(300),
            ]).then(() => {
              navigation.goBack();
            });
          }}
        />
        {/* <linearGradient */}
      </Animatable.View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 70,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'flex-start',
          }}>
          <SharedElement id={`item.${item.key}.name`}>
            <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
              {item.name}
            </Text>
          </SharedElement>
        </View>
        <Animatable.View
          animation="fadeIn"
          duration={800}
          delay={700}
          style={{
            width,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
          ref={bottomRef}>
          <Avatars />
          <Height />
          <Distance />
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: '#000',
  },
  heading: {
    color: '#ffffff',
    fontWeight: '300',
    marginBottom: 8,
  },
  number: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 32,
    marginRight: 2,
    marginBottom: -5,
  },
  numberType: {
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 12,
  },
  name: {
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 62,
    fontWeight: '900',
  },
});

import { Image, StyleSheet, View } from 'react-native';
import { ICON_SIZE } from '../shared/constants';
import React from 'react';

interface Props {
  uri: string;
}

export const Icon: React.FC<Props> = ({ uri }) => {
  return (
    <View style={[styles.imageContainer]}>
      <Image source={{ uri }} style={[styles.image]} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: ICON_SIZE * 0.6,
    height: ICON_SIZE * 0.6,
    resizeMode: 'contain',
  },
});

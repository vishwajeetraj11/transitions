import React from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
interface Props {
  onPress: () => void;
}

export const BackIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      style={styles.backButton}
      color="#333"
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 12,
  },
});

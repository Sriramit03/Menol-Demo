import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

const LoadingModal = ({ visible}: { visible: boolean,}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
          <ActivityIndicator size="large" color={colors.primaryBlack} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
});

export default LoadingModal;

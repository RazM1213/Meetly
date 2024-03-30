import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Tooltip } from 'react-native-paper';
import { flushStorage } from '../utils/storage';




export const FloatingSettingsButton: React.FC = () => {
  return (
    <View style={styles.floatingButton}>
      <Tooltip title="Notifications">
        <IconButton
          icon="bell"
          size={24}
        />
      </Tooltip>
      <Tooltip title="Settings">
        <IconButton
          icon="cog"
          size={24}
          onPress={() => flushStorage()}
        />
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 5,
    top: 35,
    zIndex: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

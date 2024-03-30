import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Text, List } from 'react-native-paper';
import { useSavedLocations } from '../core/hooks/useSavedLocations';

export function SavedLocationsScreen({ navigation }: any) {

  const { savedLocations } = useSavedLocations();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedLocations}
        keyExtractor={(l) => l.latitude.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description="Petah Tikva"
            onPress={() => {}}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SavedLocationsScreen;

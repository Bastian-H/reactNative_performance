//ListsScreen.js

import React from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';

const ListScreen = () => {
  const renderItem = ({ index }) => (
    <View accessibilityLabel={`item${index}`}>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: `https://picsum.photos/seed/${index + 1}/50` }}
      />
      <Text>Item {index}</Text>
      <Text>Subtitle for item {index}</Text>
    </View>
);
  

  return (
    <SafeAreaView>
      <FlatList
        data={Array.from({ length: 1000 }, (_, index) => ({ index }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.index.toString()}
      />
    </SafeAreaView>
  );
};

export default ListScreen;
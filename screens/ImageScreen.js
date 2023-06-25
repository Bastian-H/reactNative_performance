//ImageScreen.js

import React from 'react';
import { FlatList, SafeAreaView, Image, Dimensions } from 'react-native';
import images from '../assets/images/images';

const numColumns = 3;
const imageSize = Dimensions.get('window').width / numColumns;

const ImageScreen = () => {
  const renderItem = ({ item }) => (
    <Image style={{ width: imageSize, height: imageSize }} source={item} />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
};

export default ImageScreen;
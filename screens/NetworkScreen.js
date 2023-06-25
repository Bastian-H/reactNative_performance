//NetworkScreen.js

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import axios from 'axios';

const NetworkScreen = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=200');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
   
    };

    fetchData();
}, []);

const renderItem = ({ item }) => (
<View>
<Text>{item.title}</Text>
<Text>ID: {item.id}</Text>
</View>
);

if (error) {
return (
<SafeAreaView>
<Text>{error}</Text>
</SafeAreaView>
);
}

if (!data) {
return (
<SafeAreaView>
<ActivityIndicator />
</SafeAreaView>
);
}

return (
<SafeAreaView>
<FlatList
data={data}
renderItem={renderItem}
keyExtractor={(item) => item.id.toString()}
/>
</SafeAreaView>
);
};

export default NetworkScreen;
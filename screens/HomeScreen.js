//HomeScreen.js

import { Button, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { runCpuWorkload, runRamWorkload, runCpuWorkloadFixedTime } from '../util/workload';
import React, { useState } from 'react';


const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <Button title="List Page" onPress={() => navigation.navigate('List')} testID="List Page" accessibilityLabel="List Page" />
        <Button title="Image Page" onPress={() => navigation.navigate('Image')} />
        <Button title="Animation Page" onPress={() => navigation.navigate('Animation')} />
        <Button title="Network Page" onPress={() => navigation.navigate('Network')} />
        <Button title="CPU Workload" onPress={() => runCpuWorkload(10000)} />
        <Button title="CPU Workload Fixed Time" onPress={() => runCpuWorkloadFixedTime(10000)} />
        <Button title="RAM Workload" onPress={() => runRamWorkload(10000)} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
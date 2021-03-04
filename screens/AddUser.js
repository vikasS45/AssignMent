import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AddUser = () => {
  return (
    <View style={styles.container}>
      <Text>AddUser</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AddUser;

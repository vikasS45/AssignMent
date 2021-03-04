/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import AddUser from '../screens/AddUser';

const Stack = createStackNavigator();
const StackNavigation = () => {
        return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

           <Stack.Screen
                name="AddUser"
                component={AddUser}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigation;

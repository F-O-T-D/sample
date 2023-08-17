import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MapRoutes, ContentRoutes } from './Routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../Screens/ListScreen';
import MapScreen from '../Screens/MapScreen';
import ListMapScreen from '../Screens/ListMapScreen';
import { BACKCARROT, PRIMARY } from '../Colors';
const Stack = createNativeStackNavigator();

const MapNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name={ContentRoutes.LIST}
          component={ListScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: BACKCARROT },
            headerTintColor: PRIMARY.DEFAULT,
          }}
        />
        <Stack.Screen
          name={MapRoutes.MAP}
          component={MapScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: BACKCARROT },
            headerTintColor: PRIMARY.DEFAULT,
          }}
        />
        <Stack.Screen
          name={MapRoutes.LISTMAP}
          component={ListMapScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: BACKCARROT },
            headerTintColor: PRIMARY.DEFAULT,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MapNavigation;

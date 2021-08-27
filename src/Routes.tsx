import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Movies from './pages/Movies';
import Cart from './pages/Cart';
import MovieInfo from './pages/MovieInfo';
import { IStackParamList } from './types/IStackParamsList';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator<IStackParamList>();

function MoviesStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Movies' component={Movies} />
      <Stack.Screen name='MovieInfo' component={MovieInfo} />
    </Stack.Navigator>
  )
}

function MovieCartStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Cart' component={Cart} />
      <Stack.Screen name='Movies' component={Movies} />
    </Stack.Navigator>
  )
}
export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = 'film-outline';

            if (route.name === 'Carrinho') {
              iconName = 'cart-outline'
            }

            return <Icon name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name='Filmes' component={MoviesStackScreen} />
        <Tab.Screen name='Carrinho' component={MovieCartStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

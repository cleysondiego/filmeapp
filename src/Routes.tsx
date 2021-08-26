import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Movies from './pages/Movies';
import Cart from './pages/Cart';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'film-outline';

          if (route.name === "Carrinho") {
            iconName = 'cart-outline'
          }

          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
    >
        <Tab.Screen name="Filmes" component={Movies} />
        <Tab.Screen name="Carrinho" component={Cart} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

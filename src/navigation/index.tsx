import React, { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { EventsProvider } from '../context/EventsContext';
import { FriendsProvider } from '../context/FriendsContext';
import { logScreenView } from '../services/analytics';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const navRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const routeNameRef = useRef<string | undefined>(undefined);

  return (
    <EventsProvider>
      <FriendsProvider>
        <NavigationContainer
          ref={navRef}
          onReady={() => {
            routeNameRef.current = navRef.current?.getCurrentRoute()?.name;
            if (routeNameRef.current) logScreenView(routeNameRef.current);
          }}
          onStateChange={() => {
            const previous = routeNameRef.current;
            const current = navRef.current?.getCurrentRoute()?.name;
            if (current && current !== previous) {
              routeNameRef.current = current;
              logScreenView(current);
            }
          }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="Main" component={MainNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </FriendsProvider>
    </EventsProvider>
  );
}

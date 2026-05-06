import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsScreen from '../screens/friends/FriendsScreen';
import InviteMoreScreen from '../screens/friends/InviteMoreScreen';
import NewFriendsListScreen from '../screens/friends/NewFriendsListScreen';

export type FriendsStackParamList = {
  Friends: undefined;
  InviteMore: { eventId?: string };
  NewFriendsList: undefined;
};

const Stack = createNativeStackNavigator<FriendsStackParamList>();

export default function FriendsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="InviteMore" component={InviteMoreScreen} />
      <Stack.Screen name="NewFriendsList" component={NewFriendsListScreen} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import ChangeEmailScreen from '../screens/profile/ChangeEmailScreen';
import ChangePersonalDataScreen from '../screens/profile/ChangePersonalDataScreen';

export type ProfileStackParamList = {
  UserProfile: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  ChangeEmail: undefined;
  ChangePersonalData: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      <Stack.Screen name="ChangePersonalData" component={ChangePersonalDataScreen} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import EventsNavigator from './EventsNavigator';
import FriendsNavigator from './FriendsNavigator';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileNavigator, { ProfileStackParamList } from './ProfileNavigator';
import { BottomNavBar } from '../components/common/BottomNavBar';

// typy dla zakładek 
export type MainTabParamList = {
  events: undefined;
  friends: undefined;
  notifications: undefined;
  profile: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <BottomNavBar 
          activeTab={props.state.routeNames[props.state.index] as any}
          onTabPress={(tab) => {
            if (tab === 'profile') {
              props.navigation.navigate('profile', { screen: 'UserProfile' });
              return;
            }
            props.navigation.navigate(tab);
          }}
          notificationCount={1} // zaciąga dane ze stanu/API
        />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="events" component={EventsNavigator} />
      <Tab.Screen name="friends" component={FriendsNavigator} />
      <Tab.Screen name="notifications" component={NotificationsScreen} />
      <Tab.Screen name="profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

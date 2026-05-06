import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import EventsNavigator from './EventsNavigator';
import FriendsNavigator from './FriendsNavigator';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileNavigator from './ProfileNavigator';
import { BottomNavBar, BottomTab } from '../components/common/BottomNavBar';

export default function MainNavigator() {
  const [activeTab, setActiveTab] = useState<BottomTab>('events');

  const renderScreen = () => {
    switch (activeTab) {
      case 'events':
        return <EventsNavigator />;
      case 'friends':
        return <FriendsNavigator />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileNavigator />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomNavBar
        activeTab={activeTab}
        onTabPress={setActiveTab}
        notificationCount={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});

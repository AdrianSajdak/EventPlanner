import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { AppIcon, AppIconName } from './AppIcon';

export type BottomTab = 'events' | 'friends' | 'notifications' | 'profile';

interface BottomNavBarProps {
  activeTab: BottomTab;
  onTabPress: (tab: BottomTab) => void;
  notificationCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabPress,
  notificationCount,
}) => {
  const tabs: { key: BottomTab; label: string; icon: AppIconName }[] = [
    { key: 'events', label: 'Wydarzenia', icon: 'calendar' },
    { key: 'friends', label: 'Znajomi', icon: 'friends' },
    { key: 'notifications', label: 'Powiadomienia', icon: 'notifications' },
    { key: 'profile', label: 'Profil', icon: 'profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <AppIcon name={tab.icon} size={22} color={Colors.white} />
              {tab.key === 'notifications' && notificationCount ? (
                <View style={styles.badge} />
              ) : null}
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.secondaryDarkBlue,
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: Colors.navbarFocus,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.errorRed,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xs,
    color: Colors.white,
    letterSpacing: 0.25,
    marginTop: 2,
  },
  activeLabel: {
    fontFamily: Fonts.bold,
  },
});

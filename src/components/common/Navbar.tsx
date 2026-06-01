import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { AppIcon } from './AppIcon';
import { GradientSurface } from './GradientSurface';

interface NavbarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
  showMenu?: boolean;
}

const VerticalDots = () => (
  <View style={styles.dotsContainer}>
    <View style={styles.dot} />
    <View style={styles.dot} />
    <View style={styles.dot} />
  </View>
);

export const Navbar: React.FC<NavbarProps> = ({
  title,
  showBack,
  onBack,
  onMenu,
  showMenu = true,
}) => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handleMenuPress = () => {
    if (onMenu) {
      onMenu();
      return;
    }
    navigation.navigate('profile', { screen: 'Settings' });
  };

  return (
    <GradientSurface style={[styles.container, { paddingTop: insets.top, height: 60 + insets.top }]}>
      <TouchableOpacity onPress={onBack} style={styles.titleContainer} activeOpacity={0.7}>
        {showBack && <AppIcon name="arrowGoBack" size={24} color={Colors.white} />}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
      {showMenu && (
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton} activeOpacity={0.7}>
          <VerticalDots />
        </TouchableOpacity>
      )}
    </GradientSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    flex: 1,
  },
  menuButton: {
    padding: 4,
  },
  dotsContainer: {
    width: 4,
    gap: 3,
    alignItems: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2,
    backgroundColor: Colors.white,
    marginVertical: 1.5,
  },
});

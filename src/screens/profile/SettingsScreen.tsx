import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'Settings'>;
};

const SettingsItem = ({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.settingsIcon}>{icon}</Text>
    <Text style={[styles.settingsLabel, danger && styles.dangerText]}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Ustawienia" showBack onBack={() => navigation.goBack()} showMenu={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Konto</Text>
          <View style={styles.card}>
            <SettingsItem
              icon="📧"
              label="Zmień adres e-mail"
              onPress={() => navigation.navigate('ChangeEmail')}
            />
            <View style={styles.separator} />
            <SettingsItem
              icon="🔒"
              label="Zmień hasło"
              onPress={() => navigation.navigate('ChangePassword')}
            />
            <View style={styles.separator} />
            <SettingsItem
              icon="👤"
              label="Zmień dane personalne"
              onPress={() => navigation.navigate('ChangePersonalData')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Powiadomienia</Text>
          <View style={styles.card}>
            <SettingsItem icon="🔔" label="Zaproszenia na wydarzenia" onPress={() => {}} />
            <View style={styles.separator} />
            <SettingsItem icon="🗳️" label="Głosowania" onPress={() => {}} />
            <View style={styles.separator} />
            <SettingsItem icon="⏰" label="Przypomnienia" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aplikacja</Text>
          <View style={styles.card}>
            <SettingsItem icon="🌐" label="Język" onPress={() => {}} />
            <View style={styles.separator} />
            <SettingsItem icon="🎨" label="Motyw" onPress={() => {}} />
            <View style={styles.separator} />
            <SettingsItem icon="ℹ️" label="O aplikacji" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <SettingsItem icon="🚪" label="Wyloguj się" onPress={() => {}} danger />
            <View style={styles.separator} />
            <SettingsItem icon="🗑️" label="Usuń konto" onPress={() => {}} danger />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 20, paddingBottom: 40 },
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  settingsIcon: { fontSize: 20 },
  settingsLabel: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  dangerText: { color: '#D32F2F' },
  arrow: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.mainGraySecondary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 16,
  },
});

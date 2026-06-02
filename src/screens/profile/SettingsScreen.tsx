import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppIcon } from '../../components/common/AppIcon';
import { Navbar } from '../../components/common/Navbar';
import { logout } from '../../services/auth';
import { logLogout, setAnalyticsUserId } from '../../services/analytics';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'Settings'>;
};

type PushKey = 'eventChange' | 'replyReminder' | 'newInvite' | 'chatMessages';

const PushToggle = ({
  enabled,
  onPress,
}: {
  enabled: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.switchTrack}
    onPress={onPress}
    activeOpacity={0.8}
    accessibilityRole="switch"
    accessibilityState={{ checked: enabled }}
  >
    <View style={[styles.switchThumb, enabled ? styles.switchThumbOn : styles.switchThumbOff]}>
      <AppIcon
        name={enabled ? 'notificationSwitch' : 'notificationSilentSwitch'}
        size={18}
        color={Colors.white}
      />
    </View>
  </TouchableOpacity>
);

const AccountLink = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.accountLink}>
    <Text style={styles.accountLinkText}>{label}</Text>
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }: Props) {
  const [pushSettings, setPushSettings] = useState<Record<PushKey, boolean>>({
    eventChange: true,
    replyReminder: true,
    newInvite: false,
    chatMessages: false,
  });

  const togglePush = (key: PushKey) =>
    setPushSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = async () => {
    try {
      await logLogout();
      await logout();
      await setAnalyticsUserId(null);
    } catch {
      // intentionally silent
    }

    const rootNav = navigation.getParent<any>()?.getParent<any>();
    rootNav?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Ustawienia" showBack onBack={() => navigation.goBack()} showMenu={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pushSection}>
          <Text style={styles.sectionTitle}>Powiadomienia push</Text>

          <View style={styles.pushRow}>
            <Text style={styles.pushLabel}>Zmiana wydarzenia</Text>
            <PushToggle
              enabled={pushSettings.eventChange}
              onPress={() => togglePush('eventChange')}
            />
          </View>

          <View style={styles.pushRow}>
            <Text style={styles.pushLabel}>Przypomnij mi o odpowiedzi{'\n'}po 24 godzinach</Text>
            <PushToggle
              enabled={pushSettings.replyReminder}
              onPress={() => togglePush('replyReminder')}
            />
          </View>

          <View style={styles.pushRow}>
            <Text style={styles.pushLabel}>Nowe zaproszenie</Text>
            <PushToggle
              enabled={pushSettings.newInvite}
              onPress={() => togglePush('newInvite')}
            />
          </View>

          <View style={styles.pushRow}>
            <Text style={styles.pushLabel}>Wiadomości z czatu</Text>
            <PushToggle
              enabled={pushSettings.chatMessages}
              onPress={() => togglePush('chatMessages')}
            />
          </View>
        </View>

        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Konto</Text>
          <AccountLink
            label="Zmień adres e-mail"
            onPress={() => navigation.navigate('ChangeEmail')}
          />
          <AccountLink
            label="Zmień hasło"
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <AccountLink
            label="Zmień swoje dane"
            onPress={() => navigation.navigate('ChangePersonalData')}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.75}>
          <AppIcon name="logout" size={28} color={Colors.black} />
          <Text style={styles.logoutText}>Wyloguj się</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 120,
  },
  pushSection: {
    gap: 18,
  },
  accountSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 30,
    marginBottom: 12,
  },
  pushRow: {
    minHeight: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  pushLabel: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.secondaryDarkBlue,
    lineHeight: 29,
  },
  switchTrack: {
    width: 80,
    height: 30,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    backgroundColor: Colors.secondaryDarkBlue,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 4,
    overflow: 'hidden',
  },
  switchThumb: {
    position: 'absolute',
    top: 0,
    width: 42,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchThumbOn: {
    left: 0,
    backgroundColor: Colors.purpleAccent,
  },
  switchThumbOff: {
    right: 0,
    backgroundColor: Colors.graySecondary,
  },
  accountLink: {
    paddingVertical: 8,
  },
  accountLinkText: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.secondaryDarkBlue,
    lineHeight: 25,
  },
  logoutButton: {
    marginTop: 78,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  logoutText: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 30,
  },
});

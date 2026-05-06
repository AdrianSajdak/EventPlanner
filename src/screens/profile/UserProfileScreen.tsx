import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Button } from '../../components/common/Button';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'UserProfile'>;
};

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function UserProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Profil" onMenu={() => navigation.navigate('Settings')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.userName}>Adrian Sajdak</Text>
          <Text style={styles.userEmail}>adrian@example.pl</Text>
        </View>

        <View style={styles.statsRow}>
          <StatBox label="Wydarzeń" value="24" />
          <StatBox label="Zorganizowanych" value="8" />
          <StatBox label="Znajomych" value="12" />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ostatnia aktywność</Text>
          {['Wieczór z planszówkami', 'Kino Letnie', 'BBQ w ogrodzie'].map((event, i) => (
            <View key={i} style={styles.activityItem}>
              <Text style={styles.activityIcon}>🎭</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{event}</Text>
                <Text style={styles.activityDate}>
                  {i === 0 ? 'Za 2 dni' : i === 1 ? 'Za tydzień' : '2 tygodnie temu'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Button
          label="⚙️  Ustawienia"
          variant="secondary"
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 20, paddingBottom: 40 },
  profileHeader: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    shadowColor: Colors.actualMainBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontFamily: Fonts.extraBold,
    fontSize: 32,
    color: Colors.white,
  },
  userName: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xl,
    color: Colors.black,
    lineHeight: 32,
  },
  userEmail: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: Fonts.extraBold,
    fontSize: FontSizes.xl,
    color: Colors.actualMainBlue,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 20,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.secondaryDarkBlue,
    marginBottom: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  activityIcon: { fontSize: 24 },
  activityInfo: { gap: 2 },
  activityTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  activityDate: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
  },
  settingsBtn: { paddingVertical: 14 },
});

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { EventsStackParamList } from '../../navigation/EventsNavigator';

type Tab = 'info' | 'planning' | 'chat';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'EventDetails'>;
  route: RouteProp<EventsStackParamList, 'EventDetails'>;
};

const InfoTab = ({ navigation, eventId }: { navigation: any; eventId: string }) => (
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
    <TouchableOpacity style={styles.resignButton} activeOpacity={0.8}>
      <Text style={styles.resignText}>Zrezygnuj</Text>
      <Text style={styles.resignArrow}> →</Text>
    </TouchableOpacity>

    <View style={styles.statCard}>
      <Text style={styles.statIcon}>📅</Text>
      <View style={styles.statInfo}>
        <Text style={styles.statLabel}>Data i Godzina</Text>
        <Text style={styles.statValue}>15 Paź, 18:30</Text>
      </View>
    </View>

    <View style={styles.statCard}>
      <Text style={styles.statIcon}>🛡️</Text>
      <View style={styles.statInfo}>
        <Text style={styles.statLabel}>Twoja Rola</Text>
        <Text style={styles.statValue}>Uczestnik</Text>
      </View>
    </View>

    <View style={styles.locationCard}>
      <View style={styles.locationHeader}>
        <View>
          <Text style={styles.locationTitle}>Lokalizacja</Text>
          <Text style={styles.locationAddress}>Cybermachina, ul. Mikołajska 11</Text>
          <Text style={styles.locationCity}>Kraków, Polska</Text>
        </View>
        <TouchableOpacity style={styles.mapButton} activeOpacity={0.8}>
          <Text>🗺️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>📍</Text>
      </View>
    </View>

    <View style={styles.votingCard}>
      <View style={styles.votingHeader}>
        <Text style={styles.votingTitle}>Głosowanie: Godzina startu</Text>
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>AKTYWNE</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.voteOption} activeOpacity={0.8}>
        <View style={[styles.voteBar, { width: '80%' }]} />
        <Text style={styles.voteTime}>18:00</Text>
        <Text style={styles.votePercent}>80%</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.voteOption} activeOpacity={0.8}>
        <View style={[styles.voteBar, { width: '20%' }]} />
        <Text style={styles.voteTime}>19:00</Text>
        <Text style={styles.votePercent}>20%</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.participantsSection}>
      <View style={styles.participantsHeader}>
        <Text style={styles.participantsTitle}>Uczestnicy (8)</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Zobacz wszystkich</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarRow}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.participantAvatar, { marginLeft: i === 0 ? 0 : -12 }]}>
            <View style={styles.avatarPlaceholder} />
          </View>
        ))}
        <View style={[styles.participantAvatar, styles.countAvatar, { marginLeft: -12 }]}>
          <Text style={styles.countText}>+4</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

export default function EventDetailsScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const { eventId } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar
        title="Wieczór z planszówkami"
        showBack
        onBack={() => navigation.goBack()}
        onMenu={() => {}}
      />

      <View style={styles.tabBar}>
        {(['info', 'planning', 'chat'] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
            onPress={() => {
              setActiveTab(tab);
              if (tab === 'chat') navigation.navigate('Chat', { eventId });
              if (tab === 'planning') navigation.navigate('Planning', { eventId });
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>
              {tab === 'info' ? 'Info' : tab === 'planning' ? 'Planowanie' : 'Czat'}
            </Text>
            {tab === 'planning' && (
              <View style={styles.tabBadge} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <InfoTab navigation={navigation} eventId={eventId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    paddingHorizontal: 4,
    paddingVertical: 8,
    gap: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 4,
    position: 'relative',
  },
  activeTabItem: {
    backgroundColor: Colors.navbarFocus,
  },
  tabLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
    textAlign: 'center',
  },
  activeTabLabel: {
    fontFamily: Fonts.bold,
  },
  tabBadge: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.errorRed,
  },
  tabContent: {
    padding: 24,
    gap: 24,
    paddingBottom: 40,
  },
  resignButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.graySecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  resignText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.offWhite,
    lineHeight: 16,
  },
  resignArrow: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.offWhite,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    padding: 20,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  statIcon: { fontSize: 20 },
  statInfo: { gap: 4 },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.graySecondary,
    lineHeight: 16,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.black,
    lineHeight: 20,
  },
  locationCard: {
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  locationTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.secondaryDarkBlue,
    lineHeight: 24,
  },
  locationAddress: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.graySecondary,
    lineHeight: 20,
  },
  locationCity: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.graySecondary,
    lineHeight: 20,
  },
  mapButton: {
    backgroundColor: 'rgba(0,82,209,0.17)',
    borderRadius: 8,
    padding: 12,
  },
  mapPlaceholder: {
    height: 160,
    backgroundColor: Colors.cardGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: { fontSize: 40 },
  votingCard: {
    backgroundColor: 'rgba(0,82,209,0.17)',
    borderWidth: 2,
    borderColor: Colors.actualMainBlue,
    borderRadius: 4,
    padding: 16,
    gap: 12,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  votingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  votingTitle: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
  },
  activeBadge: {
    backgroundColor: 'rgba(0,82,209,0.17)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activeBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xs,
    color: Colors.actualMainBlue,
    lineHeight: 15,
  },
  voteOption: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  voteBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.navbarFocus,
  },
  voteTime: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
    position: 'absolute',
    left: 12,
  },
  votePercent: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
    position: 'absolute',
    right: 12,
  },
  participantsSection: { gap: 16 },
  participantsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  participantsTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.black,
    lineHeight: 24,
  },
  seeAll: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.actualMainBlue,
    lineHeight: 20,
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  participantAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#F8F9FA',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    backgroundColor: Colors.lightGray,
  },
  countAvatar: {
    backgroundColor: Colors.cardGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.graySecondary,
  },
});

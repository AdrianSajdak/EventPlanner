import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { Button } from '../../components/common/Button';
import { useEvents } from '../../context/EventsContext';

type Tab = 'info' | 'planning' | 'chat';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'EventDetailsOrganizer'>;
  route: RouteProp<EventsStackParamList, 'EventDetailsOrganizer'>;
};

export default function EventDetailsOrganizerScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const { eventId } = route.params;
  const { getEvent } = useEvents();
  const event = getEvent(eventId);

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar
        title={event.title}
        showBack
        onBack={() => navigation.goBack()}
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
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.organizerActions}>
          <Button
            label="Edytuj"
            variant="secondary"
            onPress={() => navigation.navigate('EventEditor', { eventId })}
            style={styles.actionBtn}
          />
          <Button
            label="Odwołaj"
            variant="primary"
            onPress={() => navigation.navigate('CancelEvent', { eventId })}
            style={styles.actionBtn}
          />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📅</Text>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Data i Godzina</Text>
            <Text style={styles.statValue}>{event.dateLabel}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🏆</Text>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Twoja Rola</Text>
            <Text style={styles.statValue}>Organizator</Text>
          </View>
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <View>
              <Text style={styles.locationTitle}>Lokalizacja</Text>
              <Text style={styles.locationAddress}>{event.locationStreet}</Text>
              <Text style={styles.locationCity}>{event.locationCity}</Text>
            </View>
            <TouchableOpacity style={styles.mapButton}>
              <Text>🗺️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>📍</Text>
          </View>
        </View>

        <View style={styles.participantsSection}>
          <View style={styles.participantsHeader}>
            <Text style={styles.participantsTitle}>Uczestnicy ({event.participantsTotal})</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Zaproś więcej</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Text style={styles.statusCount}>{event.participantsAccepted}</Text>
              <Text style={styles.statusLabel}>Zaakceptowało</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusCount}>{event.participantsPending}</Text>
              <Text style={styles.statusLabel}>Oczekujących</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusCount}>{event.participantsRejected}</Text>
              <Text style={styles.statusLabel}>Odrzuciło</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  activeTabItem: { backgroundColor: Colors.navbarFocus },
  tabLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
    textAlign: 'center',
  },
  activeTabLabel: { fontFamily: Fonts.bold },
  content: { padding: 24, gap: 24, paddingBottom: 40 },
  organizerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 20 },
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
  participantsSection: { gap: 12 },
  participantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.black,
  },
  seeAll: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.actualMainBlue,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statusItem: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  statusCount: {
    fontFamily: Fonts.extraBold,
    fontSize: FontSizes.xl,
    color: Colors.actualMainBlue,
  },
  statusLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
  },
});

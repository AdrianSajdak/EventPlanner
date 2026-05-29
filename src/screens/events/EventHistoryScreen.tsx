import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { useEvents } from '../../context/EventsContext';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'EventHistory'>;
  route: RouteProp<EventsStackParamList, 'EventHistory'>;
};

export default function EventHistoryScreen({ navigation, route }: Props) {
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pastBadge}>
          <Text style={styles.pastBadgeText}>Wydarzenie zakończone</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📅</Text>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Data i Godzina</Text>
            <Text style={styles.statValue}>{event.dateLabel}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📍</Text>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Lokalizacja</Text>
            <Text style={styles.statValue}>{event.locationName}</Text>
            <Text style={styles.statHint}>{event.locationStreet}</Text>
            {!!event.locationCity && (
              <Text style={styles.statHint}>{event.locationCity}</Text>
            )}
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>👥</Text>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Uczestnicy</Text>
            <Text style={styles.statValue}>{event.participantsTotal} osób</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryCount}>{event.participantsAccepted}</Text>
            <Text style={styles.summaryLabel}>Zaakceptowało</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryCount}>{event.participantsRejected}</Text>
            <Text style={styles.summaryLabel}>Odrzuciło</Text>
          </View>
        </View>

        <Text style={styles.footnote}>
          Wydarzenie odbyło się w przeszłości — szczegóły są dostępne tylko do podglądu.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 16, paddingBottom: 40 },
  pastBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,82,209,0.12)',
    borderWidth: 1,
    borderColor: Colors.actualMainBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  pastBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.actualMainBlue,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    padding: 16,
  },
  statIcon: { fontSize: 22, lineHeight: 28 },
  statInfo: { flex: 1, gap: 2 },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.graySecondary,
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.black,
    lineHeight: 22,
  },
  statHint: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.mainGraySecondary,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
  },
  summaryCount: {
    fontFamily: Fonts.extraBold,
    fontSize: FontSizes.xl,
    color: Colors.actualMainBlue,
  },
  summaryLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
  },
  footnote: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
    paddingTop: 8,
    lineHeight: 20,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { EventCard } from '../../components/common/EventCard';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import {
  MOCK_PENDING_CARDS,
  MOCK_ACCEPTED_CARDS,
  MOCK_HOSTED_CARDS,
} from '../../data/mockEvents';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'Dashboard'>;
};

type SectionTitleProps = {
  label: string;
  collapsed: boolean;
  onToggle: () => void;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ label, collapsed, onToggle }) => (
  <TouchableOpacity
    style={styles.sectionTitle}
    onPress={onToggle}
    activeOpacity={0.7}
  >
    <Text style={styles.sectionArrow}>{collapsed ? '▶' : '▼'}</Text>
    <Text style={styles.sectionText}>{label}</Text>
  </TouchableOpacity>
);

type SectionKey = 'pending' | 'accepted' | 'hosted';

export default function DashboardScreen({ navigation }: Props) {
  const [collapsed, setCollapsed] = useState<Record<SectionKey, boolean>>({
    pending: false,
    accepted: false,
    hosted: false,
  });

  const toggle = (key: SectionKey) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Planner Wspólnych Wydarzeń" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.weekSummary}>
          <Text style={styles.weekTitle}>
            W tym tygodniu zaplanowano 5 wydarzeń z Twoim udziałem!
          </Text>
          <Text style={styles.weekSubtitle}>
            2 Twoje, 2 zaakceptowano i 1 oczekujące
          </Text>
        </View>

        <View style={styles.section}>
          <SectionTitle
            label="WYDARZENIA DO AKCEPTACJI (1):"
            collapsed={collapsed.pending}
            onToggle={() => toggle('pending')}
          />
          {!collapsed.pending &&
            MOCK_PENDING_CARDS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant="pending"
                onAccept={() => {}}
                onReject={() => {}}
              />
            ))}
        </View>

        <View style={styles.section}>
          <SectionTitle
            label="ZAAKCEPTOWANE WYDARZENIA (2):"
            collapsed={collapsed.accepted}
            onToggle={() => toggle('accepted')}
          />
          {!collapsed.accepted &&
            MOCK_ACCEPTED_CARDS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant="accepted"
                onDetails={() => navigation.navigate('EventDetails', { eventId: event.id, isOrganizer: false })}
              />
            ))}
        </View>

        <View style={styles.section}>
          <SectionTitle
            label="ORGANIZOWANE PRZEZ CIEBIE (2):"
            collapsed={collapsed.hosted}
            onToggle={() => toggle('hosted')}
          />
          {!collapsed.hosted &&
            MOCK_HOSTED_CARDS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant="hosted"
                onDetails={() => navigation.navigate('EventDetailsOrganizer', { eventId: event.id })}
                onEdit={() => navigation.navigate('EventEditor', { eventId: event.id })}
              />
            ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewEvent')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.lightModeMainTheme,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.lightModeMainTheme,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 24,
  },
  weekSummary: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    gap: 4,
  },
  weekTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.black,
    lineHeight: 28,
  },
  weekSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
  },
  section: {
    gap: 12,
    paddingBottom: 10,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  sectionArrow: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.actualMainBlue,
  },
  sectionText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.actualMainBlue,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  fab: {
    position: 'absolute',
    bottom: 76,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: Colors.purpleAccent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  fabIcon: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: Fonts.bold,
    lineHeight: 32,
  },
  bottomPadding: { height: 80 },
});

import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Image, Modal, FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Button } from '../../components/common/Button';
import { AppIcon } from '../../components/common/AppIcon';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { EventDetails } from '../../data/mockEvents';
import { useEvents } from '../../context/EventsContext';
import { MOCK_FRIENDS } from '../../data/mockFriends';
import { logEventLeft } from '../../services/analytics';

type Tab = 'info' | 'planning' | 'chat';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'EventDetails'>;
  route: RouteProp<EventsStackParamList, 'EventDetails'>;
};

type InfoTabProps = {
  event: EventDetails;
  onResign: () => void;
  onShowParticipants: () => void;
};

const InfoTab = ({ event, onResign, onShowParticipants }: InfoTabProps) => {
  const remaining = Math.max(event.participantsTotal - 4, 0);
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      <TouchableOpacity style={styles.resignButton} activeOpacity={0.8} onPress={onResign}>
        <Text style={styles.resignText}>Zrezygnuj</Text>
        <Text style={styles.resignArrow}> →</Text>
      </TouchableOpacity>

      <View style={styles.statCard}>
        <AppIcon name="calendar" size={22} color={Colors.actualMainBlue} />
        <View style={styles.statInfo}>
          <Text style={styles.statLabel}>Data i Godzina</Text>
          <Text style={styles.statValue}>{event.dateLabel}</Text>
        </View>
      </View>

      <View style={styles.statCard}>
        <AppIcon name="profile" size={22} color={Colors.purpleAccent} />
        <View style={styles.statInfo}>
          <Text style={styles.statLabel}>Twoja Rola</Text>
          <Text style={styles.statValue}>Uczestnik</Text>
        </View>
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationHeader}>
          <View>
            <Text style={styles.locationTitle}>Lokalizacja</Text>
            <Text style={styles.locationAddress}>{event.locationStreet}</Text>
            <Text style={styles.locationCity}>{event.locationCity}</Text>
          </View>
          <TouchableOpacity style={styles.mapButton} activeOpacity={0.8}>
            <AppIcon name="localization" size={22} color={Colors.mainGraySecondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.mapPlaceholder}>
          <AppIcon name="localization" size={40} color={Colors.actualMainBlue} />
        </View>
      </View>

      <View style={styles.votingCard}>
        <View style={styles.votingHeader}>
          <Text style={styles.votingTitle}>{event.voteTitle}</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>AKTYWNE</Text>
          </View>
        </View>
        {event.voteOptions.map((option) => (
          <TouchableOpacity key={option.label} style={styles.voteOption} activeOpacity={0.8}>
            <View style={[styles.voteBar, { width: `${option.percent}%` }]} />
            <Text style={styles.voteTime}>{option.label}</Text>
            <Text style={styles.votePercent}>{option.percent}%</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.participantsSection}>
        <View style={styles.participantsHeader}>
          <Text style={styles.participantsTitle}>Uczestnicy ({event.participantsTotal})</Text>
          <TouchableOpacity onPress={onShowParticipants} activeOpacity={0.7}>
            <Text style={styles.seeAll}>Zobacz wszystkich</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.avatarRow}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.participantAvatar, { marginLeft: i === 0 ? 0 : -12 }]}>
              <View style={styles.avatarPlaceholder} />
            </View>
          ))}
          {remaining > 0 && (
            <View style={[styles.participantAvatar, styles.countAvatar, { marginLeft: -12 }]}>
              <Text style={styles.countText}>+{remaining}</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default function EventDetailsScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const { eventId } = route.params;
  const { getEvent, leaveEvent } = useEvents();
  const event = getEvent(eventId);

  const participants = useMemo(() => {
    const invited = event.invitedFriendIds;
    if (invited && invited.length > 0) {
      return MOCK_FRIENDS.filter((f) => invited.includes(f.id));
    }
    return MOCK_FRIENDS;
  }, [event.invitedFriendIds]);

  const handleResign = () => {
    leaveEvent(eventId);
    logEventLeft(eventId);
    navigation.popToTop();
  };

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
            {tab === 'planning' && (
              <View style={styles.tabBadge} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <InfoTab
        event={event}
        onResign={handleResign}
        onShowParticipants={() => setParticipantsOpen(true)}
      />

      <Modal
        visible={participantsOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setParticipantsOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Uczestnicy ({participants.length})
            </Text>
            <FlatList
              data={participants}
              keyExtractor={(item) => item.id}
              style={styles.modalListFlex}
              contentContainerStyle={styles.modalList}
              showsVerticalScrollIndicator
              renderItem={({ item }) => (
                <View style={styles.participantRow}>
                  <View style={styles.participantAvatarSm}>
                    <Text style={styles.participantInitial}>{item.name[0]}</Text>
                  </View>
                  <View style={styles.participantInfo}>
                    <Text style={styles.participantName}>{item.name}</Text>
                    <Text style={styles.participantMeta}>
                      {item.mutualEvents} wspólnych wydarzeń
                    </Text>
                  </View>
                </View>
              )}
            />
            <View style={styles.modalActions}>
              <Button
                label="Zamknij"
                variant="primary"
                onPress={() => setParticipantsOpen(false)}
                style={styles.modalBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.offWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    height: '70%',
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalListFlex: { flex: 1 },
  modalList: { gap: 8, paddingBottom: 16 },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.lightModeMainTheme,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  participantAvatarSm: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantInitial: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.white,
  },
  participantInfo: { flex: 1, gap: 2 },
  participantName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  participantMeta: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  modalBtn: {
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
});

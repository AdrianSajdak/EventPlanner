import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
  Modal, FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { Button } from '../../components/common/Button';
import { useEvents } from '../../context/EventsContext';
import { INVITABLE_FRIENDS } from '../../data/mockFriends';
import { logParticipantsInvited } from '../../services/analytics';

type Tab = 'info' | 'planning' | 'chat';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'EventDetailsOrganizer'>;
  route: RouteProp<EventsStackParamList, 'EventDetailsOrganizer'>;
};

export default function EventDetailsOrganizerScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const { eventId } = route.params;
  const { getEvent, inviteToEvent } = useEvents();
  const event = getEvent(eventId);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [draftIds, setDraftIds] = useState<string[]>([]);

  const availableFriends = useMemo(() => {
    const invited = event.invitedFriendIds ?? [];
    return INVITABLE_FRIENDS.filter((f) => !invited.includes(f.id));
  }, [event.invitedFriendIds]);

  const openInvite = () => {
    setDraftIds([]);
    setInviteOpen(true);
  };

  const toggleDraft = (id: string) =>
    setDraftIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const confirmInvite = () => {
    if (draftIds.length > 0) {
      inviteToEvent(eventId, draftIds);
      logParticipantsInvited(eventId, draftIds.length);
    }
    setInviteOpen(false);
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
            <TouchableOpacity onPress={openInvite} activeOpacity={0.7}>
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

      <Modal
        visible={inviteOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setInviteOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Zaproś więcej znajomych</Text>
            {availableFriends.length === 0 ? (
              <Text style={styles.emptyText}>
                Wszyscy Twoi znajomi są już zaproszeni.
              </Text>
            ) : (
              <FlatList
                data={availableFriends}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.modalList}
                renderItem={({ item }) => {
                  const checked = draftIds.includes(item.id);
                  return (
                    <TouchableOpacity
                      style={styles.friendRow}
                      onPress={() => toggleDraft(item.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.smallAvatar}>
                        <Text style={styles.smallAvatarInitial}>{item.name[0]}</Text>
                      </View>
                      <View style={styles.friendInfo}>
                        <Text style={styles.friendName}>{item.name}</Text>
                        <Text style={styles.friendMeta}>
                          {item.mutualEvents} wspólnych wydarzeń
                        </Text>
                      </View>
                      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                        {checked && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
            <View style={styles.modalActions}>
              <Button
                label="Anuluj"
                variant="secondary"
                onPress={() => setInviteOpen(false)}
                style={styles.actionBtn}
              />
              <Button
                label={`Zaproś (${draftIds.length})`}
                variant="primary"
                onPress={confirmInvite}
                disabled={draftIds.length === 0}
                style={styles.actionBtn}
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
    maxHeight: '80%',
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalList: {
    gap: 8,
    paddingBottom: 16,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
    paddingVertical: 24,
  },
  friendRow: {
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
  friendInfo: {
    flex: 1,
    gap: 2,
  },
  friendName: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  friendMeta: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallAvatarInitial: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.white,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.actualMainBlue,
    borderColor: Colors.actualMainBlue,
  },
  checkmark: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.white,
    lineHeight: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});

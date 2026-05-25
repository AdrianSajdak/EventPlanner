import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';

interface Notification {
  id: string;
  type: 'invitation' | 'update' | 'reminder' | 'vote';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'invitation',
    title: 'Nowe zaproszenie',
    description: 'Marek Nowak zaprosił Cię na "Wieczór z planszówkami"',
    time: '2 min temu',
    isRead: false,
  },
  {
    id: '2',
    type: 'vote',
    title: 'Nowe głosowanie',
    description: 'Otwarto głosowanie na godzinę w "Kino Letnie"',
    time: '15 min temu',
    isRead: false,
  },
  {
    id: '3',
    type: 'update',
    title: 'Aktualizacja wydarzenia',
    description: 'Godzina "BBQ w ogrodzie" została zmieniona na 16:00',
    time: '1 godz. temu',
    isRead: true,
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Przypomnienie',
    description: 'Jutro o 18:30 masz "Wieczór z planszówkami"',
    time: '3 godz. temu',
    isRead: true,
  },
  {
    id: '5',
    type: 'invitation',
    title: 'Zaproszenie zaakceptowane',
    description: 'Anna Kowalska zaakceptowała Twoje zaproszenie na "BBQ w ogrodzie"',
    time: 'Wczoraj',
    isRead: true,
  },
];

const typeIcon: Record<Notification['type'], string> = {
  invitation: '📨',
  update: '📝',
  reminder: '⏰',
  vote: '🗳️',
};

const typeColor: Record<Notification['type'], string> = {
  invitation: Colors.purpleAccent,
  update: Colors.actualMainBlue,
  reminder: '#F57C00',
  vote: Colors.secondaryDarkBlue,
};

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Powiadomienia" />
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notifItem, !item.isRead && styles.notifItemUnread]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: typeColor[item.type] + '20' }]}>
              <Text style={styles.icon}>{typeIcon[item.type]}</Text>
            </View>
            <View style={styles.notifContent}>
              <View style={styles.notifHeader}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
              <Text style={styles.notifDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Brak powiadomień</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  list: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
    padding: 12,
    gap: 12,
  },
  notifItemUnread: {
    borderColor: Colors.actualMainBlue,
    backgroundColor: 'rgba(0,82,209,0.04)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 20 },
  notifContent: { flex: 1, gap: 4 },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  notifTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.black,
    flex: 1,
  },
  notifTime: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.mainGraySecondary,
    flexShrink: 0,
  },
  notifDescription: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.actualMainBlue,
    marginTop: 4,
    flexShrink: 0,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
    paddingVertical: 40,
  },
});

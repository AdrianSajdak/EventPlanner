import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Navbar } from '../../components/common/Navbar';
import { AppIcon } from '../../components/common/AppIcon';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const boardGamesImage = require('../../../assets/images/chat-board-games.png');

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'Chat'>;
  route: RouteProp<EventsStackParamList, 'Chat'>;
};

type SentMessage = {
  id: string;
  text: string;
  time: string;
};

const TabBar = ({
  navigation,
  eventId,
  isOrganizer,
}: {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'Chat'>;
  eventId: string;
  isOrganizer?: boolean;
}) => (
  <View style={styles.tabBar}>
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => {
        if (isOrganizer) {
          navigation.navigate('EventDetailsOrganizer', { eventId });
          return;
        }
        navigation.navigate('EventDetails', { eventId, isOrganizer: false });
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.tabLabel}>Info</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => navigation.navigate('Planning', { eventId, isOrganizer })}
      activeOpacity={0.7}
    >
      <Text style={styles.tabLabel}>Planowanie</Text>
    </TouchableOpacity>
    <View style={[styles.tabItem, styles.activeTabItem]}>
      <Text style={[styles.tabLabel, styles.activeTabLabel]}>Czat</Text>
    </View>
  </View>
);

const IncomingMessage = ({
  sender,
  time,
  text,
}: {
  sender: string;
  time: string;
  text: string;
}) => (
  <View style={styles.incomingBlock}>
    <View style={styles.messageMetaRow}>
      <Text style={styles.senderName}>{sender}</Text>
      <Text style={styles.messageTime}>{time}</Text>
    </View>
    <View style={styles.incomingBubble}>
      <Text style={styles.incomingText}>{text}</Text>
    </View>
  </View>
);

const OutgoingMessage = ({
  time,
  text,
}: {
  time: string;
  text: string;
}) => (
  <View style={styles.outgoingBlock}>
    <Text style={styles.outgoingTime}>{time} ⌁</Text>
    <View style={styles.outgoingBubble}>
      <Text style={styles.outgoingText}>{text}</Text>
    </View>
  </View>
);

const PollCard = () => (
  <View style={styles.pollCard}>
    <View style={styles.pollHeader}>
      <Text style={styles.pollTitle}>Głosowanie: Godzina startu</Text>
      <View style={styles.pollBadge}>
        <Text style={styles.pollBadgeText}>AKTYWNE</Text>
      </View>
    </View>
    <View style={styles.pollOption}>
      <Text style={styles.pollOptionText}>18:00</Text>
      <View style={styles.pollVotes}>
        <Text style={styles.pollVoteText}>4 głosy</Text>
      </View>
    </View>
    <View style={styles.pollOption}>
      <View style={styles.pollFillSmall} />
      <Text style={styles.pollOptionText}>19:00</Text>
      <View style={styles.pollVotes}>
        <Text style={styles.pollVoteText}>1 głos</Text>
      </View>
    </View>
  </View>
);

const PhotoMessage = () => (
  <View style={styles.photoBlock}>
    <View style={styles.messageMetaRow}>
      <Text style={styles.senderName}>Anna W.</Text>
      <Text style={styles.messageTime}>19:12</Text>
    </View>
    <View style={styles.photoCard}>
      <Image source={boardGamesImage} style={styles.photo} />
      <Text style={styles.photoText}>Spakowana i gotowa! Do{'\n'}zobaczenia.</Text>
    </View>
  </View>
);

export default function ChatScreen({ navigation, route }: Props) {
  const [draft, setDraft] = useState('');
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([
    { id: 'mock-new', text: 'Nowa wiadomość!', time: '19:50' },
  ]);

  const sendMessage = () => {
    if (!draft.trim()) return;
    setSentMessages((current) => [
      ...current,
      {
        id: Date.now().toString(),
        text: draft.trim(),
        time: new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setDraft('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Wieczór z planszówkami"
          showBack
          onBack={() => navigation.goBack()}
        />
        <TabBar
          navigation={navigation}
          eventId={route.params.eventId}
          isOrganizer={route.params.isOrganizer}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.systemText}>Anna zagłosowała</Text>
          <IncomingMessage
            sender="Marek K."
            time="18:42"
            text={'Hej! Przyniosę "Terraformację\nMarsa”. Ktoś jeszcze ma jakieś\npropozycje na wieczór?'}
          />
          <IncomingMessage
            sender="Karolina S."
            time="18:45"
            text={'Ja mogę wziąć “Everdell”, ale\nMarek musi pomóc z tłumaczeniem\nzasad, bo dawno nie grałam :)'}
          />
          <View style={styles.statusPill}>
            <AppIcon name="accepted" size={14} color={Colors.secondaryDarkBlue} />
            <Text style={styles.statusText}>Lokalizacja została potwierdzona</Text>
          </View>
          <OutgoingMessage
            time="18:50"
            text={'Super! Ja ogarnę jakieś przekąski i\nnapoje. Marek, weź też ten\ndodatek do Marsa, jeśli masz.'}
          />
          <PollCard />
          <PhotoMessage />
          {sentMessages.map((item) => (
            <OutgoingMessage key={item.id} time={item.time} text={item.text} />
          ))}
        </ScrollView>

        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.plusButton} activeOpacity={0.75}>
            <AppIcon name="add" size={24} color={Colors.secondaryDarkBlue} />
          </TouchableOpacity>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={draft}
              onChangeText={setDraft}
              placeholder="Napisz wiadomość..."
              placeholderTextColor="#9AA7BD"
            />
            <AppIcon name="smile" size={21} color="#8EA0BA" />
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} activeOpacity={0.8}>
            <AppIcon name="sendMessage" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  tabBar: {
    marginHorizontal: 28,
    marginTop: 24,
    marginBottom: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  tabItem: {
    flex: 1,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  activeTabItem: {
    backgroundColor: '#DCE4EF',
  },
  tabLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.secondaryDarkBlue,
    lineHeight: 19,
  },
  activeTabLabel: {
    fontFamily: Fonts.bold,
  },
  content: {
    paddingHorizontal: 28,
    paddingBottom: 28,
    gap: 26,
  },
  systemText: {
    alignSelf: 'center',
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.graySecondary,
    lineHeight: 17,
  },
  incomingBlock: {
    gap: 10,
  },
  messageMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  senderName: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.actualMainBlue,
    lineHeight: 17,
  },
  messageTime: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.graySecondary,
    lineHeight: 14,
  },
  incomingBubble: {
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 6,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 15,
    paddingVertical: 14,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 3,
  },
  incomingText: {
    fontFamily: Fonts.regular,
    fontSize: 17,
    color: Colors.black,
    lineHeight: 27,
  },
  statusPill: {
    alignSelf: 'center',
    minHeight: 28,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: '#C9DDF6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.secondaryDarkBlue,
  },
  outgoingBlock: {
    alignItems: 'flex-end',
    paddingLeft: 36,
    gap: 9,
  },
  outgoingTime: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.graySecondary,
  },
  outgoingBubble: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 6,
    backgroundColor: Colors.purpleAccent,
    paddingHorizontal: 15,
    paddingVertical: 16,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 3,
    elevation: 5,
  },
  outgoingText: {
    fontFamily: Fonts.regular,
    fontSize: 17,
    color: Colors.white,
    lineHeight: 27,
  },
  pollCard: {
    borderWidth: 2,
    borderColor: Colors.actualMainBlue,
    borderRadius: 4,
    backgroundColor: '#BFD9F5',
    padding: 14,
    gap: 10,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 3,
    elevation: 5,
  },
  pollHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pollTitle: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.black,
  },
  pollBadge: {
    borderRadius: 4,
    backgroundColor: '#A5CBF8',
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  pollBadgeText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: Colors.actualMainBlue,
  },
  pollOption: {
    minHeight: 32,
    borderRadius: 7,
    backgroundColor: Colors.offWhite,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  pollFillSmall: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: '#DCE5F2',
  },
  pollOptionText: {
    flex: 1,
    paddingLeft: 12,
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.black,
    zIndex: 1,
  },
  pollVotes: {
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  pollVoteText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.black,
  },
  photoBlock: {
    gap: 10,
  },
  photoCard: {
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 6,
    backgroundColor: Colors.offWhite,
    padding: 14,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 3,
  },
  photo: {
    width: '100%',
    height: 288,
    borderRadius: 5,
    marginBottom: 10,
  },
  photoText: {
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: 17,
    color: Colors.black,
    lineHeight: 27,
  },
  inputBar: {
    minHeight: 58,
    backgroundColor: Colors.secondaryDarkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  plusButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: Colors.lightModeMainTheme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    flex: 1,
    minHeight: 31,
    borderRadius: 16,
    backgroundColor: Colors.offWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.black,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.purpleAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

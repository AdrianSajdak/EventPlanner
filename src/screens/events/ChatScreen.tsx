import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { EventsStackParamList } from '../../navigation/EventsNavigator';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'Chat'>;
  route: RouteProp<EventsStackParamList, 'Chat'>;
};

interface Message {
  id: string;
  text: string;
  sender: string;
  isMine: boolean;
  time: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: 'Hej wszystkim! Gotowi na dzisiejszy wieczór? 🎲', sender: 'Marek', isMine: false, time: '18:00' },
  { id: '2', text: 'Tak! Biorę ze sobą Catana i Carcassonne', sender: 'Anna', isMine: false, time: '18:05' },
  { id: '3', text: 'Super! Ja przyjdę może 10 minut po 18:30', sender: 'Ty', isMine: true, time: '18:10' },
  { id: '4', text: 'Spoko, drzwi będą otwarte. Na dole możecie zadzwonić na domofon nr 12', sender: 'Marek', isMine: false, time: '18:12' },
  { id: '5', text: 'Okej, do zobaczenia! 👋', sender: 'Ty', isMine: true, time: '18:15' },
];

export default function ChatScreen({ navigation, route }: Props) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: message,
        sender: 'Ty',
        isMine: true,
        time: new Date().toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMessage('');
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageRow, item.isMine && styles.messageRowMine]}>
      {!item.isMine && (
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarInitial}>{item.sender[0]}</Text>
        </View>
      )}
      <View style={[styles.bubble, item.isMine && styles.bubbleMine]}>
        {!item.isMine && <Text style={styles.senderName}>{item.sender}</Text>}
        <Text style={[styles.messageText, item.isMine && styles.messageTextMine]}>{item.text}</Text>
        <Text style={[styles.messageTime, item.isMine && styles.messageTimeMine]}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Wieczór z planszówkami"
          showBack
          onBack={() => navigation.goBack()}
        />

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.goBack()}>
            <Text style={styles.tabLabel}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Planning', { eventId: route.params.eventId })}>
            <Text style={styles.tabLabel}>Planowanie</Text>
          </TouchableOpacity>
          <View style={[styles.tabItem, styles.activeTabItem]}>
            <Text style={[styles.tabLabel, styles.activeTabLabel]}>Czat</Text>
          </View>
        </View>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Napisz wiadomość..."
            placeholderTextColor={Colors.mainGraySecondary}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} activeOpacity={0.8}>
            <Text style={styles.sendIcon}>→</Text>
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
  list: { padding: 16, gap: 12 },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 8,
  },
  messageRowMine: { justifyContent: 'flex-end' },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  bubble: {
    maxWidth: '75%',
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    borderTopLeftRadius: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.divider,
    gap: 4,
  },
  bubbleMine: {
    backgroundColor: Colors.secondaryDarkBlue,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 12,
    borderColor: Colors.secondaryDarkBlue,
  },
  senderName: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.actualMainBlue,
  },
  messageText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.black,
    lineHeight: 20,
  },
  messageTextMine: { color: Colors.white },
  messageTime: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.mainGraySecondary,
    alignSelf: 'flex-end',
  },
  messageTimeMine: { color: 'rgba(255,255,255,0.6)' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.offWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.lightModeMainTheme,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.black,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
});

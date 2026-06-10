import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
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
import { Navbar } from '../../components/common/Navbar';
import { AppIcon, AppIconName } from '../../components/common/AppIcon';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { useEvents } from '../../context/EventsContext';
import { logEventCreated } from '../../services/analytics';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const heroImage = require('../../../assets/images/new-event-hero.png');

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'NewEvent'>;
};

type EventType = 'cinema' | 'sport' | 'restaurant';

type TypeOption = {
  key: EventType;
  label: string;
  icon: AppIconName;
};

const typeOptions: TypeOption[] = [
  { key: 'cinema', label: 'Kino', icon: 'cinema' },
  { key: 'sport', label: 'Sport', icon: 'sport' },
  { key: 'restaurant', label: 'Restauracja', icon: 'food' },
];

const invitedFriends = ['Michał S.', 'Michał S...', 'Michał S'];

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const TextField = ({
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={Colors.graySecondary}
    style={[
      styles.input,
      value ? styles.inputFilled : styles.inputEmpty,
      multiline && styles.textArea,
    ]}
    multiline={multiline}
    autoCorrect={false}
    spellCheck={false}
  />
);

const MiniField = ({
  icon,
  value,
}: {
  icon: AppIconName;
  value: string;
}) => (
  <View style={styles.miniInput}>
    <AppIcon name={icon} size={18} color={Colors.actualMainBlue} />
    <Text style={styles.miniInputText}>{value}</Text>
  </View>
);

const FriendChip = ({ name }: { name: string }) => (
  <View style={styles.friendChip}>
    <View style={styles.friendAvatar}>
      <Text style={styles.friendAvatarText}>M</Text>
    </View>
    <View style={styles.friendChipTextBox}>
      <Text style={styles.friendName} numberOfLines={1}>{name}</Text>
      <Text style={styles.friendHandle} numberOfLines={1}>@mich...</Text>
    </View>
    <View style={styles.removeFriend}>
      <Text style={styles.removeFriendText}>×</Text>
    </View>
  </View>
);

export default function NewEventScreen({ navigation }: Props) {
  const { addHostedEvent } = useEvents();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date] = useState('12.09.2026');
  const [time] = useState('19:15');
  const [eventType, setEventType] = useState<EventType>('cinema');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    addHostedEvent({
      title: title || 'Wieczorne Kino w Plenerze',
      date,
      time,
      location: location || 'Cybermachina',
      description,
      participantsCount: invitedFriends.length,
    });
    logEventCreated({ participants_count: invitedFriends.length });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar title="Nowe Wyjście" showBack onBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ImageBackground source={heroImage} style={styles.hero} imageStyle={styles.heroImage} />

          <Field label="Nazwa wydarzenia">
            <TextField
              value={title}
              onChangeText={setTitle}
              placeholder="np. Wieczorne Kino w Plenerze"
            />
          </Field>

          <Field label="Lokalizacja">
            <TextField
              value={location}
              onChangeText={setLocation}
              placeholder="np. Cybermachina"
            />
          </Field>

          <View style={styles.twoColumn}>
            <View style={styles.twoColumnItem}>
              <Field label="Data">
                <MiniField icon="calendarAlt" value={date} />
              </Field>
            </View>
            <View style={styles.twoColumnItem}>
              <Field label="Godzina">
                <MiniField icon="clock" value={time} />
              </Field>
            </View>
          </View>

          <Field label="Typ wyjścia">
            <View style={styles.typeRow}>
              {typeOptions.map((option) => {
                const active = eventType === option.key;
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[styles.typePill, active && styles.typePillActive]}
                    onPress={() => setEventType(option.key)}
                    activeOpacity={0.75}
                  >
                    <AppIcon name={option.icon} size={17} color={Colors.actualMainBlue} />
                    <Text style={styles.typePillText}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Field>

          <View style={styles.inviteHeader}>
            <Text style={styles.label}>Zaproś znajomych</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('InviteMore', {})}
              activeOpacity={0.75}
            >
              <Text style={styles.seeAll}>+ ZOBACZ WSZYSTKICH</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inviteBox}>
            <View style={styles.friendChips}>
              {invitedFriends.map((name, index) => (
                <FriendChip key={`${name}-${index}`} name={name} />
              ))}
            </View>
            <TouchableOpacity
              style={styles.inviteMore}
              onPress={() => navigation.navigate('InviteMore', {})}
              activeOpacity={0.75}
            >
              <View style={styles.invitePlus}>
                <AppIcon name="add" size={26} color={Colors.secondaryDarkBlue} />
              </View>
              <Text style={styles.inviteMoreText}>Zaproś więcej</Text>
            </TouchableOpacity>
          </View>

          <Field label="Opis wydarzenia">
            <TextField
              value={description}
              onChangeText={setDescription}
              placeholder="Krótki opis tego co planujemy robić..."
              multiline
            />
          </Field>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate} activeOpacity={0.85}>
            <Text style={styles.createButtonText}>Stwórz Wydarzenie</Text>
            <AppIcon name="arrowContinue" size={26} color={Colors.white} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: {
    paddingTop: 16,
    paddingHorizontal: 28,
    paddingBottom: 120,
    gap: 22,
  },
  hero: {
    height: 193,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 5,
  },
  field: {
    gap: 10,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
  },
  input: {
    minHeight: 55,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontFamily: Fonts.regular,
    fontSize: 16,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },
  inputEmpty: {
    color: Colors.graySecondary,
  },
  inputFilled: {
    color: Colors.black,
  },
  textArea: {
    minHeight: 126,
    textAlignVertical: 'top',
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  twoColumnItem: {
    flex: 1,
  },
  miniInput: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 12,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },
  miniInputText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.graySecondary,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typePill: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 4,
  },
  typePillActive: {
    backgroundColor: '#CFE3FF',
  },
  typePillText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.graySecondary,
  },
  inviteHeader: {
    marginBottom: -12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  seeAll: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.actualMainBlue,
    lineHeight: 17,
  },
  inviteBox: {
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: '#C9DDF6',
    padding: 8,
    gap: 10,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },
  friendChips: {
    flexDirection: 'row',
    gap: 8,
  },
  friendChip: {
    flex: 1,
    minWidth: 0,
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 6,
    backgroundColor: '#A9D0FA',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  friendAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendAvatarText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: Colors.white,
  },
  friendChipTextBox: {
    flex: 1,
    minWidth: 0,
  },
  friendName: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: Colors.black,
    lineHeight: 13,
  },
  friendHandle: {
    fontFamily: Fonts.regular,
    fontSize: 9,
    color: Colors.graySecondary,
    lineHeight: 12,
  },
  removeFriend: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeFriendText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.graySecondary,
    lineHeight: 14,
  },
  inviteMore: {
    minHeight: 39,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.actualMainBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  invitePlus: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: Colors.lightModeMainTheme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteMoreText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.secondaryDarkBlue,
  },
  createButton: {
    height: 62,
    marginTop: 18,
    borderRadius: 7,
    backgroundColor: Colors.purpleAccent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.85,
    shadowRadius: 3,
    elevation: 7,
  },
  createButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.white,
    lineHeight: 24,
  },
});

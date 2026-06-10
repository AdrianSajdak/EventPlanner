import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Navbar } from '../../components/common/Navbar';
import { AppIcon } from '../../components/common/AppIcon';
import {
  PrimaryWideButton,
  SearchBox,
  SelectableRow,
} from '../../components/friends/FriendsUi';
import { FriendsStackParamList } from '../../navigation/FriendsNavigator';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const listThumb = require('../../../assets/images/friend-list-thumb.png');
const suggestedAvatar1 = require('../../../assets/images/friend-avatar-1.png');
const suggestedAvatar2 = require('../../../assets/images/friend-avatar-2.png');

type Props = {
  navigation: NativeStackNavigationProp<FriendsStackParamList, 'Friends'>;
};

const friends = [
  { name: 'Michał Nowak', status: 'Aktywny teraz', active: true },
  { name: 'Karolina Lis', status: 'Ostatnio widziano: 20 min temu', active: false },
  { name: 'Piotr Zieliński', status: 'Aktywny teraz', active: true },
];

const friendLists = [
  { name: 'Film', members: 'Jan Kowalski, Anna Nowak, Piotr Wiśniewski' },
  { name: 'Muzyka', members: 'Marta Zielińska, Krzysztof Wójcik, Julia Kacz' },
  { name: 'Programowanie', members: 'Tomasz Nowicki, Ewa Jankowska, Michał Lew' },
];

const suggested = [
  { name: 'Alicja Marzec', meta: '4 wspólnych znajomych', image: suggestedAvatar1 },
  { name: 'Robert Dąb', meta: '2 wspólnych znajomych', image: suggestedAvatar2 },
];

const FriendStatusRow = ({ friend }: { friend: typeof friends[number] }) => (
  <View style={styles.friendRow}>
    <View style={styles.friendAvatarWrap}>
      <Image source={listThumb} style={styles.friendAvatar} />
      <View style={[styles.statusDot, friend.active ? styles.statusOnline : styles.statusOffline]} />
    </View>
    <View style={styles.friendText}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <Text style={styles.friendStatus}>{friend.status}</Text>
    </View>
  </View>
);

const SectionHeader = ({
  title,
  action,
  expanded,
  onPress,
}: {
  title: string;
  action: string;
  expanded: boolean;
  onPress: () => void;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity style={styles.sectionAction} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.sectionActionText}>{action}</Text>
      <AppIcon name={expanded ? 'polygonUp' : 'polygon'} size={15} color={Colors.actualMainBlue} />
    </TouchableOpacity>
  </View>
);

const SuggestedCard = ({ item }: { item: typeof suggested[number] }) => (
  <View style={styles.suggestedCard}>
    <Image source={item.image} style={styles.suggestedAvatar} />
    <Text style={styles.suggestedName}>{item.name}</Text>
    <Text style={styles.suggestedMeta}>{item.meta}</Text>
    <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
      <Text style={styles.addButtonText}>Dodaj</Text>
    </TouchableOpacity>
  </View>
);

export default function FriendsScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [friendsExpanded, setFriendsExpanded] = useState(true);
  const [listsExpanded, setListsExpanded] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Znajomi" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBox value={search} onChangeText={setSearch} />

        <SectionHeader
          title="Znajomi"
          action="ZOBACZ WSZYSTKICH"
          expanded={friendsExpanded}
          onPress={() => setFriendsExpanded((current) => !current)}
        />
        {friendsExpanded ? (
          <View style={styles.stack}>
            {friends.map((friend) => (
              <FriendStatusRow key={friend.name} friend={friend} />
            ))}
          </View>
        ) : null}

        <SectionHeader
          title="Listy znajomych"
          action={listsExpanded ? 'ZWIŃ' : 'ROZWIŃ'}
          expanded={listsExpanded}
          onPress={() => setListsExpanded((current) => !current)}
        />
        {listsExpanded ? (
          <View style={styles.stack}>
            {friendLists.map((list) => (
              <SelectableRow key={list.name} title={list.name} subtitle={list.members} image={listThumb} />
            ))}
          </View>
        ) : null}

        <PrimaryWideButton
          label="Stwórz nową listę znajomych"
          onPress={() => navigation.navigate('NewFriendsList')}
        />

        <Text style={styles.suggestedTitle}>Sugerowani znajomi</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestedRow}
        >
          {suggested.map((item) => (
            <SuggestedCard key={item.name} item={item} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 120,
    gap: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -10,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 31,
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionActionText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.actualMainBlue,
    lineHeight: 18,
  },
  stack: {
    gap: 15,
  },
  friendRow: {
    minHeight: 70,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
    elevation: 5,
  },
  friendAvatarWrap: {
    position: 'relative',
  },
  friendAvatar: {
    width: 36,
    height: 36,
    borderRadius: 4,
  },
  statusDot: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  statusOnline: {
    backgroundColor: '#27C66B',
  },
  statusOffline: {
    backgroundColor: Colors.graySecondary,
  },
  friendText: {
    flex: 1,
  },
  friendName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.secondaryDarkBlue,
    lineHeight: 22,
  },
  friendStatus: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    lineHeight: 17,
  },
  suggestedTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 31,
    marginBottom: -4,
  },
  suggestedRow: {
    gap: 16,
    paddingRight: 28,
  },
  suggestedCard: {
    width: 176,
    minHeight: 178,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 5,
    backgroundColor: Colors.offWhite,
    padding: 18,
  },
  suggestedAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 14,
  },
  suggestedName: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.secondaryDarkBlue,
    lineHeight: 20,
  },
  suggestedMeta: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.mainGraySecondary,
    lineHeight: 15,
    marginBottom: 12,
  },
  addButton: {
    height: 29,
    borderRadius: 7,
    backgroundColor: Colors.secondaryDarkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 4,
  },
  addButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.white,
  },
});

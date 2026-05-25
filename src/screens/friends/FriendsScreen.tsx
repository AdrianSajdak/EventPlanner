import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { FriendsStackParamList } from '../../navigation/FriendsNavigator';

type Props = {
  navigation: NativeStackNavigationProp<FriendsStackParamList, 'Friends'>;
};

interface Friend {
  id: string;
  name: string;
  mutualEvents: number;
  status: 'accepted' | 'pending';
}

const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Anna Kowalska', mutualEvents: 5, status: 'accepted' },
  { id: '2', name: 'Marek Nowak', mutualEvents: 3, status: 'accepted' },
  { id: '3', name: 'Piotr Wiśniewski', mutualEvents: 7, status: 'accepted' },
  { id: '4', name: 'Kasia Zielińska', mutualEvents: 2, status: 'accepted' },
  { id: '5', name: 'Tomek Wójcik', mutualEvents: 1, status: 'pending' },
];

const FriendItem: React.FC<{ friend: Friend }> = ({ friend }) => (
  <View style={styles.friendItem}>
    <View style={styles.avatar}>
      <Text style={styles.avatarInitial}>{friend.name[0]}</Text>
    </View>
    <View style={styles.friendInfo}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <Text style={styles.friendMeta}>{friend.mutualEvents} wspólnych wydarzeń</Text>
    </View>
    {friend.status === 'pending' && (
      <View style={styles.pendingBadge}>
        <Text style={styles.pendingText}>Oczekujący</Text>
      </View>
    )}
  </View>
);

export default function FriendsScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  const filtered = MOCK_FRIENDS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Znajomi" />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Szukaj znajomych..."
          placeholderTextColor={Colors.mainGraySecondary}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('InviteMore', {})}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>+ Dodaj znajomego</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listBtn}
          onPress={() => navigation.navigate('NewFriendsList')}
          activeOpacity={0.8}
        >
          <Text style={styles.listBtnText}>Nowa lista</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FriendItem friend={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Brak znajomych do wyświetlenia</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 8,
  },
  addBtn: {
    flex: 2,
    backgroundColor: Colors.secondaryDarkBlue,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  addBtnText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.white,
  },
  listBtn: {
    flex: 1,
    backgroundColor: Colors.lightModeMainTheme,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
  },
  listBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
  },
  list: { paddingHorizontal: 24, paddingBottom: 20, gap: 8 },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 12,
    gap: 12,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.white,
  },
  friendInfo: { flex: 1, gap: 2 },
  friendName: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  friendMeta: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
  },
  pendingBadge: {
    backgroundColor: 'rgba(0,82,209,0.1)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pendingText: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    color: Colors.actualMainBlue,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
    paddingVertical: 40,
  },
});

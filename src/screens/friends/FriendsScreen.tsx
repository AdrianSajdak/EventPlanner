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
import { Friend, MOCK_FRIENDS } from '../../data/mockFriends';
import { useFriendLists } from '../../context/FriendsContext';

type Props = {
  navigation: NativeStackNavigationProp<FriendsStackParamList, 'Friends'>;
};

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
  const { lists, removeList } = useFriendLists();

  const filtered = MOCK_FRIENDS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const friendNamesByList = (friendIds: string[]) =>
    MOCK_FRIENDS.filter((f) => friendIds.includes(f.id))
      .map((f) => f.name.split(' ')[0])
      .join(', ');

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
        ListHeaderComponent={
          lists.length > 0 ? (
            <View style={styles.listsSection}>
              <Text style={styles.listsTitle}>Moje listy ({lists.length})</Text>
              {lists.map((l) => (
                <View key={l.id} style={styles.listCard}>
                  <View style={styles.listInfo}>
                    <Text style={styles.listName}>{l.name}</Text>
                    <Text style={styles.listMeta}>
                      {l.friendIds.length} {l.friendIds.length === 1 ? 'osoba' : 'osób'}
                      {l.friendIds.length > 0 ? ` · ${friendNamesByList(l.friendIds)}` : ''}
                    </Text>
                  </View>
                  {!l.isDefault && (
                    <TouchableOpacity
                      onPress={() => removeList(l.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.removeIcon}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          ) : null
        }
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
  listsSection: {
    gap: 8,
    marginBottom: 16,
  },
  listsTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    color: Colors.actualMainBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,82,209,0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.actualMainBlue,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  listInfo: { flex: 1, gap: 2 },
  listName: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
  },
  listMeta: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
  },
  removeIcon: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: Colors.mainGraySecondary,
    paddingHorizontal: 4,
  },
});

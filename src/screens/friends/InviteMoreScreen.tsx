import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Button } from '../../components/common/Button';
import { FriendsStackParamList } from '../../navigation/FriendsNavigator';

type Props = {
  navigation: NativeStackNavigationProp<FriendsStackParamList, 'InviteMore'>;
  route: RouteProp<FriendsStackParamList, 'InviteMore'>;
};

const CONTACTS = [
  { id: '1', name: 'Anna Kowalska' },
  { id: '2', name: 'Marek Nowak' },
  { id: '3', name: 'Piotr Wiśniewski' },
  { id: '4', name: 'Kasia Zielińska' },
  { id: '5', name: 'Tomek Wójcik' },
  { id: '6', name: 'Ola Krawczyk' },
];

export default function InviteMoreScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Zaproś więcej" showBack onBack={() => navigation.goBack()} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Szukaj znajomych..."
          placeholderTextColor={Colors.mainGraySecondary}
        />
      </View>

      {selected.length > 0 && (
        <View style={styles.selectedBar}>
          <Text style={styles.selectedText}>Wybrano: {selected.length}</Text>
          <Button
            label="Zaproś"
            variant="primary"
            onPress={() => navigation.goBack()}
            style={styles.inviteBtn}
          />
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.contactItem, selected.includes(item.id) && styles.contactItemSelected]}
            onPress={() => toggle(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.avatar, selected.includes(item.id) && styles.avatarSelected]}>
              <Text style={styles.avatarInitial}>
                {selected.includes(item.id) ? '✓' : item.name[0]}
              </Text>
            </View>
            <Text style={styles.contactName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  searchContainer: { paddingHorizontal: 24, paddingVertical: 12 },
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
  selectedBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: Colors.navbarFocus,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.secondaryDarkBlue,
  },
  selectedText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
  },
  inviteBtn: { paddingVertical: 6, paddingHorizontal: 16 },
  list: { paddingHorizontal: 24, paddingBottom: 20, gap: 8 },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    padding: 12,
    gap: 12,
  },
  contactItemSelected: {
    borderColor: Colors.actualMainBlue,
    backgroundColor: 'rgba(0,82,209,0.05)',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSelected: { backgroundColor: Colors.actualMainBlue },
  avatarInitial: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.white,
  },
  contactName: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
});

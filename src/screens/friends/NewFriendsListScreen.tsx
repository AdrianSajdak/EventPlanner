import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  KeyboardAvoidingView, Platform, FlatList, TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { FriendsStackParamList } from '../../navigation/FriendsNavigator';
import { MOCK_FRIENDS } from '../../data/mockFriends';
import { useFriendLists } from '../../context/FriendsContext';

type Props = {
  navigation: NativeStackNavigationProp<FriendsStackParamList, 'NewFriendsList'>;
};

export default function NewFriendsListScreen({ navigation }: Props) {
  const { addList } = useFriendLists();
  const [listName, setListName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    addList(listName, selected);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar title="Nowa lista znajomych" showBack onBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Input
              label="Nazwa listy"
              value={listName}
              onChangeText={setListName}
              placeholder="np. Przyjaciele z pracy"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Dodaj znajomych do listy</Text>
            {MOCK_FRIENDS.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[styles.friendRow, selected.includes(f.id) && styles.friendRowSelected]}
                onPress={() => toggle(f.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.avatar, selected.includes(f.id) && styles.avatarSelected]}>
                  <Text style={styles.avatarText}>
                    {selected.includes(f.id) ? '✓' : f.name[0]}
                  </Text>
                </View>
                <Text style={styles.friendName}>{f.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <Button label="Anuluj" variant="secondary" onPress={() => navigation.goBack()} style={styles.btn} />
            <Button
              label="Utwórz listę"
              variant="primary"
              onPress={handleCreate}
              disabled={!listName || selected.length === 0}
              style={styles.btn}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 20, paddingBottom: 40 },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 20,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.secondaryDarkBlue,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  friendRowSelected: {
    backgroundColor: 'rgba(0,82,209,0.05)',
    borderColor: Colors.actualMainBlue,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSelected: { backgroundColor: Colors.actualMainBlue },
  avatarText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.white,
  },
  friendName: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  actions: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, paddingVertical: 12 },
});

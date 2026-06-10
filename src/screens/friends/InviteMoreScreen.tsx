import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Navbar } from '../../components/common/Navbar';
import {
  PrimaryWideButton,
  SearchBox,
  SelectableRow,
} from '../../components/friends/FriendsUi';
import { FriendsStackParamList } from '../../navigation/FriendsNavigator';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

type Props = {
  navigation: NativeStackNavigationProp<
    FriendsStackParamList & EventsStackParamList,
    'InviteMore'
  >;
  route: RouteProp<FriendsStackParamList & EventsStackParamList, 'InviteMore'>;
};

const friends = [
  { id: 'friend-1', name: 'Michał Nowak' },
  { id: 'friend-2', name: 'Jan Kowalski' },
  { id: 'friend-3', name: 'Anna Wiśniewska' },
  { id: 'friend-4', name: 'Paweł Kowalski' },
];

const lists = [
  { id: 'list-1', title: 'Kino', subtitle: 'Agnieszka Holland, Daniel Olbrychski' },
  { id: 'list-2', title: 'Kino', subtitle: 'Agnieszka Holland, Daniel Olbrychski' },
  { id: 'list-3', title: 'Kino', subtitle: 'Agnieszka Holland, Daniel Olbrychski' },
];

export default function InviteMoreScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Zaproś więcej" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBox value={search} onChangeText={setSearch} />

        <Text style={styles.sectionTitle}>Znajomi</Text>
        <View style={styles.stack}>
          {friends.map((friend) => (
            <SelectableRow
              key={friend.id}
              title={friend.name}
              selected={selected.includes(friend.id)}
              onPress={() => toggle(friend.id)}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Listy znajomych</Text>
        <View style={styles.stack}>
          {lists.map((list) => (
            <SelectableRow
              key={list.id}
              title={list.title}
              subtitle={list.subtitle}
              selected={selected.includes(list.id)}
              onPress={() => toggle(list.id)}
            />
          ))}
        </View>

        <PrimaryWideButton label="Zaproś" onPress={() => navigation.goBack()} />
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
    gap: 25,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 31,
    marginBottom: -12,
  },
  stack: {
    gap: 15,
  },
});

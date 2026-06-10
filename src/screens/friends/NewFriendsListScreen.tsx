import React, { useState } from 'react';
import {
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
import {
  PrimaryWideButton,
  SearchBox,
  SelectableRow,
} from '../../components/friends/FriendsUi';
import { FriendsStackParamList } from '../../navigation/FriendsNavigator';
import { logFriendListCreated } from '../../services/analytics';
import { useFriendLists } from '../../context/FriendsContext';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

type Props = {
  navigation: NativeStackNavigationProp<FriendsStackParamList, 'NewFriendsList'>;
};

const friends = [
  { id: '1', name: 'Michał Nowak' },
  { id: '2', name: 'Jan Kowalski' },
  { id: '3', name: 'Anna Wiśniewska' },
  { id: '4', name: 'Paweł Kowalski' },
];

export default function NewFriendsListScreen({ navigation }: Props) {
  const { addList } = useFriendLists();
  const [listName, setListName] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleCreate = () => {
    addList(listName || 'Siatkówka', selected);
    logFriendListCreated(selected.length);
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
          <View style={styles.field}>
            <Text style={styles.label}>Nazwa listy</Text>
            <TextInput
              value={listName}
              onChangeText={setListName}
              placeholder="np. Siatkówka"
              placeholderTextColor={Colors.graySecondary}
              style={styles.input}
              autoCorrect={false}
              spellCheck={false}
            />
          </View>

          <SearchBox value={search} onChangeText={setSearch} />

          <Text style={styles.sectionTitle}>Znajomi</Text>
          <View style={styles.stack}>
            {friends.map((friend, index) => (
              <SelectableRow
                key={friend.id}
                title={friend.name}
                selected={selected.includes(friend.id)}
                onPress={() => toggle(friend.id)}
              />
            ))}
          </View>

          <PrimaryWideButton label="Stwórz" onPress={handleCreate} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 120,
    gap: 32,
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
    minHeight: 56,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 18,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.black,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
    elevation: 5,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 31,
    marginBottom: -18,
  },
  stack: {
    gap: 15,
  },
});

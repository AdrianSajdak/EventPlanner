import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, SafeAreaView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Navbar } from '../../components/common/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'ChangePersonalData'>;
};

export default function ChangePersonalDataScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState('Adrian');
  const [lastName, setLastName] = useState('Sajdak');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar title="Zmień dane personalne" showBack onBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Input label="Imię" value={firstName} onChangeText={setFirstName} placeholder="Imię" />
            <Input label="Nazwisko" value={lastName} onChangeText={setLastName} placeholder="Nazwisko" />
            <Input
              label="Numer telefonu (opcjonalnie)"
              value={phone}
              onChangeText={setPhone}
              placeholder="+48 000 000 000"
              keyboardType="phone-pad"
            />
            <Input
              label="Bio (opcjonalnie)"
              value={bio}
              onChangeText={setBio}
              placeholder="Kilka słów o sobie..."
              multiline
            />
          </View>
          <View style={styles.actions}>
            <Button label="Anuluj" variant="secondary" onPress={() => navigation.goBack()} style={styles.btn} />
            <Button
              label="Zapisz"
              variant="primary"
              onPress={() => navigation.goBack()}
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
    gap: 16,
  },
  actions: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, paddingVertical: 12 },
});

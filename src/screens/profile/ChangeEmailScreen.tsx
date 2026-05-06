import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'ChangeEmail'>;
};

export default function ChangeEmailScreen({ navigation }: Props) {
  const [currentEmail] = useState('adrian@example.pl');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar title="Zmień adres e-mail" showBack onBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.currentEmailBox}>
              <Text style={styles.currentEmailLabel}>Aktualny adres e-mail</Text>
              <Text style={styles.currentEmailValue}>{currentEmail}</Text>
            </View>
            <Input
              label="Nowy adres e-mail"
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="nowy@email.pl"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Potwierdź hasłem"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              isPassword
            />
          </View>
          <View style={styles.actions}>
            <Button label="Anuluj" variant="secondary" onPress={() => navigation.goBack()} style={styles.btn} />
            <Button
              label="Zmień e-mail"
              variant="primary"
              onPress={() => navigation.goBack()}
              disabled={!newEmail || !password}
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
  currentEmailBox: {
    backgroundColor: Colors.lightModeMainTheme,
    borderRadius: 8,
    padding: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  currentEmailLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  currentEmailValue: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  actions: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, paddingVertical: 12 },
});

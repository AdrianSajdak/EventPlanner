import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Navbar } from '../../components/common/Navbar';
import { SettingsField, SettingsSubmitButton } from '../../components/profile/SettingsFormControls';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'ChangeEmail'>;
};

export default function ChangeEmailScreen({ navigation }: Props) {
  const [newEmail, setNewEmail] = useState('aleks.kowalski@example.com');
  const [confirmEmail, setConfirmEmail] = useState('aleks.kowalski@example.com');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Zmień adres e-mail"
          showBack
          showMenu={false}
          onBack={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Zmień adres e-mail</Text>
          <SettingsField
            label="Nowy adres e-mail"
            icon="email"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <SettingsField
            label="Potwierdź nowy adres e-mail"
            icon="email"
            value={confirmEmail}
            onChangeText={setConfirmEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <SettingsField
            label="Wpisz swoje hasło"
            icon="shield"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            isPassword
          />
          <SettingsSubmitButton label="Zmień adres e-mail" onPress={() => navigation.goBack()} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: {
    paddingTop: 36,
    paddingHorizontal: 28,
    paddingBottom: 120,
    gap: 26,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 31,
    marginBottom: 10,
  },
});

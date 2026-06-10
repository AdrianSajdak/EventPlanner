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
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'ChangePassword'>;
};

export default function ChangePasswordScreen({ navigation }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Zmień hasło"
          showBack
          showMenu={false}
          onBack={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Zmień hasło</Text>
          <SettingsField
            label="Obecne hasło"
            icon="password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="••••••••"
            isPassword
          />
          <SettingsField
            label="Nowe hasło"
            icon="lock"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="••••••••"
            isPassword
          />
          <Text style={styles.passwordHint}>
            Hasło musi zawierać co najmniej 1 dużą literę, cyfrę i znak specjalny.
          </Text>
          <SettingsField
            label="Potwierdź nowe hasło"
            icon="shield"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            isPassword
          />
          <SettingsSubmitButton label="Zmień hasło" onPress={() => navigation.goBack()} />
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
  passwordHint: {
    marginTop: -16,
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    lineHeight: 17,
  },
});

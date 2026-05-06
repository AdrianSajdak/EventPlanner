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
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'ChangePassword'>;
};

export default function ChangePasswordScreen({ navigation }: Props) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar title="Zmień hasło" showBack onBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.hint}>
              Hasło musi mieć co najmniej 8 znaków, zawierać wielką literę i cyfrę.
            </Text>
            <Input
              label="Aktualne hasło"
              value={current}
              onChangeText={setCurrent}
              placeholder="••••••••"
              isPassword
            />
            <Input
              label="Nowe hasło"
              value={newPass}
              onChangeText={setNewPass}
              placeholder="••••••••"
              isPassword
            />
            <Input
              label="Potwierdź nowe hasło"
              value={confirm}
              onChangeText={setConfirm}
              placeholder="••••••••"
              isPassword
            />
          </View>
          <View style={styles.actions}>
            <Button label="Anuluj" variant="secondary" onPress={() => navigation.goBack()} style={styles.btn} />
            <Button
              label="Zmień hasło"
              variant="primary"
              onPress={() => navigation.goBack()}
              disabled={!current || !newPass || !confirm}
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
  hint: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
  },
  actions: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, paddingVertical: 12 },
});

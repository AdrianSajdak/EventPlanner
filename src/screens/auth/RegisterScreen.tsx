import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Input } from '../../components/common/Input';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.decorTop} />
        <View style={styles.decorBottom} />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.main}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoEmoji}>🚀</Text>
              </View>
              <View style={styles.headingMargin}>
                <Text style={styles.appName}>Planer Wspólnych Wyjść</Text>
                <Text style={styles.appSubtitle}>Stwórz konto i zacznij planować</Text>
              </View>
            </View>

            <View style={styles.cardMargin}>
              <View style={styles.card}>
                <View style={styles.form}>
                  <Input
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="twoj@email.pl"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Input
                    label="Hasło"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    isPassword
                  />
                  <Input
                    label="Potwierdź hasło"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••"
                    isPassword
                  />
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('Main' as any)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.actionButtonText}>Zarejestruj się  →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.footerMargin}>
              <View style={styles.footer}>
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Lub dołącz przez</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialMargin}>
                  <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                      <Text style={styles.socialBtnText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                      <Text style={styles.socialBtnText}>Facebook</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.loginMargin}>
                  <Text style={styles.loginText}>Masz już konto? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
                    <Text style={styles.loginLink}>Zaloguj się</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryDarkBlue,
  },
  decorTop: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(0,82,209,0.05)',
    top: -84,
    right: -39,
  },
  decorBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(208,225,253,0.2)',
    bottom: 0,
    left: -20,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  main: {
    width: '100%',
    maxWidth: 384,
    alignSelf: 'center',
  },
  header: { alignItems: 'center' },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 6,
    backgroundColor: Colors.actualMainBlue,
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.actualMainBlue,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  logoEmoji: { fontSize: 28 },
  headingMargin: {
    paddingTop: 16,
    alignItems: 'center',
    gap: 4,
  },
  appName: {
    fontFamily: Fonts.extraBold,
    fontSize: FontSizes.xl,
    color: Colors.white,
    letterSpacing: -0.6,
    textAlign: 'center',
    lineHeight: 32,
  },
  appSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.lightModeMainTheme,
    textAlign: 'center',
    lineHeight: 20,
  },
  cardMargin: { paddingTop: 48 },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 48,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  form: { gap: 24 },
  actionButton: {
    backgroundColor: Colors.purpleAccent,
    borderRadius: 6,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.actualMainBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  actionButtonText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.offWhite,
    textAlign: 'center',
  },
  footerMargin: { paddingTop: 48 },
  footer: { alignItems: 'center' },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.lightModeMainTheme,
    marginHorizontal: 16,
    lineHeight: 24,
  },
  socialMargin: { paddingTop: 24, width: '100%' },
  socialRow: { flexDirection: 'row', gap: 16 },
  socialBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialBtnText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.actualMainBlue,
    textAlign: 'center',
    lineHeight: 20,
  },
  loginMargin: {
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.offWhite,
    lineHeight: 20,
  },
  loginLink: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.actualMainBlue,
    lineHeight: 20,
  },
});

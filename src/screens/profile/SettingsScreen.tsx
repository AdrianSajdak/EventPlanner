import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'Settings'>;
};

const SettingsItem = ({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.settingsIcon}>{icon}</Text>
    <Text style={[styles.settingsLabel, danger && styles.dangerText]}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

type ConfirmKind = 'logout' | 'delete-1' | 'delete-2' | null;

export default function SettingsScreen({ navigation }: Props) {
  const [confirm, setConfirm] = useState<ConfirmKind>(null);
  const [deleteChecked, setDeleteChecked] = useState(false);

  const goToLogin = () => {
    setConfirm(null);
    setDeleteChecked(false);
    const rootNav = navigation.getParent<any>()?.getParent<any>();
    rootNav?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    );
  };

  const closeConfirm = () => {
    setConfirm(null);
    setDeleteChecked(false);
  };

  const confirmContent: Record<
    Exclude<ConfirmKind, null>,
    {
      title: string;
      message: string;
      primaryLabel: string;
      onPrimary: () => void;
      primaryDisabled?: boolean;
    }
  > = {
    logout: {
      title: 'Wyloguj się',
      message: 'Czy na pewno chcesz się wylogować?',
      primaryLabel: 'Wyloguj',
      onPrimary: goToLogin,
    },
    'delete-1': {
      title: 'Usuń konto',
      message:
        'Tej akcji nie da się cofnąć. Wszystkie Twoje dane zostaną trwale usunięte. Czy na pewno chcesz kontynuować?',
      primaryLabel: 'Dalej',
      onPrimary: () => setConfirm('delete-2'),
    },
    'delete-2': {
      title: 'Ostateczne potwierdzenie',
      message:
        'Potwierdź, że rozumiesz konsekwencje. Po usunięciu konta nie odzyskasz danych ani historii wydarzeń.',
      primaryLabel: 'Tak, usuń konto',
      onPrimary: goToLogin,
      primaryDisabled: !deleteChecked,
    },
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Ustawienia" showBack onBack={() => navigation.goBack()} showMenu={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Konto</Text>
          <View style={styles.card}>
            <SettingsItem
              icon="📧"
              label="Zmień adres e-mail"
              onPress={() => navigation.navigate('ChangeEmail')}
            />
            <View style={styles.separator} />
            <SettingsItem
              icon="🔒"
              label="Zmień hasło"
              onPress={() => navigation.navigate('ChangePassword')}
            />
            <View style={styles.separator} />
            <SettingsItem
              icon="👤"
              label="Zmień dane personalne"
              onPress={() => navigation.navigate('ChangePersonalData')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aplikacja</Text>
          <View style={styles.card}>
            <SettingsItem
              icon="🌐"
              label="Język"
              onPress={() => navigation.navigate('Language')}
            />
            <View style={styles.separator} />
            <SettingsItem
              icon="🎨"
              label="Motyw"
              onPress={() => navigation.navigate('Theme')}
            />
            <View style={styles.separator} />
            <SettingsItem
              icon="ℹ️"
              label="O aplikacji"
              onPress={() => navigation.navigate('About')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <SettingsItem
              icon="🚪"
              label="Wyloguj się"
              onPress={() => setConfirm('logout')}
              danger
            />
            <View style={styles.separator} />
            <SettingsItem
              icon="🗑️"
              label="Usuń konto"
              onPress={() => setConfirm('delete-1')}
              danger
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={confirm !== null}
        animationType="fade"
        transparent
        onRequestClose={closeConfirm}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {confirm && (
              <>
                <Text style={styles.modalTitle}>{confirmContent[confirm].title}</Text>
                <Text style={styles.modalMessage}>{confirmContent[confirm].message}</Text>

                {confirm === 'delete-2' && (
                  <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setDeleteChecked((v) => !v)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, deleteChecked && styles.checkboxChecked]}>
                      {deleteChecked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>
                      Rozumiem, że tej operacji nie można odwrócić
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.modalActions}>
                  <Button
                    label="Anuluj"
                    variant="secondary"
                    onPress={closeConfirm}
                    style={styles.modalBtn}
                  />
                  <Button
                    label={confirmContent[confirm].primaryLabel}
                    variant="primary"
                    onPress={confirmContent[confirm].onPrimary}
                    disabled={confirmContent[confirm].primaryDisabled}
                    style={styles.modalBtn}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 20, paddingBottom: 40 },
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  settingsIcon: { fontSize: 20 },
  settingsLabel: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  dangerText: { color: '#D32F2F' },
  arrow: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.mainGraySecondary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 24,
    gap: 12,
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
  },
  modalMessage: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.black,
    lineHeight: 22,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.actualMainBlue,
    borderColor: Colors.actualMainBlue,
  },
  checkmark: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.white,
    lineHeight: 16,
  },
  checkboxLabel: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    color: Colors.black,
    lineHeight: 18,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

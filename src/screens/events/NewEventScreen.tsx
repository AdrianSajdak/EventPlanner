import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { EventsStackParamList } from '../../navigation/EventsNavigator';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'NewEvent'>;
};

type Step = 1 | 2 | 3;

const StepIndicator = ({ current }: { current: Step }) => (
  <View style={styles.stepRow}>
    {([1, 2, 3] as Step[]).map((s) => (
      <View key={s} style={styles.stepItemRow}>
        <View style={[styles.stepCircle, current >= s && styles.stepCircleActive]}>
          <Text style={[styles.stepNum, current >= s && styles.stepNumActive]}>{s}</Text>
        </View>
        {s < 3 && <View style={[styles.stepLine, current > s && styles.stepLineActive]} />}
      </View>
    ))}
  </View>
);

export default function NewEventScreen({ navigation }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const stepTitles = {
    1: 'Podstawowe Informacje',
    2: 'Uczestnicy',
    3: 'Opcje Planowania',
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Nowe Wyjście"
          showBack
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <StepIndicator current={step} />

          <View style={styles.card}>
            <Text style={styles.stepTitle}>{stepTitles[step]}</Text>

            {step === 1 && (
              <View style={styles.form}>
                <Input
                  label="Nazwa wydarzenia"
                  value={title}
                  onChangeText={setTitle}
                  placeholder="np. Wieczór z planszówkami"
                />
                <Input
                  label="Data"
                  value={date}
                  onChangeText={setDate}
                  placeholder="DD.MM.RRRR"
                />
                <Input
                  label="Godzina"
                  value={time}
                  onChangeText={setTime}
                  placeholder="HH:MM"
                />
                <Input
                  label="Lokalizacja"
                  value={location}
                  onChangeText={setLocation}
                  placeholder="np. Cybermachina, Kraków"
                />
                <Input
                  label="Opis (opcjonalnie)"
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Krótki opis wydarzenia..."
                  multiline
                />
              </View>
            )}

            {step === 2 && (
              <View style={styles.form}>
                <Text style={styles.helperText}>
                  Dodaj znajomych, których chcesz zaprosić na wydarzenie
                </Text>
                <TouchableOpacity
                  style={styles.addFriendBtn}
                  onPress={() => navigation.navigate('InviteMore' as any, {})}
                  activeOpacity={0.8}
                >
                  <Text style={styles.addFriendText}>+ Dodaj uczestników</Text>
                </TouchableOpacity>
              </View>
            )}

            {step === 3 && (
              <View style={styles.form}>
                <Text style={styles.helperText}>
                  Ustaw opcje głosowania i planowania dla tego wydarzenia
                </Text>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>Głosowanie na godzinę</Text>
                  <View style={styles.toggle} />
                </View>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>Głosowanie na miejsce</Text>
                  <View style={styles.toggle} />
                </View>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>Kontrpropozycje</Text>
                  <View style={styles.toggle} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.navButtons}>
            {step > 1 && (
              <Button
                label="Wstecz"
                variant="secondary"
                onPress={() => setStep((s) => (s - 1) as Step)}
                style={styles.navBtn}
              />
            )}
            {step < 3 ? (
              <Button
                label="Dalej →"
                variant="primary"
                onPress={() => setStep((s) => (s + 1) as Step)}
                style={styles.navBtn}
              />
            ) : (
              <Button
                label="Utwórz wydarzenie"
                variant="primary"
                onPress={() => navigation.goBack()}
                style={styles.navBtn}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 24, paddingBottom: 40 },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightModeMainTheme,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: Colors.secondaryDarkBlue,
  },
  stepNum: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
  },
  stepNumActive: {
    color: Colors.white,
  },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: Colors.secondaryDarkBlue,
  },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 24,
    gap: 20,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
    lineHeight: 28,
  },
  form: { gap: 16 },
  helperText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
  },
  addFriendBtn: {
    borderWidth: 2,
    borderColor: Colors.actualMainBlue,
    borderRadius: 8,
    borderStyle: 'dashed',
    paddingVertical: 16,
    alignItems: 'center',
  },
  addFriendText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.actualMainBlue,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  optionLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.black,
  },
  toggle: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.secondaryDarkBlue,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  navBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { EventsStackParamList } from '../../navigation/EventsNavigator';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'EventEditor'>;
  route: RouteProp<EventsStackParamList, 'EventEditor'>;
};

export default function EventEditorScreen({ navigation, route }: Props) {
  const [title, setTitle] = useState('Wieczór z planszówkami');
  const [date, setDate] = useState('15.10.2024');
  const [time, setTime] = useState('18:30');
  const [location, setLocation] = useState('Cybermachina, ul. Mikołajska 11');
  const [description, setDescription] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Edytor wydarzenia"
          showBack
          onBack={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Podstawowe informacje</Text>
            <View style={styles.form}>
              <Input label="Nazwa wydarzenia" value={title} onChangeText={setTitle} placeholder="Nazwa" />
              <Input label="Data" value={date} onChangeText={setDate} placeholder="DD.MM.RRRR" />
              <Input label="Godzina" value={time} onChangeText={setTime} placeholder="HH:MM" />
              <Input label="Lokalizacja" value={location} onChangeText={setLocation} placeholder="Adres" />
              <Input label="Opis" value={description} onChangeText={setDescription} placeholder="Opis..." multiline />
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              label="Odwołaj wydarzenie"
              variant="secondary"
              onPress={() => navigation.navigate('CancelEvent', { eventId: route.params.eventId })}
              style={styles.cancelBtn}
              textStyle={styles.cancelBtnText}
            />
            <Button
              label="Zapisz zmiany"
              variant="primary"
              onPress={() => navigation.goBack()}
              style={styles.saveBtn}
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
  content: { padding: 24, gap: 24, paddingBottom: 40 },
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
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
    lineHeight: 28,
  },
  form: { gap: 16 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderColor: '#D32F2F',
  },
  cancelBtnText: {
    color: '#D32F2F',
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 12,
  },
});

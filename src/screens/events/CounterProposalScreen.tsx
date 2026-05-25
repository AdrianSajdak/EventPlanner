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
import { useEvents } from '../../context/EventsContext';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'CounterProposal'>;
  route: RouteProp<EventsStackParamList, 'CounterProposal'>;
};

export default function CounterProposalScreen({ navigation, route }: Props) {
  const { eventId } = route.params;
  const { addPoll } = useEvents();
  const [topic, setTopic] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');

  const handleCreate = () => {
    const options = [option1, option2, option3]
      .map((o) => o.trim())
      .filter(Boolean);
    if (!topic.trim() || options.length < 2) return;
    addPoll(eventId, topic.trim(), options);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Kontrpropozycja"
          showBack
          onBack={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Dodaj głosowanie</Text>
            <Text style={styles.infoText}>
              Zaproponuj alternatywne opcje dla uczestników, na które będą mogli głosować.
            </Text>
          </View>

          <View style={styles.card}>
            <Input
              label="Temat głosowania"
              value={topic}
              onChangeText={setTopic}
              placeholder="np. Godzina spotkania"
            />
            <Text style={styles.optionsTitle}>Opcje do głosowania</Text>
            <Input
              label="Opcja 1"
              value={option1}
              onChangeText={setOption1}
              placeholder="np. 18:00"
            />
            <Input
              label="Opcja 2"
              value={option2}
              onChangeText={setOption2}
              placeholder="np. 19:00"
            />
            <Input
              label="Opcja 3 (opcjonalnie)"
              value={option3}
              onChangeText={setOption3}
              placeholder="np. 20:00"
            />
          </View>

          <View style={styles.actions}>
            <Button
              label="Anuluj"
              variant="secondary"
              onPress={() => navigation.goBack()}
              style={styles.actionBtn}
            />
            <Button
              label="Dodaj głosowanie"
              variant="primary"
              onPress={handleCreate}
              disabled={!topic || !option1 || !option2}
              style={styles.actionBtn}
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
  infoCard: {
    backgroundColor: 'rgba(0,82,209,0.08)',
    borderWidth: 2,
    borderColor: Colors.actualMainBlue,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  infoTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.actualMainBlue,
  },
  infoText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 20,
    gap: 16,
  },
  optionsTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.secondaryDarkBlue,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
  },
});

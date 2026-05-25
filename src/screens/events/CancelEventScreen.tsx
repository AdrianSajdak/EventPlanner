import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Button } from '../../components/common/Button';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { useEvents } from '../../context/EventsContext';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'CancelEvent'>;
  route: RouteProp<EventsStackParamList, 'CancelEvent'>;
};

const reasons = [
  'Zmiana planów',
  'Problemy zdrowotne',
  'Złe warunki pogodowe',
  'Za mało uczestników',
  'Inne',
];

export default function CancelEventScreen({ navigation, route }: Props) {
  const { eventId } = route.params;
  const { getEvent, cancelEvent } = useEvents();
  const event = getEvent(eventId);
  const [selectedReason, setSelectedReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleCancel = () => {
    cancelEvent(eventId);
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar
        title="Odwołaj wydarzenie"
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.warningCard}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.warningTitle}>Odwołanie wydarzenia</Text>
          <Text style={styles.warningText}>
            Ta akcja jest nieodwracalna. Wszyscy uczestnicy zostaną powiadomieni o odwołaniu
            wydarzenia "{event.title}".
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Powód odwołania</Text>
          {reasons.map((reason) => (
            <TouchableOpacity
              key={reason}
              style={[styles.reasonItem, selectedReason === reason && styles.reasonItemActive]}
              onPress={() => setSelectedReason(reason)}
              activeOpacity={0.7}
            >
              <View style={[styles.radio, selectedReason === reason && styles.radioActive]}>
                {selectedReason === reason && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.reasonText}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.confirmRow}
          onPress={() => setConfirmed((v) => !v)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, confirmed && styles.checkboxActive]}>
            {confirmed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.confirmText}>
            Rozumiem, że ta akcja powiadomi wszystkich uczestników
          </Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <Button
            label="Anuluj"
            variant="secondary"
            onPress={() => navigation.goBack()}
            style={styles.actionBtn}
          />
          <Button
            label="Odwołaj wydarzenie"
            variant="primary"
            onPress={handleCancel}
            disabled={!selectedReason || !confirmed}
            style={{ ...styles.actionBtn, ...styles.cancelBtn }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 24, paddingBottom: 40 },
  warningCard: {
    backgroundColor: 'rgba(235,165,165,0.15)',
    borderWidth: 2,
    borderColor: '#D32F2F',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  warningIcon: { fontSize: 32 },
  warningTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: '#D32F2F',
  },
  warningText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 20,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.secondaryDarkBlue,
    marginBottom: 4,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  reasonItemActive: {
    borderColor: Colors.secondaryDarkBlue,
    backgroundColor: Colors.navbarFocus,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.mainGraySecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: Colors.secondaryDarkBlue },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondaryDarkBlue,
  },
  reasonText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  confirmRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.mainGraySecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.secondaryDarkBlue,
    borderColor: Colors.secondaryDarkBlue,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  confirmText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
  },
  cancelBtn: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },
});

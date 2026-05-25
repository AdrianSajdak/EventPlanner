import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'Language'>;
};

type Lang = 'pl' | 'en';

const OPTIONS: { value: Lang; label: string; flag: string }[] = [
  { value: 'pl', label: 'Polski', flag: '🇵🇱' },
  { value: 'en', label: 'Angielski', flag: '🇬🇧' },
];

export default function LanguageScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<Lang>('pl');

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Język" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.helper}>Wybierz preferowany język aplikacji.</Text>
        <View style={styles.card}>
          {OPTIONS.map((opt, i) => (
            <React.Fragment key={opt.value}>
              {i > 0 && <View style={styles.separator} />}
              <TouchableOpacity
                style={styles.row}
                onPress={() => setSelected(opt.value)}
                activeOpacity={0.7}
              >
                <Text style={styles.flag}>{opt.flag}</Text>
                <Text style={styles.label}>{opt.label}</Text>
                <View style={[styles.radio, selected === opt.value && styles.radioActive]}>
                  {selected === opt.value && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 16 },
  helper: {
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
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  flag: { fontSize: 22 },
  label: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.mainGraySecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: Colors.actualMainBlue },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.actualMainBlue,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 16,
  },
});

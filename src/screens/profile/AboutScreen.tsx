import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'About'>;
};

export default function AboutScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="O aplikacji" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.appName}>EventPlanner</Text>
          <Text style={styles.description}>
            EventPlanner to aplikacji do planowania wydarzeń.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24 },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 24,
    gap: 12,
  },
  appName: {
    fontFamily: Fonts.extraBold,
    fontSize: FontSizes.xl,
    color: Colors.secondaryDarkBlue,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.black,
    lineHeight: 22,
  },
});

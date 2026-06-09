import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { AppIcon, AppIconName } from '../../components/common/AppIcon';
import { ProfileStackParamList } from '../../navigation/ProfileNavigator';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'UserProfile'>;
};

type StatCardProps = {
  icon: AppIconName;
  value: string;
  label: string;
  iconColor: string;
};

type HistoryItemProps = {
  title: string;
  date: string;
  category: string;
  thumbnailColor: string;
  icon: AppIconName;
};

const HISTORY_ITEMS: HistoryItemProps[] = [
  {
    title: 'Kolacja w Trattoria',
    date: '14 Października 2023',
    category: 'Kulinaria',
    thumbnailColor: Colors.secondaryDarkBlue,
    icon: 'food',
  },
  {
    title: 'Wystawa Sztuki Nowoczesnej',
    date: '02 Września 2023',
    category: 'Kultura',
    thumbnailColor: '#271C43',
    icon: 'rocket',
  },
  {
    title: 'Wieczór z Planszówkami',
    date: '15 Sierpnia 2023',
    category: 'Gry',
    thumbnailColor: '#2C5077',
    icon: 'poll',
  },
  {
    title: 'Kino Letnie',
    date: '21 Lipca 2023',
    category: 'Film',
    thumbnailColor: '#2E243B',
    icon: 'cinema',
  },
];

const StatCard = ({
  icon,
  value,
  label,
  iconColor,
}: StatCardProps) => (
  <View style={styles.statCard}>
    <AppIcon name={icon} size={22} color={iconColor} />
    <View style={styles.statTextGroup}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

const InfoRow = ({
  eyebrow,
  value,
  onEdit,
}: {
  eyebrow: string;
  value: string;
  onEdit?: () => void;
}) => (
  <View style={styles.infoRow}>
    <View style={styles.infoTextGroup}>
      <Text style={styles.infoEyebrow}>{eyebrow}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
    {onEdit ? (
      <TouchableOpacity onPress={onEdit} style={styles.editButton} activeOpacity={0.75}>
        <AppIcon name="edit" size={23} color={Colors.secondaryDarkBlue} />
      </TouchableOpacity>
    ) : null}
  </View>
);

const HistoryItem = ({
  title,
  date,
  category,
  thumbnailColor,
  icon,
}: HistoryItemProps) => (
  <TouchableOpacity style={styles.historyCard} activeOpacity={0.75}>
    <View style={[styles.historyThumbnail, { backgroundColor: thumbnailColor }]}>
      <AppIcon name={icon} size={34} color={Colors.white} />
    </View>
    <View style={styles.historyContent}>
      <Text style={styles.historyTitle}>{title}</Text>
      <View style={styles.historyUnderline} />
      <Text style={styles.historyDate}>{date}</Text>
    </View>
    <View style={styles.categoryPill}>
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  </TouchableOpacity>
);

export default function UserProfileScreen({ navigation }: Props) {
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const visibleHistoryItems = historyExpanded ? HISTORY_ITEMS : HISTORY_ITEMS.slice(0, 2);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.getParent<any>()?.navigate('events');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Profil Użytkownika" showBack onBack={goBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarFrame}>
            <View style={styles.avatarCircle}>
              <AppIcon name="profile" size={76} color={Colors.white} />
            </View>
            <TouchableOpacity
              style={styles.avatarEditButton}
              onPress={() => navigation.navigate('ChangePersonalData')}
              activeOpacity={0.75}
            >
              <AppIcon name="edit" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Aleksander Kowalski</Text>
          <Text style={styles.userSubtitle}>Miłośnik architektury i kawy</Text>
        </View>

        <Text style={styles.sectionTitle}>Statystyki</Text>
        <View style={styles.statsRow}>
          <StatCard
            icon="goingOut"
            value="42"
            label="LICZBA WYJŚĆ"
            iconColor={Colors.actualMainBlue}
          />
          <StatCard
            icon="food"
            value="Resto"
            label="ULUBIONA KATEGORIA"
            iconColor={Colors.purpleAccent}
          />
        </View>

        <Text style={[styles.sectionTitle, styles.infoSectionTitle]}>Informacje</Text>
        <View style={styles.infoSection}>
          <InfoRow
            eyebrow="IMIĘ I NAZWISKO"
            value="Aleksander Kowalski"
            onEdit={() => navigation.navigate('ChangePersonalData')}
          />
          <InfoRow
            eyebrow="E-MAIL"
            value="aleks.kowalski@example.com"
            onEdit={() => navigation.navigate('ChangeEmail')}
          />
          <InfoRow eyebrow="LOKALIZACJA" value="Warszawa, PL" />
        </View>

        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Historia</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => setHistoryExpanded((current) => !current)}
            activeOpacity={0.75}
          >
            <Text style={styles.seeAllText}>
              {historyExpanded ? 'ZWIŃ' : 'ZOBACZ WSZYSTKO'}
            </Text>
            <AppIcon
              name={historyExpanded ? 'polygonUp' : 'polygon'}
              size={15}
              color={Colors.actualMainBlue}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.historyList}>
          {visibleHistoryItems.map((item) => (
            <HistoryItem
              key={`${item.title}-${item.date}`}
              title={item.title}
              date={item.date}
              category={item.category}
              thumbnailColor={item.thumbnailColor}
              icon={item.icon}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: {
    paddingTop: 22,
    paddingHorizontal: 28,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 26,
  },
  avatarFrame: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarCircle: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: Colors.black,
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  avatarEditButton: {
    position: 'absolute',
    right: 14,
    bottom: 22,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.actualMainBlue,
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontFamily: Fonts.bold,
    fontSize: 23,
    color: Colors.actualMainBlue,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 4,
  },
  userSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 30,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 26,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    minHeight: 150,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    justifyContent: 'space-between',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.55,
    shadowRadius: 2,
    elevation: 5,
  },
  statTextGroup: {
    gap: 2,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: Colors.secondaryDarkBlue,
    lineHeight: 36,
  },
  statLabel: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: Colors.graySecondary,
    lineHeight: 14,
    letterSpacing: 1,
  },
  infoSectionTitle: {
    marginTop: 44,
    marginBottom: 20,
  },
  infoSection: {
    gap: 28,
  },
  infoRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    paddingLeft: 12,
  },
  infoTextGroup: {
    flex: 1,
    gap: 5,
  },
  infoEyebrow: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.graySecondary,
    lineHeight: 13,
    letterSpacing: 2,
  },
  infoValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.black,
    lineHeight: 22,
  },
  editButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyHeader: {
    marginTop: 50,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  seeAllText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.actualMainBlue,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  historyList: {
    gap: 16,
  },
  historyCard: {
    minHeight: 88,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.55,
    shadowRadius: 2,
    elevation: 5,
  },
  historyThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  historyContent: {
    flex: 1,
    minWidth: 0,
  },
  historyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.secondaryDarkBlue,
    lineHeight: 19,
  },
  historyUnderline: {
    height: 1,
    backgroundColor: Colors.secondaryDarkBlue,
    opacity: 0.8,
    marginTop: 2,
    marginBottom: 2,
  },
  historyDate: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    lineHeight: 16,
  },
  categoryPill: {
    minWidth: 72,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  categoryText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: Colors.mainGraySecondary,
    lineHeight: 14,
  },
});

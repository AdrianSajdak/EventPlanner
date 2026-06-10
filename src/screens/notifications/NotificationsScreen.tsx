import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Navbar } from '../../components/common/Navbar';
import { AppIcon, AppIconName } from '../../components/common/AppIcon';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const avatar = require('../../../assets/images/notification-avatar.png');

type NotificationCardProps = {
  title: string;
  body: React.ReactNode;
  time: string;
  icon?: AppIconName;
  iconBg?: string;
  avatarImage?: number;
  unread?: boolean;
  actions?: boolean;
};

const ActionButtons = () => (
  <View style={styles.actions}>
    <TouchableOpacity style={styles.acceptButton} activeOpacity={0.8}>
      <Text style={styles.acceptButtonText}>Zaakceptuj</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.rejectButton} activeOpacity={0.8}>
      <Text style={styles.rejectButtonText}>Odrzuć</Text>
    </TouchableOpacity>
  </View>
);

const NotificationCard = ({
  title,
  body,
  time,
  icon,
  iconBg,
  avatarImage,
  unread,
  actions,
}: NotificationCardProps) => (
  <View style={styles.card}>
    {unread ? <View style={styles.unreadDot} /> : null}
    <View style={styles.cardMain}>
      {avatarImage ? (
        <Image source={avatarImage} style={styles.avatar} />
      ) : (
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          {icon ? <AppIcon name={icon} size={24} color={Colors.actualMainBlue} /> : null}
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.cardBody}>{body}</Text>
      </View>
    </View>
    {actions ? (
      <>
        <View style={styles.divider} />
        <ActionButtons />
      </>
    ) : null}
  </View>
);

export default function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar title="Powiadomienia" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.dayTitle}>Dzisiaj</Text>
        <NotificationCard
          avatarImage={avatar}
          title="Marta Kowalska"
          body={<>Zaprosiła Cię do wydarzenia{'\n'}<Text style={styles.boldText}>"Włoska Kolacja w Centrum".</Text></>}
          time="10:45"
          unread
          actions
        />
        <NotificationCard
          icon="update"
          iconBg="#D6E6FB"
          title="Aktualizacja planu"
          body={<>Zmieniono godzinę rozpoczęcia{'\n'}<Text style={styles.boldText}>"Wieczór z Planszówkami"</Text> na{'\n'}19:30.</>}
          time="09:15"
        />
        <NotificationCard
          icon="poll"
          iconBg="#CDB2D9"
          title="Wyniki głosowania"
          body={<>Lokalizacja wybrana!{'\n'}Większość zdecydowała się na{'\n'}<Text style={styles.boldText}>"Bar Studio"</Text> na sobotni{'\n'}wieczór.</>}
          time="08:02"
        />

        <Text style={[styles.dayTitle, styles.yesterdayTitle]}>Wczoraj</Text>
        <NotificationCard
          avatarImage={avatar}
          title="Paweł Nowak"
          body={<>Wysłał Ci zaproszenie do grona{'\n'}znajomych.</>}
          time="18:20"
          actions
        />
        <NotificationCard
          icon="deletedEvent"
          iconBg="#EBA5A5"
          title="Wydarzenie odwołane"
          body={<><Text style={styles.boldText}>"Kino Letnie"</Text> zostało odwołane{'\n'}z powodu złej pogody.</>}
          time="14:50"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 22,
  },
  dayTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 31,
    marginLeft: 8,
    marginBottom: 2,
  },
  yesterdayTitle: {
    marginTop: 10,
  },
  card: {
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
    elevation: 5,
  },
  unreadDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.actualMainBlue,
    zIndex: 2,
  },
  cardMain: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginTop: 18,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.black,
    lineHeight: 22,
  },
  time: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.graySecondary,
    lineHeight: 16,
    marginRight: 4,
  },
  cardBody: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.graySecondary,
    lineHeight: 22,
  },
  boldText: {
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderDark,
    marginTop: 9,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 40,
    paddingRight: 3,
  },
  acceptButton: {
    minWidth: 119,
    minHeight: 36,
    borderRadius: 5,
    backgroundColor: Colors.secondaryDarkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 4,
  },
  rejectButton: {
    minWidth: 92,
    minHeight: 36,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    backgroundColor: Colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 4,
  },
  acceptButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.white,
  },
  rejectButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.secondaryDarkBlue,
  },
});

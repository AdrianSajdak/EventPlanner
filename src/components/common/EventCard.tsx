import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Button } from './Button';
import { AppIcon } from './AppIcon';

export interface EventCardData {
  id: string;
  title: string;
  date: string;
  location: string;
  organizer: { name: string; avatarUrl?: string };
  participants?: { avatarUrl?: string }[];
  totalParticipants?: number;
}

interface EventCardProps {
  event: EventCardData;
  variant: 'pending' | 'accepted' | 'hosted';
  onAccept?: () => void;
  onReject?: () => void;
  onDetails?: () => void;
  onEdit?: () => void;
}

const AvatarGroup: React.FC<{
  participants: { avatarUrl?: string }[];
  total?: number;
}> = ({ participants, total = 0 }) => (
  <View style={styles.avatarGroup}>
    {participants.slice(0, 2).map((p, i) => (
      <View key={i} style={[styles.avatar, { marginLeft: i === 0 ? 0 : -8 }]}>
        {p.avatarUrl ? (
          <Image source={{ uri: p.avatarUrl }} style={styles.avatarImg} />
        ) : (
          <View style={[styles.avatarImg, styles.avatarPlaceholder]} />
        )}
      </View>
    ))}
    {total > 2 && (
      <View style={[styles.avatar, styles.avatarCount, { marginLeft: -8 }]}>
        <Text style={styles.avatarCountText}>+{total - 2}</Text>
      </View>
    )}
  </View>
);

export const EventCard: React.FC<EventCardProps> = ({
  event,
  variant,
  onAccept,
  onReject,
  onDetails,
  onEdit,
}) => {
  const cardBg = variant === 'hosted' ? Colors.offWhite : variant === 'accepted' ? Colors.offWhite : Colors.offWhite;
  const dimmedBg = Colors.lightGray;

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      <View style={styles.titleRow}>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <AppIcon name="calendar" size={16} color={Colors.mainGraySecondary} />
          <Text style={styles.metaText}>{event.date}</Text>
        </View>
        <View style={styles.metaItem}>
          <AppIcon name="localization" size={16} color={Colors.mainGraySecondary} />
          <Text style={styles.metaText}>{event.location}</Text>
        </View>
      </View>

      <View style={styles.organizerRow}>
        <Text style={styles.organizerLabel}>
          {variant === 'hosted' ? 'Zaakceptowane przez:' : 'Organizowane przez:'}
        </Text>
        <View style={styles.organizerInfo}>
          {event.organizer.avatarUrl ? (
            <Image source={{ uri: event.organizer.avatarUrl }} style={styles.organizerAvatar} />
          ) : (
            <View style={[styles.organizerAvatar, styles.avatarPlaceholder]} />
          )}
          {variant !== 'hosted' && (
            <Text style={styles.organizerName}>{event.organizer.name}</Text>
          )}
          {variant === 'hosted' && event.participants && (
            <AvatarGroup
              participants={event.participants}
              total={event.totalParticipants}
            />
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actions}>
        {variant === 'pending' && (
          <>
            <Button label="Zaakceptuj" onPress={onAccept!} variant="primary" style={styles.actionBtn} />
            <Button label="Odrzuć" onPress={onReject!} variant="secondary" style={styles.actionBtn} />
          </>
        )}
        {variant === 'accepted' && (
          <View style={styles.acceptedActions}>
            {event.participants && (
              <AvatarGroup
                participants={event.participants}
                total={event.totalParticipants}
              />
            )}
            <Button label="Szczegóły" onPress={onDetails!} variant="primary" style={styles.actionBtn} />
          </View>
        )}
        {variant === 'hosted' && (
          <View style={styles.hostedActions}>
            <Button label="Szczegóły" onPress={onDetails!} variant="secondary" style={styles.actionBtn} />
            <Button label="Edytuj" onPress={onEdit!} variant="primary" style={styles.actionBtn} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 10,
    gap: 10,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
    width: '100%',
  },
  titleRow: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.secondaryDarkBlue,
    paddingBottom: 4,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
  },
  organizerRow: {
    gap: 4,
  },
  organizerLabel: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    color: Colors.actualMainBlue,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  organizerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  organizerName: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.md,
    color: Colors.black,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
    marginTop: 4,
  },
  actions: {
    paddingTop: 8,
  },
  acceptedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hostedActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 16,
    width: 32,
    height: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.lightGray,
  },
  avatarCount: {
    backgroundColor: Colors.cardGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCountText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xs,
    color: Colors.black,
  },
});

import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../theme/colors';

export type AppIconName =
  | 'accepted'
  | 'add'
  | 'arrowContinue'
  | 'arrowGoBack'
  | 'calendar'
  | 'calendarAlt'
  | 'cinema'
  | 'clock'
  | 'delete'
  | 'deletedEvent'
  | 'edit'
  | 'email'
  | 'eventIndicator'
  | 'eye'
  | 'food'
  | 'friends'
  | 'goingOut'
  | 'idCard'
  | 'localization'
  | 'meetingLocation'
  | 'lock'
  | 'logout'
  | 'notificationSilentSwitch'
  | 'notificationSwitch'
  | 'notifications'
  | 'password'
  | 'plusBlue'
  | 'poll'
  | 'profile'
  | 'polygon'
  | 'role'
  | 'rocket'
  | 'send'
  | 'sendMessage'
  | 'shield'
  | 'smile'
  | 'sport'
  | 'update';

const iconSources: Record<AppIconName, ImageSourcePropType> = {
  accepted: require('../../../assets/icons/accepted.png'),
  add: require('../../../assets/icons/add.png'),
  arrowContinue: require('../../../assets/icons/arrow_continue.png'),
  arrowGoBack: require('../../../assets/icons/arrow_go_back.png'),
  calendar: require('../../../assets/icons/calendar1.png'),
  calendarAlt: require('../../../assets/icons/calendar2.png'),
  cinema: require('../../../assets/icons/cinema.png'),
  clock: require('../../../assets/icons/clock.png'),
  delete: require('../../../assets/icons/delete-1_svgrepo.com.png'),
  deletedEvent: require('../../../assets/icons/deleted_event.png'),
  edit: require('../../../assets/icons/edit-line.png'),
  email: require('../../../assets/icons/email.png'),
  eventIndicator: require('../../../assets/icons/Event Indicator.png'),
  eye: require('../../../assets/icons/eye_make_visible.png'),
  food: require('../../../assets/icons/food.png'),
  friends: require('../../../assets/icons/friends.png'),
  goingOut: require('../../../assets/icons/going_out.png'),
  idCard: require('../../../assets/icons/id-card_svgrepo.com.png'),
  localization: require('../../../assets/icons/localization.png'),
  meetingLocation: require('../../../assets/icons/localization_of_meeting.png'),
  lock: require('../../../assets/icons/lock.png'),
  logout: require('../../../assets/icons/logout.png'),
  notificationSilentSwitch: require('../../../assets/icons/notification-slient_switch.png'),
  notificationSwitch: require('../../../assets/icons/notification-switch.png'),
  notifications: require('../../../assets/icons/notifications.png'),
  password: require('../../../assets/icons/password_svgrepo.com.png'),
  plusBlue: require('../../../assets/icons/plus_blue.png'),
  poll: require('../../../assets/icons/poll.png'),
  profile: require('../../../assets/icons/profile.png'),
  polygon: require('../../../assets/icons/Polygon 1.png'),
  role: require('../../../assets/icons/role.png'),
  rocket: require('../../../assets/icons/rocket.png'),
  send: require('../../../assets/icons/send.png'),
  sendMessage: require('../../../assets/icons/send_message.png'),
  shield: require('../../../assets/icons/shield.png'),
  smile: require('../../../assets/icons/smile.png'),
  sport: require('../../../assets/icons/sport.png'),
  update: require('../../../assets/icons/update.png'),
};

type AppIconProps = {
  name: AppIconName;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
};

export const AppIcon = ({
  name,
  size = 20,
  color = Colors.secondaryDarkBlue,
  style,
}: AppIconProps) => (
  <Image
    source={iconSources[name]}
    style={[styles.icon, { width: size, height: size, tintColor: color }, style]}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  icon: {
    flexShrink: 0,
  },
});

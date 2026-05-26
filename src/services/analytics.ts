import analytics from '@react-native-firebase/analytics';

const safeCall = async (fn: () => Promise<void>): Promise<void> => {
  try {
    await fn();
  } catch {
    // intentionally silent
  }
};

export const logLogin = (method: string = 'password') =>
  safeCall(() => analytics().logLogin({ method }));

export const logSignUp = (method: string = 'password') =>
  safeCall(() => analytics().logSignUp({ method }));

export const logScreenView = (screenName: string) =>
  safeCall(() =>
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    })
  );

export const logEventCreated = (params?: { participants_count?: number }) =>
  safeCall(() => analytics().logEvent('event_created', params));

export const logEventCancelled = (eventId: string) =>
  safeCall(() => analytics().logEvent('event_cancelled', { event_id: eventId }));

export const logEventInviteAccepted = (eventId: string) =>
  safeCall(() => analytics().logEvent('event_invite_accepted', { event_id: eventId }));

export const logEventInviteRejected = (eventId: string) =>
  safeCall(() => analytics().logEvent('event_invite_rejected', { event_id: eventId }));

export const logEventLeft = (eventId: string) =>
  safeCall(() => analytics().logEvent('event_left', { event_id: eventId }));

export const logParticipantsInvited = (eventId: string, count: number) =>
  safeCall(() => analytics().logEvent('participants_invited', { event_id: eventId, count }));

export const logFriendListCreated = (memberCount: number) =>
  safeCall(() => analytics().logEvent('friend_list_created', { member_count: memberCount }));

export const logPollVoted = (eventId: string, pollId: string) =>
  safeCall(() => analytics().logEvent('poll_voted', { event_id: eventId, poll_id: pollId }));

export const logCounterProposalAdded = (eventId: string, optionsCount: number) =>
  safeCall(() =>
    analytics().logEvent('counter_proposal_added', {
      event_id: eventId,
      options_count: optionsCount,
    })
  );

export const logLogout = () =>
  safeCall(() => analytics().logEvent('logout'));

export const logAccountDeleted = () =>
  safeCall(() => analytics().logEvent('account_deleted'));

export const setAnalyticsUserId = (userId: string | null) =>
  safeCall(() => analytics().setUserId(userId));

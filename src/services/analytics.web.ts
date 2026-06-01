const noop = async (): Promise<void> => undefined;

export const logLogin = (_method: string = 'password') => noop();

export const logSignUp = (_method: string = 'password') => noop();

export const logScreenView = (_screenName: string) => noop();

export const logEventCreated = (_params?: { participants_count?: number }) => noop();

export const logEventCancelled = (_eventId: string) => noop();

export const logEventInviteAccepted = (_eventId: string) => noop();

export const logEventInviteRejected = (_eventId: string) => noop();

export const logEventLeft = (_eventId: string) => noop();

export const logParticipantsInvited = (_eventId: string, _count: number) => noop();

export const logFriendListCreated = (_memberCount: number) => noop();

export const logPollVoted = (_eventId: string, _pollId: string) => noop();

export const logCounterProposalAdded = (_eventId: string, _optionsCount: number) => noop();

export const logLogout = () => noop();

export const logAccountDeleted = () => noop();

export const setAnalyticsUserId = (_userId: string | null) => noop();

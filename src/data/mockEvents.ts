import { EventCardData } from '../components/common/EventCard';

export interface EventVoteOption {
  label: string;
  percent: number;
}

export interface EventDetails {
  id: string;
  title: string;
  dateLabel: string;
  shortDate: string;
  locationName: string;
  locationStreet: string;
  locationCity: string;
  organizer: { name: string; avatarUrl?: string };
  participantsTotal: number;
  participantsAccepted: number;
  participantsPending: number;
  participantsRejected: number;
  voteTitle: string;
  voteOptions: EventVoteOption[];
  invitedFriendIds?: string[];
}

const BASE_EVENT: Omit<EventDetails, 'id'> = {
  title: 'Wieczór z Planszówkami',
  dateLabel: '15 Paź, 18:30',
  shortDate: '12 Paź, 19:00',
  locationName: 'Cybermachina',
  locationStreet: 'Cybermachina, ul. Mikołajska 11',
  locationCity: 'Kraków, Polska',
  organizer: { name: 'Marek Kowalski' },
  participantsTotal: 8,
  participantsAccepted: 5,
  participantsPending: 2,
  participantsRejected: 1,
  voteTitle: 'Głosowanie: Godzina startu',
  voteOptions: [
    { label: '18:00', percent: 80 },
    { label: '19:00', percent: 20 },
  ],
};

export const MOCK_EVENTS: EventDetails[] = ['1', '2', '3', '4', '5'].map((id) => ({
  id,
  ...BASE_EVENT,
}));

export const getMockEvent = (eventId: string): EventDetails =>
  MOCK_EVENTS.find((e) => e.id === eventId) ?? MOCK_EVENTS[0];

const toCardData = (event: EventDetails): EventCardData => ({
  id: event.id,
  title: event.title,
  date: event.shortDate,
  location: event.locationName,
  organizer: event.organizer,
  participants: [{}, {}],
  totalParticipants: event.participantsTotal,
});

export const MOCK_PENDING_CARDS: EventCardData[] = MOCK_EVENTS.slice(0, 1).map(toCardData);
export const MOCK_ACCEPTED_CARDS: EventCardData[] = MOCK_EVENTS.slice(1, 3).map(toCardData);
export const MOCK_HOSTED_CARDS: EventCardData[] = MOCK_EVENTS.slice(3, 5).map((e) =>
  ({ ...toCardData(e), organizer: { name: '' } })
);

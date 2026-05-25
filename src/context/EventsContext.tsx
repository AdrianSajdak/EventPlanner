import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { EventCardData } from '../components/common/EventCard';
import {
  EventDetails,
  MOCK_ACCEPTED_CARDS,
  MOCK_EVENTS,
  MOCK_HISTORICAL_EVENTS,
  MOCK_HOSTED_CARDS,
} from '../data/mockEvents';

export interface NewHostedEventInput {
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  participantsCount: number;
}

export interface PollOption {
  label: string;
  votes: number;
  voted: boolean;
}

export interface Poll {
  id: string;
  title: string;
  status: 'active' | 'closed';
  options: PollOption[];
}

interface EventsContextValue {
  hosted: EventCardData[];
  accepted: EventCardData[];
  addHostedEvent: (input: NewHostedEventInput) => EventDetails;
  getEvent: (id: string) => EventDetails;
  updateEvent: (id: string, patch: Partial<EventDetails>) => void;
  cancelEvent: (id: string) => void;
  inviteToEvent: (id: string, friendIds: string[]) => void;
  acceptInvite: (card: EventCardData) => void;
  leaveEvent: (id: string) => void;
  getPolls: (eventId: string) => Poll[];
  voteOnPoll: (eventId: string, pollId: string, optionLabel: string) => void;
  addPoll: (eventId: string, title: string, optionLabels: string[]) => Poll;
}

const EventsContext = createContext<EventsContextValue | null>(null);

const formatDate = (date: string, time: string): string => {
  const parts = [date, time].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : 'Termin nieustalony';
};

const toCardData = (event: EventDetails, organizerName: string): EventCardData => ({
  id: event.id,
  title: event.title,
  date: event.shortDate,
  location: event.locationName,
  organizer: { name: organizerName },
  participants: Array.from({ length: Math.min(event.participantsTotal, 2) }, () => ({})),
  totalParticipants: event.participantsTotal,
});

const initialEventsById = (): Record<string, EventDetails> => {
  const map: Record<string, EventDetails> = {};
  [...MOCK_EVENTS, ...MOCK_HISTORICAL_EVENTS].forEach((e) => {
    map[e.id] = e;
  });
  return map;
};

const INITIAL_HOSTED_IDS = MOCK_HOSTED_CARDS.map((c) => c.id);

const DEFAULT_POLLS: Poll[] = [
  {
    id: 'poll-time',
    title: 'Głosowanie: Godzina startu',
    status: 'active',
    options: [
      { label: '18:00', votes: 4, voted: true },
      { label: '19:00', votes: 1, voted: false },
    ],
  },
  {
    id: 'poll-place',
    title: 'Głosowanie: Miejsce spotkania',
    status: 'active',
    options: [
      { label: 'Cybermachina', votes: 3, voted: false },
      { label: 'Dom Marka', votes: 2, voted: false },
    ],
  },
];

const clonePolls = (polls: Poll[]): Poll[] =>
  polls.map((p) => ({ ...p, options: p.options.map((o) => ({ ...o })) }));

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventsById, setEventsById] = useState<Record<string, EventDetails>>(initialEventsById);
  const [hostedIds, setHostedIds] = useState<string[]>(INITIAL_HOSTED_IDS);
  const [accepted, setAccepted] = useState<EventCardData[]>(MOCK_ACCEPTED_CARDS);
  const [pollsByEventId, setPollsByEventId] = useState<Record<string, Poll[]>>({});

  const getPolls = useCallback(
    (eventId: string): Poll[] => pollsByEventId[eventId] ?? DEFAULT_POLLS,
    [pollsByEventId]
  );

  const ensurePolls = (prev: Record<string, Poll[]>, eventId: string): Poll[] =>
    prev[eventId] ?? clonePolls(DEFAULT_POLLS);

  const voteOnPoll = useCallback((eventId: string, pollId: string, optionLabel: string) => {
    setPollsByEventId((prev) => {
      const base = ensurePolls(prev, eventId);
      const next = base.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          options: poll.options.map((opt) => {
            const wasVoted = opt.voted;
            const willBeVoted = opt.label === optionLabel;
            let votes = opt.votes;
            if (wasVoted && !willBeVoted) votes -= 1;
            if (!wasVoted && willBeVoted) votes += 1;
            return { ...opt, votes: Math.max(votes, 0), voted: willBeVoted };
          }),
        };
      });
      return { ...prev, [eventId]: next };
    });
  }, []);

  const addPoll = useCallback(
    (eventId: string, title: string, optionLabels: string[]): Poll => {
      const newPoll: Poll = {
        id: `poll-${Date.now()}`,
        title,
        status: 'active',
        options: optionLabels.map((label) => ({ label, votes: 0, voted: false })),
      };
      setPollsByEventId((prev) => {
        const base = ensurePolls(prev, eventId);
        return { ...prev, [eventId]: [...base, newPoll] };
      });
      return newPoll;
    },
    []
  );

  const acceptInvite = useCallback((card: EventCardData) => {
    setAccepted((prev) => (prev.some((e) => e.id === card.id) ? prev : [...prev, card]));
  }, []);

  const leaveEvent = useCallback((id: string) => {
    setAccepted((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const addHostedEvent = useCallback((input: NewHostedEventInput): EventDetails => {
    const id = `hosted-${Date.now()}`;
    const total = Math.max(input.participantsCount, 1);
    const dateLabel = formatDate(input.date, input.time);
    const newEvent: EventDetails = {
      id,
      title: input.title.trim() || 'Nowe wydarzenie',
      dateLabel,
      shortDate: dateLabel,
      locationName: input.location.trim() || 'Lokalizacja nieustalona',
      locationStreet: input.location.trim() || 'Lokalizacja nieustalona',
      locationCity: '',
      organizer: { name: '' },
      participantsTotal: total,
      participantsAccepted: 0,
      participantsPending: total,
      participantsRejected: 0,
      voteTitle: 'Głosowanie: Godzina startu',
      voteOptions: [],
    };
    setEventsById((prev) => ({ ...prev, [id]: newEvent }));
    setHostedIds((prev) => [id, ...prev]);
    return newEvent;
  }, []);

  const getEvent = useCallback(
    (id: string): EventDetails => eventsById[id] ?? MOCK_EVENTS[0],
    [eventsById]
  );

  const updateEvent = useCallback((id: string, patch: Partial<EventDetails>) => {
    setEventsById((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      return { ...prev, [id]: { ...existing, ...patch } };
    });
  }, []);

  const inviteToEvent = useCallback((id: string, friendIds: string[]) => {
    setEventsById((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const alreadyInvited = existing.invitedFriendIds ?? [];
      const newlyInvited = friendIds.filter((fid) => !alreadyInvited.includes(fid));
      if (newlyInvited.length === 0) return prev;
      return {
        ...prev,
        [id]: {
          ...existing,
          invitedFriendIds: [...alreadyInvited, ...newlyInvited],
          participantsTotal: existing.participantsTotal + newlyInvited.length,
          participantsPending: existing.participantsPending + newlyInvited.length,
        },
      };
    });
  }, []);

  const cancelEvent = useCallback((id: string) => {
    setHostedIds((prev) => prev.filter((x) => x !== id));
    setEventsById((prev) => {
      if (!(id in prev)) return prev;
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const hosted = useMemo<EventCardData[]>(
    () => hostedIds.map((id) => toCardData(eventsById[id], '')),
    [hostedIds, eventsById]
  );

  const value = useMemo(
    () => ({
      hosted,
      accepted,
      addHostedEvent,
      getEvent,
      updateEvent,
      cancelEvent,
      inviteToEvent,
      acceptInvite,
      leaveEvent,
      getPolls,
      voteOnPoll,
      addPoll,
    }),
    [
      hosted,
      accepted,
      addHostedEvent,
      getEvent,
      updateEvent,
      cancelEvent,
      inviteToEvent,
      acceptInvite,
      leaveEvent,
      getPolls,
      voteOnPoll,
      addPoll,
    ]
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEvents = (): EventsContextValue => {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return ctx;
};

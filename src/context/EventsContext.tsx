import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { EventCardData } from '../components/common/EventCard';
import {
  EventDetails,
  MOCK_EVENTS,
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

interface EventsContextValue {
  hosted: EventCardData[];
  addHostedEvent: (input: NewHostedEventInput) => EventDetails;
  getEvent: (id: string) => EventDetails;
  updateEvent: (id: string, patch: Partial<EventDetails>) => void;
  cancelEvent: (id: string) => void;
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
  MOCK_EVENTS.forEach((e) => {
    map[e.id] = e;
  });
  return map;
};

const INITIAL_HOSTED_IDS = MOCK_HOSTED_CARDS.map((c) => c.id);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventsById, setEventsById] = useState<Record<string, EventDetails>>(initialEventsById);
  const [hostedIds, setHostedIds] = useState<string[]>(INITIAL_HOSTED_IDS);

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
    () => ({ hosted, addHostedEvent, getEvent, updateEvent, cancelEvent }),
    [hosted, addHostedEvent, getEvent, updateEvent, cancelEvent]
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

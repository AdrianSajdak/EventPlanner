import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import NewEventScreen from '../screens/events/NewEventScreen';
import EventEditorScreen from '../screens/events/EventEditorScreen';
import CancelEventScreen from '../screens/events/CancelEventScreen';
import EventDetailsScreen from '../screens/events/EventDetailsScreen';
import EventDetailsOrganizerScreen from '../screens/events/EventDetailsOrganizerScreen';
import EventHistoryScreen from '../screens/events/EventHistoryScreen';
import ChatScreen from '../screens/events/ChatScreen';
import PlanningScreen from '../screens/events/PlanningScreen';
import CounterProposalScreen from '../screens/events/CounterProposalScreen';

export type EventsStackParamList = {
  Dashboard: undefined;
  NewEvent: undefined;
  EventEditor: { eventId: string };
  CancelEvent: { eventId: string };
  EventDetails: { eventId: string; isOrganizer: boolean };
  EventHistory: { eventId: string };
  EventDetailsOrganizer: { eventId: string };
  Chat: { eventId: string };
  Planning: { eventId: string };
  CounterProposal: { eventId: string };
};

const Stack = createNativeStackNavigator<EventsStackParamList>();

export default function EventsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="NewEvent" component={NewEventScreen} />
      <Stack.Screen name="EventEditor" component={EventEditorScreen} />
      <Stack.Screen name="CancelEvent" component={CancelEventScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="EventDetailsOrganizer" component={EventDetailsOrganizerScreen} />
      <Stack.Screen name="EventHistory" component={EventHistoryScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Planning" component={PlanningScreen} />
      <Stack.Screen name="CounterProposal" component={CounterProposalScreen} />
    </Stack.Navigator>
  );
}

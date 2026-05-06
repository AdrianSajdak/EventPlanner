# Planner Wydarzeń — Lista Widoków do Implementacji

Widoki główne (ekrany aplikacji):

- [x] Logowanie (`110:609`) → `src/screens/auth/LoginScreen.tsx`
- [x] Rejestracja (`110:678`) → `src/screens/auth/RegisterScreen.tsx`
- [x] Twoje Wyjścia / Dashboard (`110:5`) → `src/screens/dashboard/DashboardScreen.tsx`
- [x] Nowe Wyjście — Kreator (`110:235`) → `src/screens/events/NewEventScreen.tsx`
- [x] Edytor wydarzenia (`229:2281`) → `src/screens/events/EventEditorScreen.tsx`
- [x] Odwołaj wydarzenie (`229:2528`) → `src/screens/events/CancelEventScreen.tsx`
- [x] Szczegóły Wydarzenia — uczestnik (`110:884`) → `src/screens/events/EventDetailsScreen.tsx`
- [x] Szczegóły Wydarzenia — organizator (`229:2707`) → `src/screens/events/EventDetailsOrganizerScreen.tsx`
- [x] Szczegóły — Czat v1 (`123:1503`) → `src/screens/events/ChatScreen.tsx`
- [x] Szczegóły — Czat v2 (`123:1646`) → `src/screens/events/ChatScreen.tsx` (ujednolicono)
- [x] Szczegóły — Planowanie (`122:458`) → `src/screens/events/PlanningScreen.tsx`
- [x] Kontrpropozycja (`225:2128`) → `src/screens/events/CounterProposalScreen.tsx`
- [x] Profil Użytkownika (`110:386`) → `src/screens/profile/UserProfileScreen.tsx`
- [x] Znajomi (`110:501`) → `src/screens/friends/FriendsScreen.tsx`
- [x] Zaproś więcej (`205:1410`) → `src/screens/friends/InviteMoreScreen.tsx`
- [x] Nowa lista znajomych (`236:3070`) → `src/screens/friends/NewFriendsListScreen.tsx`
- [x] Powiadomienia (`156:418`) → `src/screens/notifications/NotificationsScreen.tsx`
- [x] Ustawienia (`135:255`) → `src/screens/profile/SettingsScreen.tsx`
- [x] Zmień hasło (`184:679`) → `src/screens/profile/ChangePasswordScreen.tsx`
- [x] Zmień adres e-mail (`203:967`) → `src/screens/profile/ChangeEmailScreen.tsx`
- [x] Zmień dane personalne (`203:1079`) → `src/screens/profile/ChangePersonalDataScreen.tsx`

## Status: WSZYSTKIE EKRANY ZAIMPLEMENTOWANE ✅

Komponenty (nie są osobnymi ekranami):
- Component 1 (`149:114`) → `src/components/common/EventCard.tsx` (pending variant)
- Accepted Events (`149:199`) → `src/components/common/EventCard.tsx` (accepted variant)
- Hosted Events Container (`149:515`) → `src/components/common/EventCard.tsx` (hosted variant)
- System Notification: Voting (`149:723`) → Wbudowany w `EventDetailsScreen.tsx`
- Main Container (`156:224`) → `src/components/common/Navbar.tsx`
- Historia Section (`169:310`) → Wbudowany w `UserProfileScreen.tsx`
- Section — Current Friends List (`172:505`) → `src/screens/friends/FriendsScreen.tsx`
- Friend Item 1 (`201:872`) → Wbudowany w `FriendsScreen.tsx`
- List of Friends (`208:1875`) → `src/screens/friends/FriendsScreen.tsx`
- Poll 1: Timing (`236:2872`) → `src/screens/events/PlanningScreen.tsx`

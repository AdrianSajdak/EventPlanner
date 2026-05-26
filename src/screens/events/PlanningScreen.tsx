import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { useEvents } from '../../context/EventsContext';
import { logPollVoted } from '../../services/analytics';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'Planning'>;
  route: RouteProp<EventsStackParamList, 'Planning'>;
};

export default function PlanningScreen({ navigation, route }: Props) {
  const { eventId } = route.params;
  const { getPolls, voteOnPoll } = useEvents();
  const polls = getPolls(eventId);

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar
        title="Wieczór z planszówkami"
        showBack
        onBack={() => navigation.goBack()}
      />

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.goBack()}>
          <Text style={styles.tabLabel}>Info</Text>
        </TouchableOpacity>
        <View style={[styles.tabItem, styles.activeTabItem]}>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Planowanie</Text>
        </View>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Chat', { eventId })}
        >
          <Text style={styles.tabLabel}>Czat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {polls.map((poll) => {
          const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
          return (
            <View key={poll.id} style={styles.pollCard}>
              <View style={styles.pollHeader}>
                <Text style={styles.pollTitle}>{poll.title}</Text>
                <View style={[styles.statusBadge, poll.status === 'active' && styles.activeBadge]}>
                  <Text style={[styles.statusText, poll.status === 'active' && styles.activeText]}>
                    {poll.status === 'active' ? 'AKTYWNE' : 'ZAKOŃCZONE'}
                  </Text>
                </View>
              </View>
              {poll.options.map((option) => {
                const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                return (
                  <TouchableOpacity
                    key={option.label}
                    style={[styles.voteOption, option.voted && styles.voteOptionVoted]}
                    onPress={() => {
                      voteOnPoll(eventId, poll.id, option.label);
                      logPollVoted(eventId, poll.id);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.voteBar, { width: `${pct}%` as any }]} />
                    <Text style={styles.voteLabel}>{option.label}</Text>
                    <Text style={styles.votePct}>{pct}%</Text>
                  </TouchableOpacity>
                );
              })}
              <Text style={styles.voteFooter}>
                Oddanych głosów: {totalVotes}
              </Text>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.counterProposalBtn}
          onPress={() => navigation.navigate('CounterProposal', { eventId })}
          activeOpacity={0.8}
        >
          <Text style={styles.counterProposalText}>+ Dodaj kontrpropozycję</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    paddingHorizontal: 4,
    paddingVertical: 8,
    gap: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeTabItem: { backgroundColor: Colors.navbarFocus },
  tabLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
    textAlign: 'center',
  },
  activeTabLabel: { fontFamily: Fonts.bold },
  content: { padding: 24, gap: 20, paddingBottom: 40 },
  pollCard: {
    backgroundColor: 'rgba(0,82,209,0.17)',
    borderWidth: 2,
    borderColor: Colors.actualMainBlue,
    borderRadius: 4,
    padding: 16,
    gap: 12,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  pollHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pollTitle: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
    flex: 1,
  },
  statusBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: Colors.lightGray,
  },
  activeBadge: { backgroundColor: 'rgba(0,82,209,0.17)' },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xs,
    color: Colors.mainGraySecondary,
  },
  activeText: { color: Colors.actualMainBlue },
  voteOption: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  voteOptionVoted: {
    borderColor: Colors.actualMainBlue,
  },
  voteBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.navbarFocus,
  },
  voteLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
    position: 'absolute',
    left: 12,
  },
  votePct: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
    position: 'absolute',
    right: 12,
  },
  counterProposalBtn: {
    borderWidth: 2,
    borderColor: Colors.actualMainBlue,
    borderRadius: 8,
    borderStyle: 'dashed',
    paddingVertical: 16,
    alignItems: 'center',
  },
  counterProposalText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.actualMainBlue,
  },
  voteFooter: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.mainGraySecondary,
    textAlign: 'right',
    marginTop: 2,
  },
});

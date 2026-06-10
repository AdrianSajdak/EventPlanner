import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Navbar } from '../../components/common/Navbar';
import { AppIcon } from '../../components/common/AppIcon';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const planningHero = require('../../../assets/images/planning-hero.png');
const catanImage = require('../../../assets/images/game-catan.png');
const dixitImage = require('../../../assets/images/game-dixit.png');

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'Planning'>;
  route: RouteProp<EventsStackParamList, 'Planning'>;
};

type PollOption = {
  label: string;
  percent: number;
};

type PollCardProps = {
  id: string;
  title: string;
  icon: 'clock' | 'food';
  options: PollOption[];
  selectedOption?: string;
  onSelect: (pollId: string, optionLabel: string) => void;
};

type GameSuggestionProps = {
  image: number;
  category: string;
  title: string;
};

const TabBar = ({
  navigation,
  eventId,
  isOrganizer,
}: {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'Planning'>;
  eventId: string;
  isOrganizer?: boolean;
}) => (
  <View style={styles.tabBar}>
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => {
        if (isOrganizer) {
          navigation.navigate('EventDetailsOrganizer', { eventId });
          return;
        }
        navigation.navigate('EventDetails', { eventId, isOrganizer: false });
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.tabLabel}>Info</Text>
    </TouchableOpacity>
    <View style={[styles.tabItem, styles.activeTabItem]}>
      <Text style={[styles.tabLabel, styles.activeTabLabel]}>Planowanie</Text>
    </View>
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => navigation.navigate('Chat', { eventId, isOrganizer })}
      activeOpacity={0.7}
    >
      <Text style={styles.tabLabel}>Czat</Text>
    </TouchableOpacity>
  </View>
);

const PollCard = ({ id, title, icon, options, selectedOption, onSelect }: PollCardProps) => (
  <View style={styles.pollCard}>
    <View style={styles.pollHeader}>
      <View style={styles.pollIconBox}>
        <AppIcon name={icon} size={25} color={Colors.actualMainBlue} />
      </View>
      <View style={styles.pollTitleBox}>
        <Text style={styles.pollTitle}>{title}</Text>
        <Text style={styles.pollSubtitle}>Zamyka się za 3 godziny</Text>
      </View>
    </View>
    <View style={styles.pollOptions}>
      {options.map((option) => {
        const selected = selectedOption === option.label;
        return (
          <TouchableOpacity
            key={option.label}
            style={styles.pollOption}
            onPress={() => onSelect(id, option.label)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.pollFill,
                selected && styles.pollFillSelected,
                { width: `${option.percent}%` as any },
              ]}
            />
            <Text style={[styles.pollOptionLabel, selected && styles.pollOptionLabelSelected]}>
              {option.label}
            </Text>
            <Text style={styles.pollPercent}>{option.percent}%</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const GameSuggestion = ({ image, category, title }: GameSuggestionProps) => (
  <View style={styles.gameCard}>
    <Image source={image} style={styles.gameImage} />
    <Text style={styles.gameCategory}>{category}</Text>
    <Text style={styles.gameTitle}>{title}</Text>
  </View>
);

export default function PlanningScreen({ navigation, route }: Props) {
  const { eventId } = route.params;
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const selectPollOption = (pollId: string, optionLabel: string) => {
    setSelectedOptions((current) => ({ ...current, [pollId]: optionLabel }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar
        title="Wieczór z planszówkami"
        showBack
        onBack={() => navigation.goBack()}
      />
      <TabBar
        navigation={navigation}
        eventId={eventId}
        isOrganizer={route.params.isOrganizer}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={planningHero} style={styles.hero} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Głosowanie</Text>
          <Text style={styles.sectionMeta}>2 aktywne ankiety</Text>
        </View>

        <PollCard
          id="timing"
          title="Kiedy zaczynamy?"
          icon="clock"
          selectedOption={selectedOptions.timing}
          onSelect={selectPollOption}
          options={[
            { label: '18:00', percent: 65 },
            { label: '19:30', percent: 35 },
          ]}
        />

        <PollCard
          id="food"
          title="Gdzie zamawiamy jedzenie?"
          icon="food"
          selectedOption={selectedOptions.food}
          onSelect={selectPollOption}
          options={[
            { label: 'Pizza', percent: 65 },
            { label: 'Sushi', percent: 35 },
          ]}
        />

        <TouchableOpacity
          style={styles.counterProposal}
          onPress={() => navigation.navigate('CounterProposal', { eventId })}
          activeOpacity={0.75}
        >
          <AppIcon name="plusBlue" size={20} color={Colors.actualMainBlue} />
          <Text style={styles.counterProposalText}>ZGŁOŚ KONTRPROPOZYCJĘ</Text>
        </TouchableOpacity>

        <Text style={styles.suggestionsTitle}>Sugestie gier</Text>
        <View style={styles.gamesRow}>
          <GameSuggestion image={catanImage} category="STRATEGIA" title="Catan: Osadnicy" />
          <GameSuggestion image={dixitImage} category="IMPREZOWE" title="Dixit: Odyseja" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  tabBar: {
    marginHorizontal: 28,
    marginTop: 24,
    marginBottom: 30,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  tabItem: {
    flex: 1,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  activeTabItem: {
    backgroundColor: '#DCE4EF',
  },
  tabLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.secondaryDarkBlue,
    lineHeight: 19,
  },
  activeTabLabel: {
    fontFamily: Fonts.bold,
  },
  content: {
    paddingHorizontal: 28,
    paddingBottom: 120,
  },
  hero: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    lineHeight: 31,
  },
  sectionMeta: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.graySecondary,
    lineHeight: 22,
  },
  pollCard: {
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
    marginBottom: 24,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
  },
  pollHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 26,
  },
  pollIconBox: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: '#D6E6FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pollTitleBox: {
    flex: 1,
  },
  pollTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.black,
    lineHeight: 24,
  },
  pollSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.mainGraySecondary,
    lineHeight: 16,
  },
  pollOptions: {
    gap: 13,
  },
  pollOption: {
    minHeight: 56,
    borderRadius: 10,
    backgroundColor: '#E8EEF8',
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pollFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#D2DCEB',
  },
  pollFillSelected: {
    backgroundColor: Colors.actualMainBlue,
  },
  pollOptionLabel: {
    flex: 1,
    paddingLeft: 16,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.graySecondary,
    zIndex: 1,
  },
  pollOptionLabelSelected: {
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  pollPercent: {
    paddingRight: 17,
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.graySecondary,
    zIndex: 1,
  },
  counterProposal: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 55,
  },
  counterProposalText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.actualMainBlue,
    lineHeight: 20,
  },
  suggestionsTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.black,
    lineHeight: 27,
    marginBottom: 18,
  },
  gamesRow: {
    flexDirection: 'row',
    gap: 17,
  },
  gameCard: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 5,
    backgroundColor: Colors.offWhite,
    padding: 14,
  },
  gameImage: {
    width: '100%',
    height: 93,
    borderRadius: 3,
    marginBottom: 14,
  },
  gameCategory: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.actualMainBlue,
    lineHeight: 16,
    letterSpacing: 0.7,
    marginBottom: 8,
  },
  gameTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.black,
    lineHeight: 20,
  },
});

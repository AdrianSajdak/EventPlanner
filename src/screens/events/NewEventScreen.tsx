import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, Modal, FlatList, Switch,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { Navbar } from '../../components/common/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { EventsStackParamList } from '../../navigation/EventsNavigator';
import { INVITABLE_FRIENDS } from '../../data/mockFriends';
import { useEvents } from '../../context/EventsContext';
import { useFriendLists } from '../../context/FriendsContext';
import { logEventCreated } from '../../services/analytics';

type Props = {
  navigation: NativeStackNavigationProp<EventsStackParamList, 'NewEvent'>;
};

type Step = 1 | 2 | 3;

const StepIndicator = ({ current }: { current: Step }) => (
  <View style={styles.stepRow}>
    {([1, 2, 3] as Step[]).map((s) => (
      <View key={s} style={styles.stepItemRow}>
        <View style={[styles.stepCircle, current >= s && styles.stepCircleActive]}>
          <Text style={[styles.stepNum, current >= s && styles.stepNumActive]}>{s}</Text>
        </View>
        {s < 3 && <View style={[styles.stepLine, current > s && styles.stepLineActive]} />}
      </View>
    ))}
  </View>
);

export default function NewEventScreen({ navigation }: Props) {
  const { addHostedEvent } = useEvents();
  const { lists } = useFriendLists();
  const [step, setStep] = useState<Step>(1);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [draftIds, setDraftIds] = useState<string[]>([]);

  const [voteOnTime, setVoteOnTime] = useState(false);
  const [voteOnPlace, setVoteOnPlace] = useState(false);
  const [counterProposals, setCounterProposals] = useState(false);

  const stepTitles = {
    1: 'Podstawowe Informacje',
    2: 'Uczestnicy',
    3: 'Opcje Planowania',
  };

  const selectedParticipants = useMemo(
    () => INVITABLE_FRIENDS.filter((f) => participantIds.includes(f.id)),
    [participantIds]
  );

  const openPicker = () => {
    setDraftIds(participantIds);
    setPickerVisible(true);
  };

  const toggleDraft = (id: string) =>
    setDraftIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const isListFullySelected = (friendIds: string[]) =>
    friendIds.length > 0 && friendIds.every((id) => draftIds.includes(id));

  const toggleList = (friendIds: string[]) => {
    setDraftIds((prev) => {
      const fullySelected = friendIds.every((id) => prev.includes(id));
      if (fullySelected) {
        return prev.filter((id) => !friendIds.includes(id));
      }
      const merged = [...prev];
      friendIds.forEach((id) => {
        if (!merged.includes(id)) merged.push(id);
      });
      return merged;
    });
  };

  const confirmPicker = () => {
    setParticipantIds(draftIds);
    setPickerVisible(false);
  };

  const removeParticipant = (id: string) =>
    setParticipantIds((prev) => prev.filter((x) => x !== id));

  const handleCreate = () => {
    addHostedEvent({
      title,
      date,
      time,
      location,
      description,
      participantsCount: participantIds.length,
    });
    logEventCreated({ participants_count: participantIds.length });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safe}>
        <Navbar
          title="Nowe Wyjście"
          showBack
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <StepIndicator current={step} />

          <View style={styles.card}>
            <Text style={styles.stepTitle}>{stepTitles[step]}</Text>

            {step === 1 && (
              <View style={styles.form}>
                <Input
                  label="Nazwa wydarzenia"
                  value={title}
                  onChangeText={setTitle}
                  placeholder="np. Wieczór z planszówkami"
                />
                <Input
                  label="Data"
                  value={date}
                  onChangeText={setDate}
                  placeholder="DD.MM.RRRR"
                />
                <Input
                  label="Godzina"
                  value={time}
                  onChangeText={setTime}
                  placeholder="HH:MM"
                />
                <Input
                  label="Lokalizacja"
                  value={location}
                  onChangeText={setLocation}
                  placeholder="np. Cybermachina, Kraków"
                />
                <Input
                  label="Opis (opcjonalnie)"
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Krótki opis wydarzenia..."
                  multiline
                />
              </View>
            )}

            {step === 2 && (
              <View style={styles.form}>
                <Text style={styles.helperText}>
                  Dodaj znajomych, których chcesz zaprosić na wydarzenie
                </Text>

                {selectedParticipants.length > 0 && (
                  <View style={styles.selectedList}>
                    <Text style={styles.selectedTitle}>
                      Wybrani uczestnicy ({selectedParticipants.length})
                    </Text>
                    {selectedParticipants.map((friend) => (
                      <View key={friend.id} style={styles.selectedRow}>
                        <View style={styles.smallAvatar}>
                          <Text style={styles.smallAvatarInitial}>{friend.name[0]}</Text>
                        </View>
                        <Text style={styles.selectedName}>{friend.name}</Text>
                        <TouchableOpacity
                          onPress={() => removeParticipant(friend.id)}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Text style={styles.removeIcon}>×</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={styles.addFriendBtn}
                  onPress={openPicker}
                  activeOpacity={0.8}
                >
                  <Text style={styles.addFriendText}>+ Dodaj uczestników</Text>
                </TouchableOpacity>
              </View>
            )}

            {step === 3 && (
              <View style={styles.form}>
                <Text style={styles.helperText}>
                  Ustaw opcje głosowania i planowania dla tego wydarzenia
                </Text>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>Głosowanie na godzinę</Text>
                  <Switch
                    value={voteOnTime}
                    onValueChange={setVoteOnTime}
                    trackColor={{ false: Colors.lightGray, true: Colors.actualMainBlue }}
                    thumbColor={Colors.white}
                  />
                </View>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>Głosowanie na miejsce</Text>
                  <Switch
                    value={voteOnPlace}
                    onValueChange={setVoteOnPlace}
                    trackColor={{ false: Colors.lightGray, true: Colors.actualMainBlue }}
                    thumbColor={Colors.white}
                  />
                </View>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>Kontrpropozycje</Text>
                  <Switch
                    value={counterProposals}
                    onValueChange={setCounterProposals}
                    trackColor={{ false: Colors.lightGray, true: Colors.actualMainBlue }}
                    thumbColor={Colors.white}
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.navButtons}>
            {step > 1 && (
              <Button
                label="Wstecz"
                variant="secondary"
                onPress={() => setStep((s) => (s - 1) as Step)}
                style={styles.navBtn}
              />
            )}
            {step < 3 ? (
              <Button
                label="Dalej →"
                variant="primary"
                onPress={() => setStep((s) => (s + 1) as Step)}
                style={styles.navBtn}
              />
            ) : (
              <Button
                label="Utwórz wydarzenie"
                variant="primary"
                onPress={handleCreate}
                style={styles.navBtn}
              />
            )}
          </View>
        </ScrollView>

        <Modal
          visible={pickerVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setPickerVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Wybierz uczestników</Text>

              {lists.length > 0 && (
                <View style={styles.listsBlock}>
                  <Text style={styles.listsLabel}>Z listy</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipsRow}
                  >
                    {lists.map((l) => {
                      const active = isListFullySelected(l.friendIds);
                      return (
                        <TouchableOpacity
                          key={l.id}
                          style={[styles.listChip, active && styles.listChipActive]}
                          onPress={() => toggleList(l.friendIds)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[styles.listChipText, active && styles.listChipTextActive]}
                          >
                            {active ? '✓ ' : ''}
                            {l.name} ({l.friendIds.length})
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              <FlatList
                data={INVITABLE_FRIENDS}
                keyExtractor={(item) => item.id}
                style={styles.modalListFlex}
                contentContainerStyle={styles.modalList}
                showsVerticalScrollIndicator
                renderItem={({ item }) => {
                  const checked = draftIds.includes(item.id);
                  return (
                    <TouchableOpacity
                      style={styles.friendPickerRow}
                      onPress={() => toggleDraft(item.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.smallAvatar}>
                        <Text style={styles.smallAvatarInitial}>{item.name[0]}</Text>
                      </View>
                      <View style={styles.friendPickerInfo}>
                        <Text style={styles.selectedName}>{item.name}</Text>
                        <Text style={styles.friendPickerMeta}>
                          {item.mutualEvents} wspólnych wydarzeń
                        </Text>
                      </View>
                      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                        {checked && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
              <View style={styles.modalActions}>
                <Button
                  label="Anuluj"
                  variant="secondary"
                  onPress={() => setPickerVisible(false)}
                  style={styles.navBtn}
                />
                <Button
                  label={`Zatwierdź (${draftIds.length})`}
                  variant="primary"
                  onPress={confirmPicker}
                  style={styles.navBtn}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.lightModeMainTheme },
  content: { padding: 24, gap: 24, paddingBottom: 40 },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightModeMainTheme,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: Colors.secondaryDarkBlue,
  },
  stepNum: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.secondaryDarkBlue,
  },
  stepNumActive: {
    color: Colors.white,
  },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: Colors.secondaryDarkBlue,
  },
  card: {
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    padding: 24,
    gap: 20,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
    lineHeight: 28,
  },
  form: { gap: 16 },
  helperText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.base,
    color: Colors.mainGraySecondary,
    lineHeight: 20,
  },
  addFriendBtn: {
    borderWidth: 2,
    borderColor: Colors.actualMainBlue,
    borderRadius: 8,
    borderStyle: 'dashed',
    paddingVertical: 16,
    alignItems: 'center',
  },
  addFriendText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.actualMainBlue,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  optionLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.black,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  navBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  selectedList: {
    gap: 8,
    paddingVertical: 8,
  },
  selectedTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    color: Colors.actualMainBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.lightModeMainTheme,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedName: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.base,
    color: Colors.black,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.actualMainBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallAvatarInitial: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.base,
    color: Colors.white,
  },
  removeIcon: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: Colors.mainGraySecondary,
    paddingHorizontal: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.offWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    height: '80%',
  },
  modalListFlex: {
    flex: 1,
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    color: Colors.secondaryDarkBlue,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalList: {
    gap: 8,
    paddingBottom: 16,
  },
  friendPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.lightModeMainTheme,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  friendPickerInfo: {
    flex: 1,
    gap: 2,
  },
  friendPickerMeta: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.actualMainBlue,
    borderColor: Colors.actualMainBlue,
  },
  checkmark: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.white,
    lineHeight: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  listsBlock: {
    gap: 6,
    marginBottom: 12,
  },
  listsLabel: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    color: Colors.actualMainBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipsRow: {
    gap: 8,
    paddingVertical: 2,
    paddingRight: 8,
  },
  listChip: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.actualMainBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  listChipActive: {
    backgroundColor: Colors.actualMainBlue,
  },
  listChipText: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.actualMainBlue,
  },
  listChipTextActive: {
    color: Colors.white,
  },
});

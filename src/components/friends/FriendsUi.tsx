import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppIcon } from '../common/AppIcon';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const listThumb = require('../../../assets/images/friend-list-thumb.png');

type SearchBoxProps = {
  value: string;
  onChangeText: (value: string) => void;
};

type SelectableRowProps = {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onPress?: () => void;
  image?: ImageSourcePropType;
};

export const SearchBox = ({ value, onChangeText }: SearchBoxProps) => (
  <View style={styles.searchBox}>
    <View style={styles.searchIcon}>
      <View style={styles.searchCircle} />
      <View style={styles.searchHandle} />
    </View>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Szukaj znajomych..."
      placeholderTextColor={Colors.mainGraySecondary}
      style={styles.searchInput}
      autoCorrect={false}
      spellCheck={false}
    />
  </View>
);

export const Checkbox = ({ selected }: { selected?: boolean }) => (
  <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
    {selected ? <Text style={styles.checkmark}>✓</Text> : null}
  </View>
);

export const SelectableRow = ({
  title,
  subtitle,
  selected,
  onPress,
  image,
}: SelectableRowProps) => (
  <TouchableOpacity
    style={[styles.row, selected && styles.rowSelected]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <Image source={image ?? listThumb} style={styles.rowImage} />
    <View style={styles.rowText}>
      <Text style={styles.rowTitle}>{title}</Text>
      {subtitle ? <Text style={styles.rowSubtitle} numberOfLines={1}>{subtitle}</Text> : null}
    </View>
    <Checkbox selected={selected} />
  </TouchableOpacity>
);

export const PrimaryWideButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.primaryButton} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.primaryButtonText}>{label}</Text>
    <AppIcon name="arrowContinue" size={26} color={Colors.white} />
  </TouchableOpacity>
);

export const styles = StyleSheet.create({
  searchBox: {
    minHeight: 56,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 6,
    backgroundColor: Colors.offWhite,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 15,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 12,
  },
  searchIcon: {
    width: 22,
    height: 22,
    position: 'relative',
  },
  searchCircle: {
    position: 'absolute',
    left: 1,
    top: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
  },
  searchHandle: {
    position: 'absolute',
    width: 10,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.secondaryDarkBlue,
    right: 2,
    bottom: 4,
    transform: [{ rotate: '45deg' }],
  },
  row: {
    minHeight: 63,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 4,
    backgroundColor: Colors.offWhite,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
    elevation: 5,
  },
  rowSelected: {
    backgroundColor: Colors.lightGray,
  },
  rowImage: {
    width: 34,
    height: 34,
    borderRadius: 4,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.secondaryDarkBlue,
    lineHeight: 20,
  },
  rowSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.mainGraySecondary,
    lineHeight: 16,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: Colors.actualMainBlue,
    backgroundColor: Colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.actualMainBlue,
  },
  checkmark: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.white,
    lineHeight: 18,
  },
  primaryButton: {
    height: 62,
    borderRadius: 7,
    backgroundColor: Colors.purpleAccent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.85,
    shadowRadius: 3,
    elevation: 7,
  },
  primaryButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.white,
    lineHeight: 24,
  },
});

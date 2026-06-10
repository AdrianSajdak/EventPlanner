import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppIcon, AppIconName } from '../common/AppIcon';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

type SettingsFieldProps = TextInputProps & {
  label: string;
  icon: AppIconName;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
};

export const SettingsField = ({
  label,
  icon,
  isPassword,
  containerStyle,
  ...props
}: SettingsFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.field, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <AppIcon name={icon} size={21} color={Colors.secondaryDarkBlue} />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.graySecondary}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword((current) => !current)}
            activeOpacity={0.7}
          >
            <AppIcon
              name="eye"
              size={20}
              color={showPassword ? Colors.actualMainBlue : Colors.secondaryDarkBlue}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export const SettingsSubmitButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.submitButton} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.submitText}>{label}</Text>
    <AppIcon name="arrowContinue" size={25} color={Colors.white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  field: {
    width: '100%',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.secondaryDarkBlue,
    lineHeight: 22,
    marginBottom: 10,
  },
  inputBox: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 6,
    paddingLeft: 16,
    paddingRight: 12,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 4,
    fontFamily: Fonts.regular,
    fontSize: 17,
    color: Colors.graySecondary,
  },
  eyeButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    height: 62,
    borderRadius: 7,
    backgroundColor: Colors.purpleAccent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: Colors.graySecondary,
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.85,
    shadowRadius: 3,
    elevation: 7,
  },
  submitText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.white,
    lineHeight: 24,
  },
});

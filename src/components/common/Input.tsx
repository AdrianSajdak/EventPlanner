import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts, FontSizes } from '../../theme/typography';
import { AppIcon } from './AppIcon';

interface InputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  rightIcon,
  containerStyle,
  isPassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.leftIcon}>{icon}</View>}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : undefined]}
          placeholderTextColor={Colors.mainGraySecondary}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setShowPassword((v) => !v)}
          >
            <AppIcon
              name="eye"
              size={18}
              color={showPassword ? Colors.actualMainBlue : Colors.secondaryDarkBlue}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !isPassword && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Colors.mainGraySecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.navbarFocus,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkBlue,
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 52,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.graySecondary,
  },
  inputWithIcon: {
    paddingLeft: 48,
  },
  leftIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  rightIcon: {
    paddingHorizontal: 16,
    minWidth: 56,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
});

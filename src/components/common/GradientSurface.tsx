import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';

type GradientSurfaceProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fullScreenWeb?: boolean;
};

const gradientCss =
  'linear-gradient(90deg, rgba(25, 23, 77, 0.30) 0%, rgba(87, 19, 119, 0.30) 25%, rgba(153, 98, 179, 0.30) 75%, rgba(0, 82, 209, 0.30) 100%), #19174D';

const webGradientStyle =
  Platform.OS === 'web'
    ? ({
        backgroundColor: Colors.secondaryDarkBlue,
        background: gradientCss,
        backgroundImage: gradientCss,
      } as ViewStyle & { background: string; backgroundImage: string })
    : null;

const webFullScreenStyle =
  Platform.OS === 'web'
    ? ({
        minHeight: '100vh',
        width: '100vw',
      } as unknown as ViewStyle)
    : null;

export const GradientSurface = ({
  children,
  style,
  fullScreenWeb,
}: GradientSurfaceProps) => (
  <View style={[styles.surface, webGradientStyle, fullScreenWeb && webFullScreenStyle, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  surface: {
    backgroundColor: Colors.secondaryDarkBlue,
    overflow: 'hidden',
  },
});

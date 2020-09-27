import { Platform } from 'react-native';

interface FontType {
  fontFamily?: string;
  fontWeight?: any;
}

export interface Fonts {
  Thin?: FontType;
  Bold?: FontType;
  Regular?: FontType;
  Light?: FontType;
  Medium?: FontType;
  SemiBold?: FontType;
}

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */

const typography = {
  primary: Platform.select<Fonts>({
    ios: {
      Medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      Regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      SemiBold: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      Bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      Light: {
        fontFamily: 'System',
        fontWeight: '300',
      },
      Thin: {
        fontFamily: 'System',
        fontWeight: '200',
      },
    },
    android: {
      Medium: {
        fontFamily: 'Roboto',
        fontWeight: '500',
      },
      Regular: {
        fontFamily: 'Roboto',
        fontWeight: '400',
      },
      SemiBold: {
        fontFamily: 'Roboto',
        fontWeight: '600',
      },
      Bold: {
        fontFamily: 'Roboto',
        fontWeight: '700',
      },
      Light: {
        fontFamily: 'Roboto',
        fontWeight: '300',
      },
      Thin: {
        fontFamily: 'Light',
        fontWeight: '200',
      },
    },
  }),
  secondary: Platform.select<Fonts>({
    ios: {},
    android: {},
  }),
};

export default typography;

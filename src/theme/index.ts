import borderRadius from './radius';
import { spacing } from './spacing';
import { createTheme } from '@shopify/restyle';
import colors from './colors';
import typography from './typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const theme = createTheme({
  settings: {
    isRtl: false,
    icon: MaterialCommunityIcons,
  },

  typography,
  colors: colors,
  cardVariants: {
    surface: {
      backgroundColor: 'surface',
    },
    screen: {
      flex: 1,
      backgroundColor: 'background',
    },
  },
  textVariants: {
    primary: {
      color: 'text',
    },
    secondary: {
      color: 'text',
    },
    helperText: {
      fontSize: 12,
      lineHeight: 16,
      color: 'text',
    },
    label: {
      fontSize: 14,
      lineHeight: 16,
      color: 'label',
    },
    placeholder: {
      fontSize: 14,
      lineHeight: 16,
      color: 'placeholder',
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      marginVertical: 2,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 20,
      lineHeight: 30,
      marginVertical: 'xxs',
      letterSpacing: 0.15,
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 20,
      marginVertical: 2,
      letterSpacing: 0.25,
    },
    headline: {
      fontSize: 24,
      lineHeight: 32,
      marginVertical: 2,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      lineHeight: 20,
      marginVertical: 2,
      letterSpacing: 0.4,
    },
  },
  buttonVariants: {
    'filter-dropdown': {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      paddingVertical: 'xs',
      paddingHorizontal: 'm',
      justifyContent: 'flex-start',
      placeholderProps: {
        color: 'white',
        textAlign: 'left',
        numberOfLines: 1,
        adjustsFontSizeToFit: true,
        fontSize: 12,
        marginRight: 'xs',
      },
    },

    'datepicker': {
      borderBottomWidth: 1,
      borderColor: 'border',
      width: '100%',
      height: 40,
      labelProps: {
        color: 'label',
        onVisible: {
          color: 'primary',
        },
        onError: {
          color: 'error',
        },
      },
    },
    'select': {
      borderBottomWidth: 1,
      borderColor: 'border',
      width: '100%',
      height: 40,
      labelProps: {
        color: 'label',
        onVisible: {
          color: 'primary',
        },
        onError: {
          color: 'error',
        },
      },
      onError: {
        borderColor: 'error',
      },
    },

    'dropdown': {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      paddingVertical: 's',
      paddingHorizontal: 'm',
      placeholderProps: {
        color: 'placeholder',
        marginRight: 'xs',
      },
    },

    'contained': {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
      elevation: 6,
      borderRadius: 'l',
      backgroundColor: 'primary',
      labelProps: {
        color: 'white',
      },
    },
    'outlined': {
      flex: 1,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
      labelProps: {
        color: 'primary',
      },
    },

    'text': {
      alignSelf: 'flex-start',
      padding: 'none',
      margin: 'none',
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      labelProps: {
        color: 'primary',
      },
    },
  },
  textInputVariants: {
    primary: {
      flex: 1,
      height: 44,
      containerProps: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'border',
        onFocused: {
          borderColor: 'primary',
        },
        onError: {
          borderColor: 'error',
        },
      },
      labelProps: {
        color: 'label',
        onFocused: {
          color: 'primary',
        },
        onError: {
          color: 'error',
        },
      },
    },
    outlined: {
      height: 40,
      rootProps: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'border',
        onFocused: {
          borderColor: 'primary',
        },
        onError: {
          borderColor: 'error',
        },
      },
      labelProps: {
        color: 'label',
        onFocused: {
          color: 'primary',
        },
        onError: {
          color: 'error',
        },
      },
    },
    success: {},
    error: {},
  },
  borderRadii: borderRadius,
  spacing: spacing,
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  gradientVariants: {},
});

export type Theme = typeof theme;
export default theme;

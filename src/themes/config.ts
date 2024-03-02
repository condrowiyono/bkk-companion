import {Colors, Typography, ThemeManager} from 'react-native-ui-lib';

export const configureDesignSystem = (): void => {
  Colors.loadColors({
    $backgroundPrimaryHeavy: '#357AF5',
    $textPrimary: '#357AF5',
    $textPrimaryLight: '#4dabf7',
    $outlinePrimary: '#357AF5',
    $bgDangerLight: '#f8d7da',
    $bgPrimaryLight: '#cce5ff',
    $bgWarningLight: '#fff3cd',
    text: '#357AF5',
    bgSuccessLight: '#d4edda',
    primary: '#357AF5',
  });

  Typography.loadTypographies({
    section: {fontSize: 26, fontWeight: '600'},
  });

  ThemeManager.setComponentTheme('Card', {
    padding: 12,
    marginBottom: 12,
    style: {
      shadowColor: Colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  });
  ThemeManager.setComponentTheme('TextField', {
    fieldStyle: {
      borderBottomWidth: 1,
      borderColor: Colors.grey40,
    },
  });
};


import { StyleSheet } from 'react-native';
import { useThemeColors } from '../../../styles/colors';

export const useListStyles = () => {
  const colors = useThemeColors();
  return StyleSheet.create({
    listSection: {
      borderRadius: 24,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 18,
      padding: 12,
      elevation: 2,
    },
    leftIcon: {
      marginRight: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightIcon: {
      marginLeft: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightButton: {
      minWidth: 'auto',
      paddingHorizontal: 8,
      borderRadius: 12
    },
    icon: {
      fontSize: 24,
      color: colors.primary,
      opacity: 0.85,
    },
    content: {
      flex: 1,
      flexShrink: 1,
      gap: 6,
      justifyContent: 'center',
    },
    divider: {
      height: 1,
      backgroundColor: colors.outline,
      marginVertical: 2,
      borderRadius: 1,
      opacity: 0.7,
    },
    profilePicture: {
      borderRadius: 999,
    },
    touchableContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 18,
    },
  });
};

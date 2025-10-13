import { TextStyle, ViewStyle } from 'react-native';

export interface StyleConfig {
  // Truncate Style configuration for text
  truncateStyle: {
    numberOfLines: number;
    ellipsizeMode: 'tail' | 'head' | 'middle' | 'clip';
  };
  // Padding and gap values
  padding: number;
  gap: number;
  // Layout configurations
  paragraphLayout: ViewStyle;
  pageLayout: ViewStyle;
  fouterLayout: ViewStyle;
  contentLayout: ViewStyle;
  contentLayoutRow: ViewStyle;
  // Text style configurations
  headerTitle: TextStyle;
  sectionTitle: TextStyle;
  sectionSubtitle: TextStyle;
  sectionListItemTitle: TextStyle;
  paragraphText: TextStyle;
  tabLabel: TextStyle;
  inputLabel: TextStyle;
  buttonStyle: TextStyle;
  // Additional configuration values
  iconTitleSize: number;
}

// Default configuration object with all the parameters
let styleConfig: StyleConfig = {
  truncateStyle: {
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  padding: 20, // più arioso
  gap: 14, // spacing moderno
  paragraphLayout: {
    paddingHorizontal: 20,
  },
  pageLayout: {
    flexDirection: 'column',
    gap: 14,
    flexGrow: 1,
  },
  fouterLayout: {
    flexDirection: 'column',
    gap: 14,
  },
  contentLayout: {
    flexDirection: 'column',
    gap: 14,
  },
  contentLayoutRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: '900',
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.2,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#666',
  },
  sectionListItemTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    color: '#444',
  },
  paragraphText: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: '#444',
    lineHeight: 26,
  },
  tabLabel: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#555',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: '#222',
  },
  buttonStyle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    borderRadius: 24,
    letterSpacing: 0.2,
    color: '#fff',
  },
  iconTitleSize: 26,
};

/**
 * Allows the user to override the default style configuration during app startup.
 * This function merges the current configuration with the provided partial configuration.
 *
 * @param newConfig A partial configuration object containing the style properties to override.
 */
export function setStyleConfig(newConfig: Partial<StyleConfig>): void {
  styleConfig = {
    ...styleConfig,
    ...newConfig,
    // Override nested objects if provided. If a nested configuration is provided,
    // it will completely replace the old nested configuration.
    truncateStyle: newConfig.truncateStyle ?? styleConfig.truncateStyle,
    paragraphLayout: newConfig.paragraphLayout ?? styleConfig.paragraphLayout,
    pageLayout: newConfig.pageLayout ?? styleConfig.pageLayout,
    fouterLayout: newConfig.fouterLayout ?? styleConfig.fouterLayout,
    contentLayout: newConfig.contentLayout ?? styleConfig.contentLayout,
    contentLayoutRow:
      newConfig.contentLayoutRow ?? styleConfig.contentLayoutRow,
    headerTitle: newConfig.headerTitle ?? styleConfig.headerTitle,
    sectionTitle: newConfig.sectionTitle ?? styleConfig.sectionTitle,
    sectionSubtitle: newConfig.sectionSubtitle ?? styleConfig.sectionSubtitle,
    sectionListItemTitle:
      newConfig.sectionListItemTitle ?? styleConfig.sectionListItemTitle,
    paragraphText: newConfig.paragraphText ?? styleConfig.paragraphText,
    tabLabel: newConfig.tabLabel ?? styleConfig.tabLabel,
    inputLabel: newConfig.inputLabel ?? styleConfig.inputLabel,
    buttonStyle: newConfig.buttonStyle ?? styleConfig.buttonStyle,
  };
}

/**
 * Returns the current style configuration.
 */
export function getStyleConfig(): StyleConfig {
  return styleConfig;
}

export const {
  buttonStyle,
  contentLayout,
  contentLayoutRow,
  fouterLayout,
  gap,
  headerTitle,
  iconTitleSize,
  inputLabel,
  padding,
  pageLayout,
  paragraphLayout,
  paragraphText,
  sectionListItemTitle,
  sectionSubtitle,
  sectionTitle,
  tabLabel,
  truncateStyle,
} = styleConfig;

import { TextStyle, ViewStyle } from 'react-native';
export interface StyleConfig {
    truncateStyle: {
        numberOfLines: number;
        ellipsizeMode: 'tail' | 'head' | 'middle' | 'clip';
    };
    padding: number;
    gap: number;
    paragraphLayout: ViewStyle;
    pageLayout: ViewStyle;
    fouterLayout: ViewStyle;
    contentLayout: ViewStyle;
    contentLayoutRow: ViewStyle;
    headerTitle: TextStyle;
    sectionTitle: TextStyle;
    sectionSubtitle: TextStyle;
    sectionListItemTitle: TextStyle;
    paragraphText: TextStyle;
    tabLabel: TextStyle;
    inputLabel: TextStyle;
    buttonStyle: TextStyle;
    iconTitleSize: number;
}
/**
 * Allows the user to override the default style configuration during app startup.
 * This function merges the current configuration with the provided partial configuration.
 *
 * @param newConfig A partial configuration object containing the style properties to override.
 */
export declare function setStyleConfig(newConfig: Partial<StyleConfig>): void;
/**
 * Returns the current style configuration.
 */
export declare function getStyleConfig(): StyleConfig;
export declare const buttonStyle: TextStyle, contentLayout: ViewStyle, contentLayoutRow: ViewStyle, fouterLayout: ViewStyle, gap: number, headerTitle: TextStyle, iconTitleSize: number, inputLabel: TextStyle, padding: number, pageLayout: ViewStyle, paragraphLayout: ViewStyle, paragraphText: TextStyle, sectionListItemTitle: TextStyle, sectionSubtitle: TextStyle, sectionTitle: TextStyle, tabLabel: TextStyle, truncateStyle: {
    numberOfLines: number;
    ellipsizeMode: "tail" | "head" | "middle" | "clip";
};

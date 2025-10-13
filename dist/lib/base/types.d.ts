import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export type SocialPlatform = 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'linkedin' | 'youtube' | 'custom';
export interface SocialLinkProps {
    platform: SocialPlatform;
    username?: string;
    url?: string;
    text?: string;
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    ns?: string;
    onError?: (error: Error) => void;
    iconOnly?: boolean;
    iconSize?: number;
    iconColor?: string;
}

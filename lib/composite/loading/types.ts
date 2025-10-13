import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface LoadingProps {
  visible?: boolean;
  text?: string;
  overlay?: boolean;
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
  ns?: string;
}

export {type LoadingProps}
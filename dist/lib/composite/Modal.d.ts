import { ComponentProps } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button } from "../base";
type ModalType = "default" | "actionSheet";
interface BaseModalProps {
    visible: boolean;
    onClose?: () => void;
    title?: string;
    ns?: string;
    containerStyle?: StyleProp<ViewStyle>;
    modalStyle?: StyleProp<ViewStyle>;
    type?: ModalType;
    /**
     * Apply a little extra bottom padding on iOS (safe area feel) for action sheets.
     * Disabled by default to avoid adding a dependency on SafeArea libraries.
     */
    usePseudoSafeArea?: boolean;
}
interface DefaultModalProps extends BaseModalProps {
    type?: "default";
    children: React.JSX.Element;
    showCloseButton?: boolean;
    closeOnBackdropPress?: boolean;
}
interface ActionSheetModalProps extends BaseModalProps {
    type: "actionSheet";
    subtitle?: string;
    cancelProps?: ComponentProps<typeof Button>;
    showCloseButton?: boolean;
    closeOnBackdropPress?: boolean;
    children?: React.JSX.Element | React.JSX.Element[];
    footer?: React.JSX.Element;
}
export type ModalProps = DefaultModalProps | ActionSheetModalProps;
declare const _default: import("react").MemoExoticComponent<(props: ModalProps) => import("react/jsx-runtime").JSX.Element | null>;
export default _default;

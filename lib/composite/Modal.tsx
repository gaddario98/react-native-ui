import { ComponentProps, memo, useCallback, useMemo } from "react";
import {
  Modal as RNModal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "../base";
import {
  contentLayout,
  padding,
  buttonStyle,
  sectionSubtitle,
  headerTitle,
  gap,
} from "../../styles";
import { Colors, useThemeColors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
} from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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

const Modal = (props: ModalProps) => {
  const { t } = useTranslation(props.ns ?? "modals");
  const theme = useThemeColors();
  const isIOS = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";
  const isWeb = Platform.OS === "web";

  const handleBackdropPress = useCallback(() => {
    if (
      props.onClose &&
      (props.type === "actionSheet" || props.closeOnBackdropPress)
    ) {
      props.onClose();
    }
  }, [props]);

  const renderHeader = useMemo(() => {
    if (!props.title && (props.type !== "default" || !props.showCloseButton))
      return null;

    return (
      <View
        style={[
          styles.header,
          props.type === "default" && { backgroundColor: theme.primary },
          { padding },
        ]}
      >
        {props.title && (
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                props.type === "default" && { color: theme.onPrimary },
              ]}
            >
              {t(props.title)}
            </Text>
          </View>
        )}
        {props.type === "default" && props.showCloseButton && (
          <TouchableWithoutFeedback onPress={props.onClose}>
            <View style={styles.closeButton}>
              <Ionicons source="close" size={24} color={theme.onPrimary} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }, [props, theme, t]);

  const renderActionSheetContent = useMemo(() => {
    if (props.type !== "actionSheet") return props.children;

    const containerDynamic: StyleProp<ViewStyle> = [
      styles.actionSheetContainer,
      isIOS && {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: -4 },
      },
      isAndroid && {
        elevation: 12,
        borderTopWidth: 0,
      },
      isWeb && {
        maxWidth: 560,
        alignSelf: "center",
      },
    ];

    return (
      <View
        style={[
          containerDynamic,
          props.usePseudoSafeArea && isIOS && { paddingBottom: 16 },
        ]}
      >
        {/* Grabber Handle (iOS style) */}
        {!props.title && (
          <View style={styles.grabberContainer}>
            <View style={styles.grabber} />
          </View>
        )}
        {props.subtitle && (
          <Text style={styles.subtitle}>{t(props.subtitle)}</Text>
        )}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            contentLayout,
            { padding: padding, paddingBottom: props.showCloseButton ? 8 : 16 },
            props.containerStyle,
          ]}
        >
          {props.children}
        </ScrollView>
        {(props.showCloseButton || props.footer) && (
          <View style={[styles.cancelContainer, { padding, gap: gap }]}>
            {props.footer}
            {props.showCloseButton && (
              <Button
                onPress={props.onClose}
                variant={isIOS ? "text" : "outlined"}
                color="error"
                fullWidth
                text="cancel"
                ns="buttons"
                {...props.cancelProps}
              />
            )}
          </View>
        )}
      </View>
    );
  }, [props, t, isIOS, isAndroid, isWeb]);

  if (!props.visible) return null;

  if (props.type === "actionSheet") {
    return (
      <RNModal
        transparent
        visible={props.visible}
        animationType={isIOS ? "slide" : "fade"}
        onRequestClose={props.onClose}
        style={[props.modalStyle]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View style={styles.backdrop}>
              <TouchableWithoutFeedback>
                <View style={{ width: "100%" }}>
                  {renderHeader}
                  {renderActionSheetContent}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </RNModal>
    );
  }

  // Default modal
  return (
    <RNModal
      visible={props.visible}
      animationType="slide"
      onRequestClose={props.onClose}
      style={[props.modalStyle]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {renderHeader}
        <ScrollView
          contentContainerStyle={[contentLayout, props.containerStyle]}
          style={{ flex: 1, padding }}
          showsVerticalScrollIndicator={false}
        >
          {renderActionSheetContent}
        </ScrollView>
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: Colors.light.surface,
    borderTopColor: Colors.light.surfaceVariant,
    borderTopLeftRadius: buttonStyle.borderRadius,
    borderTopRightRadius: buttonStyle.borderRadius,
    borderTopWidth: 8,
    bottom: 0,
    maxHeight: SCREEN_HEIGHT * 0.5, // Altezza massima del 50% dello schermo
    position: "relative",
    width: "100%",
  },
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // sfondo semitrasparente
    flex: 1,
    justifyContent: "flex-end",
  },
  grabberContainer: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 4,
  },
  grabber: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#C6C6C8",
    opacity: 0.8,
  },
  cancelContainer: {
    borderTopColor: "#F5F5F5",
    borderTopWidth: 8,
    padding: padding / 2,
  },
  closeButton: {
    padding: 4,
  },
  header: {
    alignItems: "center",
    borderBottomColor: Colors.light.outline,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding,
    borderTopLeftRadius: buttonStyle.borderRadius,
    borderTopRightRadius: buttonStyle.borderRadius,
  },
  subtitle: {
    color: Colors.light.primary,
    fontSize: sectionSubtitle.fontSize,
    padding,
    fontWeight: "500",
  },
  title: {
    fontSize: headerTitle.fontSize,
    fontWeight: headerTitle.fontWeight,
    color: Colors.light.primary,
    fontFamily: headerTitle.fontFamily,
  },
  titleContainer: {
    flex: 1,
  },
});

export default memo(Modal);

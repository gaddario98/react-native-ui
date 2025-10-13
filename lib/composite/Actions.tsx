import { ComponentProps, useMemo } from "react";
import { Button } from "../base";
import Modal, { ModalProps } from "./Modal";
import { View, StyleSheet, Platform, ScrollView } from "react-native";

export type ActionsProps = Omit<ModalProps, "type"> & {
  buttons?: (ComponentProps<typeof Button> & {
    divider?: boolean;
  })[];
};

const Actions: React.FC<ActionsProps> = ({
  buttons,
  children: modalChildren,
  ...modalProps
}) => {
  const children = useMemo(
    () =>
      buttons?.map((button, index) => {
        if (button.divider) {
          return <View key={`divider-${index}`} style={styles.optionDivider} />;
        }
        return (
          <View key={index} style={styles.buttonWrapper}>
            <Button
              {...button}
              fullWidth
              onPress={(e) => {
                button?.onPress?.(e);
                modalProps?.onClose?.();
              }}
            />
          </View>
        );
      }),
    [buttons, modalProps?.onClose]
  );
  return (
    <Modal
      showCloseButton={true}
      {...modalProps}
      type={"actionSheet"}
      usePseudoSafeArea
    >
      <View style={styles.container}>
        {modalChildren}
        <ScrollView
          style={{ maxHeight: 320 }}
          bounces={Platform.OS === "ios"}
        >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  optionDivider: {
    backgroundColor: Platform.select({ ios: "#D1D1D6", android: "#d9d9d9", default: "#e0e0e0" }),
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default Actions;

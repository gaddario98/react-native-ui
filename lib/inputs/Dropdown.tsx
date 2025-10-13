/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo, ComponentProps } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
  ScrollView,
} from "react-native";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Text } from "../base";
import { Ionicons } from "@expo/vector-icons";
import {
  buttonStyle,
  gap,
  inputLabel,
  paragraphText,
  useThemeColors,
} from "../../styles";
import { Modal } from "../composite";

export interface DropdownOption<T extends FieldValues> {
  label: string | number;
  value: T[Path<T>];
}

type DropdownProps<T extends FieldValues> = {
  options?: Array<DropdownOption<T>>;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  styleView?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  multiSelect?: boolean;
  placeholder?: string;
  ns?: string;
  icon?: ComponentProps<typeof Ionicons>["name"];
  disableTranslation?: boolean;
  loading?: boolean;
  isCloseIconHidden?: boolean;
  value?: any | undefined;
  onChange?: (value: any) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
};

const Dropdown = <T extends FieldValues>({
  label,
  value,
  onChange,
  options = [],
  errorMessage,
  disabled = false,
  variant = "primary",
  styleView,
  labelStyle,
  multiSelect = false,
  placeholder = " ",
  disableTranslation,
  icon,
  ns,
  loading,
  isCloseIconHidden,
  inputStyle,
}: DropdownProps<T>) => {
  const { t } = useTranslation(ns);
  const theme = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const getOptions = useMemo((): DropdownOption<T>[] => {
    if (options?.length)
      return options?.map((el) => ({
        ...el,
        label:
          typeof el?.label === "string" && !disableTranslation
            ? t(el?.label)
            : el?.label,
      }));
    return [];
  }, [options, t, disableTranslation]);

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectedOptions = useMemo(
    () =>
      multiSelect
        ? getOptions.filter(
            (opt) => Array.isArray(value) && value.includes(opt.value)
          )
        : [getOptions.find((opt) => opt.value === value)].filter(Boolean),
    [getOptions, value, multiSelect]
  );
  const handleSelect = useCallback(
    (option: DropdownOption<T>) => {
      if (multiSelect) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(option.value)
          ? currentValues.filter((v) => v !== option.value)
          : [...currentValues, option.value];
        onChange?.(newValues);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
      }
    },
    [onChange, multiSelect, value]
  );

  return (
    <View style={[styles.container, styleView]}>
      {!!label && (
        <Text
          text={label || ""}
          props={{ style: [styles.label, inputLabel, labelStyle] }}
        />
      )}
      <TouchableOpacity
        onPress={handleOpen}
        disabled={disabled}
        style={[
          styles.input,
          disabled && styles.disabled,
          !!errorMessage && styles.errorInput,
          multiSelect && styles.multiselectInput,
          inputStyle,
        ]}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={label || "dropdown"}
      >
        <Text
          text={
            multiSelect
              ? selectedOptions.map((opt) => opt?.label).join(", ") ||
                placeholder
              : selectedOptions[0]?.label?.toString() || placeholder
          }
          disableTranslation={disableTranslation}
          contentStyle={{ backgroundColor: "transparent" }}
          props={{
            style: [
              {
                color: disabled
                  ? theme.onSurfaceDisabled
                  : theme.onPrimaryContainer,
              },
              inputLabel,
            ],
          }}
          endIcon={
            !!(multiSelect ? (value || []).length : value) && !isCloseIconHidden
              ? "close"
              : isOpen
                ? "chevron-up-sharp"
                : "chevron-down-sharp"
          }
          onEndIconPress={() => {
            if (!isCloseIconHidden) {
              onChange?.(multiSelect ? [] : "");
            } else {
              handleOpen();
            }
          }}
          icon={icon}
          loading={loading}
          endIconProps={{}}
        />
      </TouchableOpacity>
      {errorMessage && (
        <Text
          props={{ style: [styles.error, buttonStyle] }}
          text={errorMessage}
        />
      )}
      <Modal
        visible={isOpen}
        onClose={handleClose}
        showCloseButton
        type="actionSheet"
        usePseudoSafeArea
        footer={
          multiSelect ? (
            <Button
              onPress={handleClose}
              text="Ok"
              variant="outlined"
              fullWidth
            />
          ) : (
            <></>
          )
        }
      >
          {getOptions.map((option, index) => {
            const isSelected = multiSelect
              ? selectedOptions.some((opt) => opt?.value === option.value)
              : option.value === value;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                  Platform.OS === "web" && styles.optionWeb,
                ]}
                activeOpacity={0.6}
                onPress={() => handleSelect(option)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  text={option.label?.toString()}
                  icon={isSelected ? "checkmark-circle" : undefined}
                  disableTranslation={disableTranslation}
                  iconProps={{
                    color: isSelected ? theme[variant] : theme.outline,
                  }}
                  props={{
                    style: [paragraphText, isSelected && { fontWeight: "600" }],
                  }}
                />
              </TouchableOpacity>
            );
          })}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "auto" },
  disabled: {
    backgroundColor: "rgba(240,241,245,0.7)",
    borderColor: "#E0E0E0",
    opacity: 0.6,
  },
  doneButton: {
    alignItems: "center",
    borderTopColor: "#E0E0E0",
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 12,
    marginTop: 8,
    shadowColor: "#4F8AFA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  sheetContainer: {
    width: "100%",
  },
  optionsScroll: {
    maxHeight: 320,
  },
  optionsContainer: {
    paddingBottom: 8,
    gap: gap,
  },
  error: {
    color: "#B00020",
    marginTop: 4,
    fontWeight: "600",
    fontSize: 15,
  },
  errorInput: {
    borderColor: "#B00020",
    backgroundColor: "rgba(255,0,0,0.07)",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderColor: "#ccc",
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  multiselectInput: {
    minHeight: 54,
  },
  label: {
    color: "#4F8AFA",
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.1,
  },
  option: {
    alignItems: "center",
    borderRadius: 14,
    flexDirection: "row",
    padding: 16,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionSelected: {
    backgroundColor: "#E8F3FF",
    borderColor: "#4F8AFA",
    borderWidth: 1,
  },
  optionWeb: {
    transitionProperty: "background-color",
    transitionDuration: "120ms",
  } as any,
});

export default Dropdown;

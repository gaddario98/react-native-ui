import { useState, useCallback, useEffect, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { inputLabel, paragraphText, useThemeColors } from "../../../styles";
import { CalendarProps } from "./Calendar.common";
import { Text } from "../../base";

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  mode = "date",
  errorMessage,
  disabled = false,
  minimumDate,
  maximumDate,
  label,ns
}) => {
  const [show, setShow] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const theme = useThemeColors();

  useEffect(() => {
    if (value?.toISOString() !== localValue?.toISOString())
      setLocalValue(value);
  }, [localValue, value]);
  
    const formattedDate = useMemo(
      () => {
        if(!localValue) return " ";
        switch (mode) {
          case "date":
            return format(localValue, "dd/MM/yyyy", { locale: it });
          case "time":
            return format(localValue, "HH:mm", { locale: it });
          case "datetime":
            return format(localValue, "dd/MM/yyyy HH:mm", { locale: it });
          default:
            return "";
        }
      },
      [localValue, mode]
    );

  const handleNativeChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
      setShow(false);
      if (selectedDate) {
        setLocalValue(selectedDate);
        onChange?.(selectedDate);
      }
    },
    [onChange]
  );

  const getNativeMode = useCallback(() => {
    switch (mode) {
      case "datetime":
        return show ? "date" : "time";
      default:
        return mode;
    }
  }, [mode, show]);

  return (
    <>
      {label && <Text style={[ paragraphText]} text={label} ns={ns}/>}
      <TouchableOpacity
        onPress={() => !disabled && setShow(true)}
        style={[
          styles.input,
          disabled && styles.disabled,
          !!errorMessage && styles.errorInput,
        ]}
      >
        <Text
          style={[inputLabel, disabled && styles.disabledText]}
          text={formattedDate}
        />
      </TouchableOpacity>
      {errorMessage && (
        <Text style={[paragraphText, styles.error]} text={errorMessage} />
      )}
      {show && (
        <DateTimePicker
          value={localValue ?? new Date()}
          mode={getNativeMode()}
          is24Hour={true}
          display="default"
          onChange={handleNativeChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          locale="it"
          themeVariant="light"
          accentColor={theme.primary}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
  },
  disabledText: {
    color: "#999",
  },
  error: {
    color: "#B00020",
    marginTop: 4,
  },
  errorInput: {
    borderColor: "#B00020",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 1,
    padding: 14,
  }
});

export default Calendar;

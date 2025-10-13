import { View, StyleSheet, StyleProp, ViewStyle, Text } from "react-native";
import RadioButton from "./RadioButton";
import { paragraphText } from "../../styles";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  radioOptions?: RadioOption[];
  variant?: "primary" | "secondary" | "tertiary";
  styleView?: StyleProp<ViewStyle>;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  value?: string | undefined;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  radioOptions = [],
  value,
  onChange,
  errorMessage,
  variant = "primary",
  styleView,
  disabled = false,
  label,
  direction = "vertical",
}) => {
  return (
    <View style={[styles.container, styleView]}>
      {label && (
        <Text style={[paragraphText, styles.label, { color: "#666" }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.radioContainer,
          direction === "horizontal" && styles.horizontalContainer,
        ]}
      >
        {radioOptions.map((option, index) => (
          <RadioButton
            key={option.label}
            value={value === option?.value}
            onChange={() => onChange?.(option?.value)}
            label={option.label}
            disabled={disabled || option.disabled}
            errorMessage={errorMessage}
            variant={variant}
            styleView={[
              direction === "vertical"
                ? styles.verticalRadio
                : styles.horizontalRadio,
              index === radioOptions.length - 1 &&
                direction === "horizontal" &&
                styles.lastHorizontalRadio,
            ]}
          />
        ))}
      </View>
      {errorMessage && direction === "horizontal" && (
        <Text style={[paragraphText, styles.error]}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  error: {
    color: "#B00020",
    marginTop: 4,
  },
  horizontalContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  horizontalRadio: {
    marginRight: 16,
    marginVertical: 4,
  },
  label: {
    marginBottom: 8,
  },
  lastHorizontalRadio: {
    marginRight: 0,
  },
  radioContainer: {
    width: "100%",
  },
  verticalRadio: {
    marginVertical: 4,
  },
});

export default RadioGroup;

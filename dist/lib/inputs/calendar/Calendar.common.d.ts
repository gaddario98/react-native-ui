import { StyleProp, ViewStyle } from "react-native";
import { Locale } from "date-fns";
export interface CalendarProps {
    mode?: "date" | "time" | "datetime";
    disabled?: boolean;
    minimumDate?: Date;
    maximumDate?: Date;
    styleView?: StyleProp<ViewStyle>;
    value?: Date | undefined;
    onChange?: (value: Date) => void;
    error?: boolean;
    errorMessage?: string;
    label?: string;
    displayMode?: "calendar" | "input";
    ns?: string;
}
declare const formatDate: (date: Date, mode: "date" | "time" | "datetime", locale: Pick<Locale, "options" | "localize" | "formatLong">) => string;
export { formatDate };

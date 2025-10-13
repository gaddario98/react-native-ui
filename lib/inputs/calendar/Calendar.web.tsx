import { useState, useMemo, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  addYears,
  subYears,
  isBefore,
  isAfter,
} from "date-fns";
import { it } from "date-fns/locale";
import { Text } from "../../base";
import { CalendarProps } from "./Calendar.common";
import Dropdown from "../Dropdown";
import {
  contentLayoutRow,
  padding,
  paragraphText,
  useThemeColors,
} from "../../../styles";
import TextInput from "../TextInput";
import { Modal } from "../../composite";

const dateFormat = "d";

const WebCalendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  label,
  disabled,
  minimumDate,
  maximumDate,
  mode = "date",
  displayMode = "input",
  ns,
}) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const formattedDate = useMemo(
    () => (value ? format(new Date(value), "dd/MM/yyyy", { locale: it }) : ""),
    [value]
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      onChange?.(date);
      if (displayMode === "input") {
        setShowCalendarModal(false);
      }
    },
    [onChange, displayMode]
  );

  if (displayMode === "calendar") {
    return (
      <WebCalendar
        value={value}
        onChange={handleDateChange}
        label={label}
        disabled={disabled}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        mode={mode}
        ns={ns}
      />
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setShowCalendarModal(true)}>
        <TextInput
          label={label}
          value={formattedDate}
          disabled={disabled}
          endIcon="calendar"
          editable={false}
          ns={ns}
        />
      </TouchableOpacity>

      <Modal
        visible={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        type="actionSheet"
      >
        <View style={styles.modalContent}>
          <OnlyCalendar
            value={value}
            onChange={(val) => {
              handleDateChange(val);
              setShowCalendarModal(false);
            }}
            disabled={disabled}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            mode={mode}
            ns={ns}
          />
        </View>
      </Modal>
    </View>
  );
};

const OnlyCalendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  label,
  disabled,
  minimumDate,
  maximumDate,
  mode = "date",
  ns,
}) => {
  const theme = useThemeColors();
  const initialMonth = useMemo(
    () => (value ? new Date(value) : new Date()),
    [value]
  );
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const monthStart = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
  const monthEnd = useMemo(() => endOfMonth(currentMonth), [currentMonth]);
  const startDate = useMemo(
    () => startOfWeek(monthStart, { weekStartsOn: 1 }),
    [monthStart]
  );
  const endDate = useMemo(
    () => endOfWeek(monthEnd, { weekStartsOn: 1 }),
    [monthEnd]
  );

  const rows = useMemo(() => {
    let day = startDate;
    const rowArray = [];
    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isDisabled =
          (minimumDate && isBefore(cloneDay, minimumDate)) ||
          (maximumDate && isAfter(cloneDay, maximumDate));
        week.push(
          <TouchableOpacity
            key={cloneDay.toISOString()}
            style={[
              styles.dayContainer,
              !isSameMonth(cloneDay, monthStart) && styles.notCurrentMonth,
              isSameDay(cloneDay, value || new Date()) && {
                backgroundColor: theme.primary,
              },
              isDisabled && styles.disabledDay,
            ]}
            disabled={disabled || isDisabled}
            onPress={() => onChange?.(cloneDay)}
          >
            <Text
              text={formattedDate}
              style={[
                styles.dayText,
                !isSameMonth(cloneDay, monthStart) &&
                  styles.notCurrentMonthText,
                isSameDay(cloneDay, value || new Date()) &&
                  styles.selectedDayText,
                isDisabled && styles.disabledDayText,
              ]}
            />
          </TouchableOpacity>
        );
        day = addDays(day, 1);
      }
      rowArray.push(
        <View key={day.toISOString()} style={styles.weekRow}>
          {week}
        </View>
      );
    }
    return rowArray;
  }, [
    startDate,
    endDate,
    monthStart,
    minimumDate,
    maximumDate,
    disabled,
    onChange,
    value,
  ]);

  const dayNames = useMemo(
    () => ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    []
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }, []);

  const baseYear = useMemo(
    () => (value ? new Date(value).getFullYear() : new Date().getFullYear()),
    [value]
  );
  const minYear = minimumDate ? minimumDate.getFullYear() : baseYear - 100;
  const maxYear = maximumDate ? maximumDate.getFullYear() : baseYear + 10;
  const yearOptions = useMemo(() => {
    const options = [];
    for (let y = minYear; y <= maxYear; y++) {
      options.push({ label: y.toString(), value: y });
    }
    return options?.reverse();
  }, [minYear, maxYear]);

  // Quando si seleziona un anno dal dropdown, aggiorniamo currentMonth
  const handleYearSelect = useCallback(
    (selectedYear: string) => {
      setCurrentMonth(new Date(+selectedYear, currentMonth.getMonth(), 1));
    },
    [currentMonth]
  );

  const handlePrevYear = useCallback(() => {
    setCurrentMonth((prev) => subYears(prev, 1));
  }, []);

  const handleNextYear = useCallback(() => {
    setCurrentMonth((prev) => addYears(prev, 1));
  }, []);

  if (mode !== "date") {
    return (
      <View style={styles.fallbackContainer}>
        {!!label && <Text text={label} style={styles.label} />}
        <Text text="Modalità non supportata per il calendario. Utilizza un input nativo." />
      </View>
    );
  }
  const navButtonStyle = useMemo(
    () => ({
      ...styles.navButton,
      color: theme.primary,
    }),
    [theme.primary]
  );

  return (
    <>
      {label && (
        <Text style={[styles.label, paragraphText]} text={label} ns={ns} />
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.yearHeader, contentLayoutRow]}>
            <TouchableOpacity onPress={handlePrevYear}>
              <Text text="<<" style={navButtonStyle} />
            </TouchableOpacity>
            <Dropdown
              disabled={disabled}
              label=""
              multiSelect={false}
              ns="dropdown"
              options={yearOptions}
              onChange={(val) => handleYearSelect(val)}
              value={currentMonth.getFullYear()}
              placeholder="Seleziona anno"
              styleView={{}}
              inputStyle={{ borderWidth: 0, padding: 5 }}
              isCloseIconHidden
            />
            <TouchableOpacity onPress={handleNextYear}>
              <Text text=">>" style={navButtonStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <Text text="<" style={navButtonStyle} />
            </TouchableOpacity>
            <Text
              text={format(currentMonth, "MMMM", { locale: it })}
              style={[styles.headerTitle, paragraphText, { paddingBottom: 5 }]}
            />
            <TouchableOpacity onPress={handleNextMonth}>
              <Text text=">" style={navButtonStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dayNamesRow}>
          {dayNames.map((dayName) => (
            <Text
              key={dayName}
              text={dayName}
              style={[styles.dayNameText, paragraphText]}
            />
          ))}
        </View>
        {rows}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderColor: '#E3F0FF',
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    shadowColor: '#4F8AFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 12,
  },
  dayContainer: {
    alignItems: "center",
    borderRadius: 12,
    height: 36,
    justifyContent: "center",
    width: 36,
    margin: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: '#E3F0FF',
    shadowColor: '#4F8AFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  dayNameText: {
    color: "#4F8AFA",
    fontWeight: "700",
    textAlign: "center",
    width: 36,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  dayText: {
    color: "#222",
    fontSize: 16,
    textAlign: "center",
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  disabledDay: {
    backgroundColor: "#F0F1F5",
    borderColor: '#E0E0E0',
  },
  disabledDayText: {
    color: "#B0B0B0",
  },
  fallbackContainer: {
    padding: 10,
  },
  header: {
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 14,
    padding: 8,
    shadowColor: '#4F8AFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: '#4F8AFA',
    letterSpacing: 0.2,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#4F8AFA',
    letterSpacing: 0.1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: '100%',
    padding,
    borderRadius: 18,
    shadowColor: '#4F8AFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  monthHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    padding: 6,
    shadowColor: '#4F8AFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  navButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#4F8AFA',
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  notCurrentMonth: {
    backgroundColor: '#F0F1F5',
    borderColor: '#E0E0E0',
  },
  notCurrentMonthText: {
    color: '#B0B0B0',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '700',
    textShadowColor: '#4F8AFA',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  yearHeader: {
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

export default WebCalendar;

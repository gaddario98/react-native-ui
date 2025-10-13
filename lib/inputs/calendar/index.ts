import { Platform } from 'react-native';
import CalendarNative from './Calendar.native';
import CalendarWeb from './Calendar.web';

const Calendar = Platform.select({
  native: CalendarNative,
  web: CalendarWeb,
}) || CalendarWeb;

export default Calendar;
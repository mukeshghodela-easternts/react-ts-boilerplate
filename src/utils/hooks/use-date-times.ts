import {
  format,
  isMatch,
  isValid,
  parse,
  differenceInMinutes,
  differenceInMonths,
  differenceInDays,
  getTime,
  add,
  sub,
  endOfDay
} from 'date-fns';
import { DATE_TIME } from '../../constants';

export default function useDateTimes() {
  /* Current Time */
  const currentTime = (): string => {
    return format(new Date(), DATE_TIME.TIME_CONST);
  };

  /* Current Date */
  const currentDate = (): string => {
    return format(new Date(), DATE_TIME.DATE_CONST);
  };

  /* Current Date Time */
  const currentDateTime = (): string => {
    return format(new Date(), DATE_TIME.DATE_TIME_CONST);
  };

  /* Format Date */
  const getDateFormat = (
    value: Date | string,
    formatType = DATE_TIME.DATE_CONST
  ): string => {
    if (isValid(new Date(value))) {
      return value ? format(new Date(value), formatType) : '';
    }
    return '';
  };

  /* Format Date */
  const getCustomDateFormat = (value: Date | string): string | Date => {
    if (isMatch(value as string, 'yyyy-MM-dd') === true) return value;

    return value
      ? format(
          parse(value as string, DATE_TIME.DATE_CONST, new Date()),
          DATE_TIME.FILTER_DATE_CONST
        )
      : '';
  };

  /* Format Date Time */
  const getDateTimeFormat = (value: Date | string): string => {
    return value ? format(new Date(value), DATE_TIME.DATE_TIME_CONST) : '';
  };

  /**
   * Get time differences of two times
   * @param dateLeft - Later Date(From-Date)
   * @param dateRight - Earlier Date(To-Date)
   * @param diffFormat - format type like minute/second/hour/days/etc
   * @returns {string|number}
   */
  const getTimeDiff = (
    dateLeft: Date | number,
    dateRight: Date | number,
    diffFormat: string
  ): string | number => {
    if (diffFormat == 'minutes') {
      return differenceInMinutes(dateLeft, dateRight);
    }
    if (diffFormat == 'months') {
      return differenceInMonths(dateLeft, dateRight);
    }
    if (diffFormat == 'days') {
      return differenceInDays(dateLeft, dateRight);
    }
    return '';
  };

  /**
   * get Timestamp from the date
   * @param date
   * @returns {number}
   */
  const getTimestampFromDate = (date: Date | string): number | string => {
    return date ? getTime(new Date(date)) / 1000 : '';
  };

  /**
   * get Timestamp from the date
   * @param date
   * @returns {number}
   */
  const getTimestampFromDateString = (dateStr: string): number | string => {
    return dateStr
      ? getTime(
          new Date(
            getCustomDateFormat(dateStr.split(' ')[0]) +
              ' ' +
              convertTime12to24(
                formatTime(dateStr.split(' ')[1]) + ' ' + dateStr.split(' ')[2]
              )
          )
        ) / 1000
      : '';
  };

  const getSrNoColor = (fromDate: string) => {
    if (
      getTimeDiff(new Date(currentDate()), new Date(fromDate), 'days') > 365
    ) {
      return {
        color: '#ff5252 !important',
        caretColor: '#ff5252 !important'
      };
    }
    return;
  };
  /**
   * get Timestamp of end of day from the date
   * @param date
   * @returns {number}
   */
  const getEODTimestampFromDate = (date: Date | string): number | string => {
    return date ? getTime(endOfDay(new Date(date))) / 1000 : '';
  };

  const computedDateFormattedMomentjs = (
    date: Date | string
  ): Date | string => {
    return date ? format(new Date(date), DATE_TIME.DATE_CONST) : '';
  };

  // get Timestamp to Date For Specific Format
  const getTimestampToDateForSpecificFormat = (
    date: number | string,
    dateFormat = DATE_TIME.DATE_CONST
  ): Date | string => {
    return date ? format(new Date(Number(date) * 1000), dateFormat) : '';
  };

  // Get Date From Timestamp
  const getDateFromTimestamp = (timestamp: string): string => {
    return timestamp
      ? new Date(
          parseInt(timestamp) * 1000 - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10)
      : '';
  };

  /* Format Date */
  const getFilterDateFormat = (
    date: Date | string,
    dateFormat = DATE_TIME.FILTER_DATE_CONST
  ): Date | string => {
    return date ? format(new Date(date), dateFormat) : '';
  };

  const customDayMonthDate = (
    value: Date | string,
    count: number,
    parameter: string,
    isAdd: boolean
  ): string => {
    if (value) {
      if (isAdd) {
        return format(
          add(new Date(value), {
            [parameter]: count
          }),
          DATE_TIME.DATE_CONST
        );
      }
      return format(
        sub(new Date(value), {
          [parameter]: count
        }),
        DATE_TIME.DATE_CONST
      );
    }
    return '';
  };

  // Get Default Date For Date-time Picker
  const defaultSelectedDate = () => {
    // Set the current date and time as default value
    var d = new Date();
    var currentHour = d.getHours() % 12; // AM,PM format
    var minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var currentTime = currentHour + ':' + minutes + ':00';
    var dateModel = d.toISOString().substr(0, 10);

    var meridian = 'AM';
    if (d.getHours() >= 12) {
      meridian = 'PM';
    }

    return {
      meridian: meridian,
      timeModel: currentTime,
      dateModel: dateModel
    };
  };

  // Format Time to 12 hour format
  const formatTime = (str: string): string => {
    const [time, meridian] = str.split(' ');

    let [hours, minutes, seconds] = time.split(':');
    if (hours === '00') {
      hours = '12';
    } else if (hours === '12') {
      hours = '00';
    } else if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    }
    if (meridian) return `${hours}:${minutes}:${seconds} ${meridian}`;
    return `${hours}:${minutes}:${seconds}`;
  };

  // Convert 12 to 24 hours Format
  const convertTime12to24 = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    if (seconds) {
      seconds = seconds;
    } else {
      seconds = '00';
    }
    return `${hours}:${minutes}:${seconds}`;
  };
  return {
    computedDateFormattedMomentjs,
    convertTime12to24,
    defaultSelectedDate,
    customDayMonthDate,
    getFilterDateFormat,
    getDateFromTimestamp,
    getTimestampToDateForSpecificFormat,
    getEODTimestampFromDate,
    getSrNoColor,
    getTimestampFromDateString,
    getTimestampFromDate,
    getDateTimeFormat,
    getDateFormat,
    currentDateTime,
    currentTime
  };
}

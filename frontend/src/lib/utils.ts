import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CALENDAR_CONSTANTS from '../constants/calendar';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const parseTimeString = (timeString: string): { hours: number; minutes: number } => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

export const findDayIndex = (weekDates: Date[], targetDate: Date): number => {
  return weekDates.findIndex((date) => isSameDay(date, targetDate));
};

export const calculateDurationInMinutes = (startDateTime: Date, endDateTime: Date): number => {
  return (
    (endDateTime.getTime() - startDateTime.getTime()) / CALENDAR_CONSTANTS.MILLISECONDS_PER_MINUTE
  );
};

export const getTimeInMinutes = (date: Date): number => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 60 + minutes;
};

export const calculateTimeInMinutes = (timeString: string): number => {
  const { hours, minutes } = parseTimeString(timeString);
  return hours * 60 + minutes;
};

export const createDateTime = (
  baseDate: Date,
  timeString: string,
  offsetMinutes: number = 0,
): Date => {
  const dateTime = new Date(baseDate);
  const { hours, minutes } = parseTimeString(timeString);
  dateTime.setHours(hours, minutes, 0, 0);

  if (offsetMinutes > 0) {
    dateTime.setTime(
      dateTime.getTime() + offsetMinutes * CALENDAR_CONSTANTS.MILLISECONDS_PER_MINUTE,
    );
  }

  return dateTime;
};

export const calculateSlotPosition = (
  durationMinutes: number,
  startTimeMinutes: number,
): { height: string; top: string } => {
  const { MINUTES_PER_PIXEL_RATIO } = CALENDAR_CONSTANTS;
  return {
    height: `calc(${durationMinutes} * ${MINUTES_PER_PIXEL_RATIO}%)`,
    top: `calc(${startTimeMinutes} * ${MINUTES_PER_PIXEL_RATIO}%)`,
  };
};

export const getEmployeeInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

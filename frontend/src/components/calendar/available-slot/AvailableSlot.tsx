import { useMemo, type MouseEvent } from 'react';
import { useDeleteSlot } from '../../../hooks/slots';
import type { SlotType } from '../../../types/Slots';
import DeleteButton from '../../ui/delete';
import {
  calculateDurationInMinutes,
  calculateSlotPosition,
  findDayIndex,
  getTimeInMinutes,
} from '../../../lib/utils';
import CALENDAR_CONSTANTS from '../../../constants/calendar';
import SlotContent from './SlotContent';

interface AvailableSlotProps {
  onClick?: () => void;
  weekDates: Date[];
  slot: SlotType;
}

export const AvailableSlot = ({ weekDates, slot, onClick }: AvailableSlotProps) => {
  const deleteSlot = useDeleteSlot();

  const slotPosition = useMemo(() => {
    const slotEnd = new Date(slot.endDateTime);
    const slotStart = new Date(slot.startDateTime);
    const dayIndex = findDayIndex(weekDates, slotStart);

    if (dayIndex === -1) return null;

    console.log('Calculating position for slot:', slot);

    const durationMinutes = calculateDurationInMinutes(slotStart, slotEnd);
    const startTimeMinutes = getTimeInMinutes(slotStart);
    const { height, top } = calculateSlotPosition(durationMinutes, startTimeMinutes);

    return {
      dayIndex,
      height,
      top,
    };
  }, [slot, weekDates]);

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    deleteSlot.mutate(slot.id);
  };

  if (!slotPosition) return null;

  const { dayIndex, height, top } = slotPosition;

  return (
    <div
      className="absolute w-[14.2857%] p-1"
      style={{
        top,
        left: `${dayIndex * CALENDAR_CONSTANTS.DAY_WIDTH_PERCENTAGE}%`,
        height,
      }}
      onClick={onClick}
    >
      <DeleteButton onDelete={handleDeleteClick} />
      <SlotContent title={slot.title} description={slot.description} employees={slot.employees} />
    </div>
  );
};

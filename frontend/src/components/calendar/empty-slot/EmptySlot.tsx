import { useEffect, useMemo, type Dispatch, type SetStateAction } from 'react';
import useSlotForm from '../../../hooks/useSlotForm';
import { calculateSlotPosition, calculateTimeInMinutes } from '../../../lib/utils';
import CALENDAR_CONSTANTS from '../../../constants/calendar';
import AddSlotButton from './AddSlotButton';
import SlotTitleInput from './SlotTitleInput';

interface EmptySlotProps {
  startTime: string;
  duration: number;
  dayNumber: number;
  onClick?: () => void;
  isEditing?: boolean;
  setIsEditing?: Dispatch<SetStateAction<string | null>>;
  day: Date;
}

export const EmptySlot = ({
  startTime,
  duration,
  dayNumber,
  onClick,
  isEditing,
  setIsEditing,
  day,
}: EmptySlotProps) => {
  const { titleValue, hasError, inputRef, handleInput, handleKeyDown } = useSlotForm({
    day,
    startTime,
    duration,
    setIsEditing,
  });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing, inputRef]);

  const slotPosition = useMemo(() => {
    const startTimeMinutes = calculateTimeInMinutes(startTime);
    return calculateSlotPosition(duration, startTimeMinutes);
  }, [startTime, duration]);

  const { height, top } = slotPosition;

  return (
    <div
      className="absolute w-[14.2857%] p-1"
      style={{
        top,
        left: `${dayNumber * CALENDAR_CONSTANTS.DAY_WIDTH_PERCENTAGE}%`,
        height,
      }}
      onClick={onClick}
    >
      <div className="relative h-full flex justify-center items-center border border-neutral-300 text-neutral-300 hover:text-neutral-400 text-xs rounded cursor-pointer bg-neutral-100 hover:bg-neutral-200 p-1">
        {!isEditing && <AddSlotButton onClick={onClick} />}
        {isEditing && (
          <SlotTitleInput
            value={titleValue}
            hasError={hasError}
            inputRef={inputRef}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
};

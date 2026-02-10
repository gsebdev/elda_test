import {
  useRef,
  useState,
  type Dispatch,
  type InputEvent,
  type KeyboardEvent,
  type SetStateAction,
} from 'react';
import createSlotSchema from '../schemas/createSlotSchema';
import { createDateTime } from '../lib/utils';
import { useCreateSlot } from './slots';

interface UseSlotFormParams {
  day: Date;
  startTime: string;
  duration: number;
  setIsEditing?: Dispatch<SetStateAction<string | null>>;
}

const useSlotForm = ({ day, startTime, duration, setIsEditing }: UseSlotFormParams) => {
  const [titleValue, setTitleValue] = useState<string>('');
  const [hasError, setHasError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const createSlot = useCreateSlot();

  const resetForm = () => {
    setTitleValue('');
    setHasError(null);
    setIsEditing?.(null);
  };

  const validateSlotTitle = (value: string): string | null => {
    const result = createSlotSchema.pick({ title: true }).safeParse({ title: value });

    if (!result.success) {
      return result.error.issues[0]?.message || 'Erreur de validation';
    }

    return null;
  };

  const handleInput = (e: InputEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setTitleValue(newValue);

    const validationError = validateSlotTitle(newValue);
    setHasError(validationError);
  };

  const handleSubmit = () => {
    const startDateTime = createDateTime(day, startTime);
    const endDateTime = createDateTime(day, startTime, duration);

    const result = createSlotSchema.safeParse({
      title: titleValue,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
    });

    if (!result.success) {
      const titleError = result.error.issues.find((err) => err.path.includes('title'));
      setHasError(titleError?.message || 'Erreur de validation');
      return;
    }

    createSlot.mutate(result.data);
    resetForm();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      resetForm();
    }
  };

  return {
    titleValue,
    hasError,
    inputRef,
    handleInput,
    handleKeyDown,
  };
};

export default useSlotForm;

import type { InputEvent, KeyboardEvent } from 'react';

interface SlotTitleInputProps {
  value: string;
  hasError: string | null;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  onInput: (e: InputEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const SlotTitleInput = ({ value, hasError, inputRef, onInput, onKeyDown }: SlotTitleInputProps) => (
  <div className="w-full h-full flex flex-col">
    <textarea
      className={`flex-1 w-full focus:outline-none resize-none bg-transparent placeholder-gray-400 ${
        hasError ? 'text-red-600 border-b border-red-500' : 'focus:text-blue-700'
      }`}
      placeholder="Nom du créneau"
      onInput={onInput}
      onKeyDown={onKeyDown}
      value={value}
      ref={inputRef}
      aria-label="Nom du créneau"
      aria-invalid={!!hasError}
    />
    {hasError && (
      <div className="text-red-500 text-[10px] leading-tight mt-0.5" role="alert">
        {hasError}
      </div>
    )}
  </div>
);

export default SlotTitleInput;

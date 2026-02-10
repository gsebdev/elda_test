import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SlotTemplateType } from '../../types/SlotTemplates';
import type { SlotType } from '../../types/Slots';
import { AvailableSlot } from './available-slot/AvailableSlot';
import { EmptySlot } from './empty-slot/EmptySlot';

export interface WeeklyCalendarProps {
  slotTemplates: SlotTemplateType[];
  slots: SlotType[];
}

export const WeeklyCalendar = ({ slotTemplates, slots }: WeeklyCalendarProps) => {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [editedSlot, setEditedSlot] = useState<string | null>(null);

  const handleSlotTemplateClick = (identifier: string) => {
    setEditedSlot(identifier);
  };

  const getWeekDates = (offset: number) => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + offset * 7);
    monday.setHours(0, 0, 0, 0);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentWeekOffset);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  const formatHour = (hour: number) => {
    return `${String(hour).padStart(2, '0')}:00`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">
          Semaine {weekDates[0].toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} -{' '}
          {weekDates[6].toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {currentWeekOffset !== 0 && (
            <button
              onClick={() => setCurrentWeekOffset(0)}
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Aujourd'hui
            </button>
          )}
          <button
            onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next week"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="min-w-full">
          <div className="grid h-[70px] grid-cols-8 border-b sticky top-0 bg-white z-10">
            <div className="px-4 py-3 text-sm font-medium text-gray-500 border-r">Horaire</div>
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`py-3 text-center border-r ${isToday(date) ? 'bg-blue-50' : ''}`}
              >
                <div className="text-sm font-medium text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap">
                  {dayNames[index]}
                </div>
                <div
                  className={`text-sm mt-1 break-all ${
                    isToday(date) ? 'text-blue-600 font-semibold' : 'text-gray-500'
                  }`}
                >
                  {formatDate(date)}
                </div>
              </div>
            ))}
          </div>

          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b">
              <div className="px-4 py-1 text-sm text-gray-500 border-gray-100 border-r bg-gray-50">
                {formatHour(hour)}
              </div>
              {weekDates.map((date, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`px-2 min-h-1 border-r border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    isToday(date) ? 'bg-blue-50/30' : ''
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="slots w-[87.5%] h-[calc(100%-70px)] absolute top-[70px] left-[12.5%]">
          {weekDates.map((day, index) =>
            slotTemplates.map((template, templateIdx) => (
              <EmptySlot
                key={`${index}-${templateIdx}`}
                startTime={template.startTime}
                duration={template.duration}
                dayNumber={index}
                day={day}
                isEditing={editedSlot === `template-${index}-${templateIdx}`}
                setIsEditing={setEditedSlot}
                onClick={() => handleSlotTemplateClick(`template-${index}-${templateIdx}`)}
              />
            )),
          )}
          {slots.map((slot) => {
            return <AvailableSlot key={slot.id} weekDates={weekDates} slot={slot} />;
          })}
        </div>
      </div>
    </div>
  );
};

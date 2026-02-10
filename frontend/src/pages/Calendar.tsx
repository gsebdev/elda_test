import { WeeklyCalendar } from '../components/calendar/WeeklyCalendar';
import { useSlots, useSlotTemplates } from '../hooks/slots';

function Calendar() {
  const { data: slotTemplates } = useSlotTemplates();
  const { data: slots } = useSlots();

  return (
    <>
      <h1>Planning</h1>
      <section className="mt-8 shadow-xl rounded-md overflow-hidden border">
        <WeeklyCalendar slotTemplates={slotTemplates || []} slots={slots || []} />
      </section>
    </>
  );
}

export default Calendar;

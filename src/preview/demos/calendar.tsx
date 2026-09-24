import { useState } from 'react';
import { Calendar } from '../../components/ui/calendar';

export function CalendarDemo() {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 6, 20));

  return (
    <div className="w-fit p-4">
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 6, 1)}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}

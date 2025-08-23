"use client";
 import { useEffect } from 'react';
 import 'flatpickr/dist/flatpickr.css';
 import Label from './Label';
 import { Calendar } from 'lucide-react';

 type PropsType = {
   id: string;
   mode?: "single" | "multiple" | "range" | "time";
   onChange?: (selectedDates: Date[], dateStr: string) => void;
   defaultDate?: string | Date | Array<string | Date>;
   label?: string;
   placeholder?: string;
 };

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  useEffect(() => {
    let fpInstance: { destroy: () => void } | null = null;
    let mounted = true;

    void import('flatpickr').then(({ default: flatpickr }) => {
      if (!mounted) return;
      const inst = flatpickr(`#${id}`, {
        mode: mode || "single",
        static: true,
        monthSelectorType: "static",
        dateFormat: "Y-m-d",
        defaultDate,
        onChange: onChange
          ? (selectedDates: Date[], dateStr: string) => onChange(selectedDates, dateStr)
          : undefined,
      });
      if (!Array.isArray(inst)) {
        fpInstance = inst;
      }
    }).catch(() => {
      // no-op: if flatpickr fails to load, simply skip initialization
    });

    return () => {
      mounted = false;
      if (fpInstance) {
        fpInstance.destroy();
      }
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <Calendar className="w-6 h-6" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

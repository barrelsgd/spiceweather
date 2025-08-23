"use client";
import { useEffect, useMemo } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormShell from "./FormShell";
import { Field, TextInput } from "./inputs";
import { toast } from "sonner";

const shiftCodes = ["M", "E", "N", "O", "V", "S", "D", "L"] as const; // Morning, Evening, Night, Off, Vacation, Study, 08-16, Leave(Other)

type MonthInfo = {
  year: number;
  month: number;
  days: number;
  weekDays: string[];
};

function getMonthInfo(ym: string): MonthInfo {
  // ym = YYYY-MM
  const [y, m] = ym.split("-").map((n) => Number(n));
  const year = Number.isFinite(y) ? y : new Date().getFullYear();
  const month = Number.isFinite(m) ? m : new Date().getMonth() + 1; // 1-12
  const days = new Date(year, month, 0).getDate();
  const weekDays = Array.from({ length: days }, (_, i) => {
    const d = new Date(year, month - 1, i + 1).getDay(); // 0=Sun
    return "SMTWTFS".at(d) ?? "";
  });
  return { year, month, days, weekDays };
}

const employeeSchema = z.object({
  name: z.string().min(1, "Required"),
  // shifts will be validated dynamically by length
  shifts: z.array(z.string().max(2).optional()).default([]),
});

const schema = z.object({
  department: z.string().min(1, "Required"),
  periodMonth: z.string().regex(/^\d{4}-\d{2}$/u, "Use YYYY-MM"),
  publicHolidays: z.array(z.number().int().min(1)).default([]),
  employees: z.array(employeeSchema).min(1),
  signedBy: z.string().optional(),
  signedDate: z.string().optional(),
});

export type RosterValues = z.input<typeof schema>;

export default function RosterForm() {
  const { control, register, handleSubmit, reset, setValue } =
    useForm<RosterValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        department: "",
        periodMonth: new Date().toISOString().slice(0, 7),
        publicHolidays: [],
        employees: Array.from({ length: 10 }).map(() => ({
          name: "",
          shifts: [],
        })),
        signedBy: "",
        signedDate: new Date().toISOString().slice(0, 10),
      },
    });

  const {
    fields: employeeFields,
    append,
    remove,
  } = useFieldArray({ control, name: "employees" });

  const periodMonth = useWatch({ control, name: "periodMonth" }) as string;
  const month = useMemo(() => getMonthInfo(periodMonth), [periodMonth]);

  // Ensure all employee shift arrays match month length
  const employees = useWatch({ control, name: "employees" }) as Array<{
    name: string;
    shifts: Array<string | undefined>;
  }>;
  useEffect(() => {
    if (!employees) return;
    for (let i = 0; i < employees.length; i++) {
      const e = employees[i];
      const len = e.shifts?.length ?? 0;
      if (len !== month.days) {
        const next = Array.from(
          { length: month.days },
          (_, d) => e.shifts?.[d] ?? ""
        );
        setValue(`employees.${i}.shifts` as const, next, {
          shouldDirty: false,
        });
      }
    }
  }, [employees, month.days, setValue]);

  const publicHolidays =
    (useWatch({ control, name: "publicHolidays" }) as number[]) ?? [];

  const onSubmit = handleSubmit((data) => {
    console.log("Roster", data);
    toast.success("Saved Monthly Roster");
  });

  const toggleHoliday = (dayIndex: number) => {
    const exists = publicHolidays.includes(dayIndex + 1);
    const next = exists
      ? publicHolidays.filter((d) => d !== dayIndex + 1)
      : [...publicHolidays, dayIndex + 1];
    setValue(
      "publicHolidays",
      next.sort((a, b) => a - b),
      {
        shouldDirty: true,
      }
    );
  };

  const holidays = publicHolidays;

  return (
    <FormShell
      title="Monthly Duty Roster"
      description="Legend: M=0530-1400, E=1400-2230, N=2230-0600, D=0800-1600, L=Leave(Other), O=Off, V=Vacation, S=Study. *=Public Holiday"
      onSubmit={onSubmit}
      actions={
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-xl border px-3 py-2"
            onClick={() =>
              append({
                name: "",
                shifts: Array.from({ length: month.days }, () => ""),
              })
            }
          >
            Add employee
          </button>
          <button
            type="button"
            className="rounded-xl border px-3 py-2"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field label="Department">
          <TextInput
            placeholder="Department"
            register={register("department")}
          />
        </Field>
        <Field label="Period (YYYY-MM)">
          <TextInput type="month" register={register("periodMonth")} />
        </Field>
        <Field label="Signed by">
          <TextInput
            placeholder="Manager of Meteorology"
            register={register("signedBy")}
          />
        </Field>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">Names / Date</th>
              {/* Day numbers */}
              {Array.from({ length: month.days }, (_, i) => (
                <th
                  key={i}
                  className={`border px-1 py-1 ${holidays.includes(i + 1) ? "bg-yellow-50" : ""}`}
                >
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      className="text-[10px] underline"
                      onClick={() => toggleHoliday(i)}
                      title="Toggle public holiday"
                    >
                      {holidays.includes(i + 1) ? "*" : "\u00A0"}
                    </button>
                    <span className="font-medium">{i + 1}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {month.weekDays[i]}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeeFields.map((emp, r) => (
              <tr key={emp.id}>
                <td className="border px-2 py-1 min-w-[180px]">
                  <TextInput
                    className="h-8 w-full"
                    placeholder="Surname, First"
                    register={register(`employees.${r}.name` as const)}
                  />
                </td>
                {Array.from({ length: month.days }, (_, c) => (
                  <td
                    key={c}
                    className={`border px-1 py-0.5 ${holidays.includes(c + 1) ? "bg-yellow-50" : ""}`}
                  >
                    <input
                      className="h-7 w-full text-center uppercase"
                      maxLength={2}
                      aria-label={`Day ${c + 1}`}
                      {...register(`employees.${r}.shifts.${c}` as const)}
                      list={`shift-codes-list`}
                    />
                  </td>
                ))}
                <td className="border px-1 py-0.5">
                  <button
                    type="button"
                    className="rounded border px-2 py-1"
                    onClick={() => remove(r)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <datalist id="shift-codes-list">
        {shiftCodes.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Date">
          <TextInput type="date" register={register("signedDate")} />
        </Field>
      </div>
    </FormShell>
  );
}

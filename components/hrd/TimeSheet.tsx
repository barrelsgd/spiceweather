"use client";
import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormShell from "./FormShell";
import { Field, TextArea, TextInput } from "./inputs";
import { toast } from "sonner";

const rowSchema = z.object({
  date: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
  rosterHours: z.string().optional().default(""),
  actualHours: z.string().optional().default(""),
  total: z.string().optional().default(""),
  break: z.string().optional().default(""),
  hoursWorked: z.string().optional().default(""),
  remarks: z.string().optional().default(""),
});

const schema = z.object({
  department: z.string().min(1, "Required"),
  period: z.string().min(1, "Required"),
  entries: z.array(rowSchema).min(1),
});

export type TimeSheetValues = z.input<typeof schema>;

export default function TimeSheetForm() {
  const { control, register, handleSubmit, reset, setValue } =
    useForm<TimeSheetValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        department: "",
        period: "",
        entries: Array.from({ length: 10 }).map(() => ({
          date: "",
          name: "",
          rosterHours: "",
          actualHours: "",
          total: "",
          break: "",
          hoursWorked: "",
          remarks: "",
        })),
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
  });

  // Auto-calculate Hours Worked = Total - Break (numeric if possible)
  const entries = useWatch({ control, name: "entries" });
  useEffect(() => {
    if (!entries) return;
    for (const [i, e] of entries.entries()) {
      const totalNum = Number(e.total ?? "");
      const breakNum = Number(e.break ?? "");
      if (!Number.isNaN(totalNum) && !Number.isNaN(breakNum)) {
        const worked = (totalNum - breakNum).toString();
        if (e.hoursWorked !== worked)
          setValue(`entries.${i}.hoursWorked` as const, worked, {
            shouldDirty: true,
          });
      }
    }
  }, [entries, setValue]);

  const onSubmit = handleSubmit((data) => {
    console.log("TimeSheet", data);
    toast.success("Saved Official Time Sheet");
  });

  return (
    <FormShell
      title="Official Time Sheet"
      description="Grenada Airports Authority – Maurice Bishop & Lauriston Airports"
      onSubmit={onSubmit}
      actions={
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-xl border px-3 py-2"
            onClick={() =>
              append({
                date: "",
                name: "",
                rosterHours: "",
                actualHours: "",
                total: "",
                break: "",
                hoursWorked: "",
                remarks: "",
              })
            }
          >
            Add row
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Department">
          <TextInput
            placeholder="Department"
            register={register("department")}
          />
        </Field>
        <Field label="Period">
          <TextInput
            placeholder="e.g. 2025-08-01 to 2025-08-15"
            register={register("period")}
          />
        </Field>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/30">
              <th className="border px-2 py-1 text-left">Date</th>
              <th className="border px-2 py-1 text-left">Name</th>
              <th className="border px-2 py-1 text-left">Roster Hours</th>
              <th className="border px-2 py-1 text-left">Actual Hours</th>
              <th className="border px-2 py-1 text-left">Total</th>
              <th className="border px-2 py-1 text-left">Break</th>
              <th className="border px-2 py-1 text-left">Hours Worked</th>
              <th className="border px-2 py-1 text-left">Remarks</th>
              <th className="border px-2 py-1" aria-label="Row actions"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="border px-2 py-1">
                  <TextInput
                    type="date"
                    className="h-8 w-full"
                    register={register(`entries.${index}.date` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextInput
                    className="h-8 w-full"
                    register={register(`entries.${index}.name` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextInput
                    className="h-8 w-full"
                    register={register(`entries.${index}.rosterHours` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextInput
                    className="h-8 w-full"
                    register={register(`entries.${index}.actualHours` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextInput
                    className="h-8 w-full"
                    register={register(`entries.${index}.total` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextInput
                    className="h-8 w-full"
                    register={register(`entries.${index}.break` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextInput
                    className="h-8 w-full"
                    readOnly
                    register={register(`entries.${index}.hoursWorked` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <TextArea
                    className="min-h-[32px] w-full"
                    register={register(`entries.${index}.remarks` as const)}
                  />
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    type="button"
                    className="rounded border px-2 py-1 text-xs"
                    onClick={() => remove(index)}
                    aria-label={`Remove row ${index + 1}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <label className="grid gap-1">
          <span className="text-sm font-medium">
            Department Manager / Supervisor
          </span>
          <TextInput placeholder="Name & Signature" />
        </label>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            To be completed each shift per day and submitted weekly to the Human
            Resource Department.
          </li>
          <li>All Staff Movement must be accounted for.</li>
          <li>Brief explanation to be provided in Remark Column.</li>
          <li>Medical Certificates to be attached where necessary.</li>
        </ol>
      </div>
    </FormShell>
  );
}

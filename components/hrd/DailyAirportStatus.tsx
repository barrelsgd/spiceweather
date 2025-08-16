"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormShell from "./FormShell";
import { Checkbox, Field, Radio, TextArea, TextInput } from "./inputs";
import { toast } from "sonner";

const schema = z.object({
  department: z.string().min(1),
  date: z.string().min(1),
  shift: z.enum(["AM", "PM"]),
  absenteeism: z.string().optional().default(""),
  personnelAllOnTime: z.boolean().default(false),
  personnelLateExplain: z.string().optional(),
  efficiencyAffected: z.boolean().default(false),
  efficiencyExplain: z.string().optional(),
  equipmentOperational: z.boolean().default(false),
  equipmentReason: z.string().optional(),
  equipmentAction: z.string().optional(),
  incidentsReported: z.boolean().default(false),
  incidentsWhyNot: z.string().optional(),
  supervisorName: z.string().optional(),
  supervisorDate: z.string().optional(),
  managerName: z.string().optional(),
  managerDate: z.string().optional(),
});

export type DailyAirportStatusReportValues = z.input<typeof schema>;

export default function DailyAirportStatusReportForm() {
  const { register, handleSubmit, watch, reset } =
    useForm<DailyAirportStatusReportValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        shift: "AM",
      },
    });

  const onSubmit = handleSubmit((data) => {
    console.log("DailyAirportStatusReport", data);
    toast.success("Saved Daily Airport Status Report");
  });

  const personnelAllOnTime = watch("personnelAllOnTime");
  const efficiencyAffected = watch("efficiencyAffected");
  const equipmentOperational = watch("equipmentOperational");
  const incidentsReported = watch("incidentsReported");

  return (
    <FormShell
      title="Daily Airport Status Report"
      description="Operational status snapshot for shift"
      onSubmit={onSubmit}
      actions={
        <button
          type="button"
          className="rounded-xl border px-3 py-2"
          onClick={() => reset()}
        >
          Reset
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Department">
          <TextInput
            placeholder="e.g. Operations"
            register={register("department")}
          />
        </Field>
        <Field label="Date">
          <TextInput type="date" register={register("date")} />
        </Field>
      </div>

      <Field label="Shift">
        <div className="flex gap-4">
          <Radio
            label="A.M."
            value="AM"
            register={register("shift")}
            defaultChecked
          />
          <Radio label="P.M." value="PM" register={register("shift")} />
        </div>
      </Field>

      <Field label="Absenteeism">
        <TextArea placeholder="Notes" register={register("absenteeism")} />
      </Field>

      <div className="rounded-xl border p-4">
        <p className="mb-2 text-sm font-medium">Personnel</p>
        <div className="grid gap-3">
          <Checkbox
            label="All persons scheduled reported on time"
            register={register("personnelAllOnTime")}
          />
          {!personnelAllOnTime ? (
            <Field label="If No, please explain">
              <TextArea register={register("personnelLateExplain")} />
            </Field>
          ) : null}
          <Checkbox
            label="Status or efficiency affected"
            register={register("efficiencyAffected")}
          />
          {efficiencyAffected ? (
            <Field label="If Yes, please explain">
              <TextArea register={register("efficiencyExplain")} />
            </Field>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <p className="mb-2 text-sm font-medium">Equipment</p>
        <div className="grid gap-3">
          <Checkbox
            label="All equipment operational"
            register={register("equipmentOperational")}
          />
          {!equipmentOperational ? (
            <>
              <Field label="If No, state reason">
                <TextArea register={register("equipmentReason")} />
              </Field>
              <Field label="Action taken to remedy">
                <TextArea register={register("equipmentAction")} />
              </Field>
            </>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <p className="mb-2 text-sm font-medium">Incidents / Accidents</p>
        <div className="grid gap-3">
          <Checkbox
            label="All incident/accident reports prepared and submitted"
            register={register("incidentsReported")}
          />
          {!incidentsReported ? (
            <Field label="If No, why not?">
              <TextArea register={register("incidentsWhyNot")} />
            </Field>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Supervisor's Name">
          <TextInput register={register("supervisorName")} />
        </Field>
        <Field label="Supervisor's Date">
          <TextInput type="date" register={register("supervisorDate")} />
        </Field>
        <Field label="Manager's Name">
          <TextInput register={register("managerName")} />
        </Field>
        <Field label="Manager's Date">
          <TextInput type="date" register={register("managerDate")} />
        </Field>
      </div>
    </FormShell>
  );
}

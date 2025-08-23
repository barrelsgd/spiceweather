"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormShell from "./FormShell";
import { Checkbox, Field, Radio, TextArea, TextInput } from "./inputs";
import { toast } from "sonner";

const leaveTypes = [
  "Annual Vacation",
  "Maternity Leave",
  "Professional Appointment",
  "Family Bereavement",
  "Paternity Leave",
  "Other",
] as const;

const schemaLeave = z.object({
  employeeName: z.string().min(1),
  department: z.string().min(1),
  request: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  leaveType: z.enum(leaveTypes),
  otherReason: z.string().optional(),
  salaryAdvance: z.boolean().default(false),
  whereSpent: z.string().optional(),
  whereFrom: z.string().optional(),
  whereTo: z.string().optional(),
  actingAppointment: z.boolean().default(false),
});

export type LeaveOfAbsenceValues = z.input<typeof schemaLeave>;

export default function LeaveOfAbsenceForm() {
  const { register, handleSubmit, watch, reset } =
    useForm<LeaveOfAbsenceValues>({ resolver: zodResolver(schemaLeave) });
  const leaveType = watch("leaveType");

  const onSubmit = handleSubmit((data) => {
    console.log("LeaveOfAbsence", data);
    toast.success("Saved Leave of Absence");
  });

  return (
    <FormShell
      title="Application for Leave of Absence"
      description="Employee leave request"
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
        <Field label="Employee Name">
          <TextInput register={register("employeeName")} />
        </Field>
        <Field label="Department">
          <TextInput register={register("department")} />
        </Field>
        <Field label="Request">
          <TextInput placeholder="e.g. 5 days" register={register("request")} />
        </Field>
        <Field label="Start Date">
          <TextInput type="date" register={register("startDate")} />
        </Field>
        <Field label="End Date">
          <TextInput type="date" register={register("endDate")} />
        </Field>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-medium">Type of Leave</p>
        <div className="grid gap-2 md:grid-cols-2">
          {leaveTypes.map((t) => (
            <Radio
              key={t}
              label={t}
              value={t}
              register={register("leaveType")}
            />
          ))}
        </div>
        {leaveType === "Other" ? (
          <Field label="Please state reason">
            <TextArea register={register("otherReason")} />
          </Field>
        ) : null}
      </div>

      <div className="grid gap-3">
        <Checkbox
          label="Salary in advance"
          register={register("salaryAdvance")}
        />
        <Field label="Where is the leave to be spent">
          <TextArea
            placeholder="City / Country / Address"
            register={register("whereSpent")}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="From">
            <TextInput type="date" register={register("whereFrom")} />
          </Field>
          <Field label="To">
            <TextInput type="date" register={register("whereTo")} />
          </Field>
        </div>
        <Checkbox
          label="Will require an acting appointment"
          register={register("actingAppointment")}
        />
      </div>
    </FormShell>
  );
}

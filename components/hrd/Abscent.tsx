"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormShell from "./FormShell";
import { Checkbox, Field, TextArea, TextInput } from "./inputs";
import { toast } from "sonner";

const schemaAbsentee = z.object({
  employeeName: z.string().min(1),
  date: z.string().min(1),
  department: z.string().min(1),
  reasonUncertifiedSick: z.boolean().default(false),
  reasonIllnessJob: z.boolean().default(false),
  reasonIllnessFamily: z.boolean().default(false),
  reasonTimeOff: z.boolean().default(false),
  reasonOther: z.boolean().default(false),
  reasons: z.array(z.string()).optional(),
});

export type AbsenteeReportValues = z.input<typeof schemaAbsentee>;

export default function AbsenteeReportForm() {
  const { register, handleSubmit, reset } = useForm<AbsenteeReportValues>({
    resolver: zodResolver(schemaAbsentee),
    defaultValues: {
      employeeName: "",
      date: "",
      department: "",
      reasonUncertifiedSick: false,
      reasonIllnessJob: false,
      reasonIllnessFamily: false,
      reasonTimeOff: false,
      reasonOther: false,
      reasons: [],
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log("AbsenteeReport", data);
    toast.success("Saved Absentee Report");
  });

  return (
    <FormShell
      title="Absentee Report"
      description="Daily absence reason capture"
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field label="Employee Name">
          <TextInput register={register("employeeName")} />
        </Field>
        <Field label="Department">
          <TextInput register={register("department")} />
        </Field>
        <Field label="Date">
          <TextInput type="date" register={register("date")} />
        </Field>
      </div>

      <div className="rounded-xl border p-4">
        <p className="mb-2 text-sm font-medium">Check Reason</p>
        <div className="grid gap-2 md:grid-cols-2">
          <Checkbox
            label="Uncertified Sick"
            register={register("reasonUncertifiedSick")}
          />
          <Checkbox
            label="Illness on the Job"
            register={register("reasonIllnessJob")}
          />
          <Checkbox
            label="Illness (family member)"
            register={register("reasonIllnessFamily")}
          />
          <Checkbox label="Time Off" register={register("reasonTimeOff")} />
          <Checkbox label="Other" register={register("reasonOther")} />
        </div>
      </div>

      <Field label="Reason(s)">
        <TextArea register={register("reasons.0")} placeholder="Details" />
      </Field>
      <TextArea
        register={register("reasons.1")}
        placeholder="Additional details (optional)"
      />
      <TextArea
        register={register("reasons.2")}
        placeholder="Additional details (optional)"
      />
    </FormShell>
  );
}

"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormShell from "./FormShell";
import { Checkbox, Field, TextArea, TextInput } from "./inputs";
import { toast } from "sonner";

const schemaShift = z.object({
  department: z.string().min(1),
  requestingEmployee: z.string().min(1),
  otherEmployee: z.string().min(1),
  requestedDateShift: z.string().min(1),
  returnShiftDate: z.string().min(1),
  reasons: z.string().optional(),
  supervisorRecommendYes: z.boolean().default(false),
  supervisorRecommendNo: z.boolean().default(false),
  supervisorReason: z.string().optional(),
});

export type ShiftExchangeValues = z.input<typeof schemaShift>;

export default function ShiftExchangeForm() {
  const { register, handleSubmit, reset, watch } = useForm<ShiftExchangeValues>(
    { resolver: zodResolver(schemaShift) }
  );
  const recommendNo = watch("supervisorRecommendNo");

  const onSubmit = handleSubmit((data) => {
    console.log("ShiftExchange", data);
    toast.success("Saved Shift Exchange Requisition");
  });

  return (
    <FormShell
      title="Shift Exchange Requisition"
      description="Request to swap shifts"
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
          <TextInput register={register("department")} />
        </Field>
        <Field label="Requesting Employee">
          <TextInput register={register("requestingEmployee")} />
        </Field>
        <Field label="Employee to Exchange With">
          <TextInput register={register("otherEmployee")} />
        </Field>
        <Field label="Date & Shift Requested">
          <TextInput
            type="datetime-local"
            register={register("requestedDateShift")}
          />
        </Field>
        <Field label="Date of Return Shift">
          <TextInput
            type="datetime-local"
            register={register("returnShiftDate")}
          />
        </Field>
      </div>

      <Field label="Reason(s) for request">
        <TextArea register={register("reasons")} />
      </Field>

      <div className="rounded-xl border p-4">
        <p className="mb-2 text-sm font-medium">Supervisor's Recommendation</p>
        <div className="flex flex-wrap gap-4">
          <Checkbox label="Yes" register={register("supervisorRecommendYes")} />
          <Checkbox label="No" register={register("supervisorRecommendNo")} />
        </div>
        {recommendNo ? (
          <Field label="If No, reason(s)">
            <TextArea register={register("supervisorReason")} />
          </Field>
        ) : null}
      </div>
    </FormShell>
  );
}

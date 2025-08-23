"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormShell from "./FormShell";
import { Field, Radio, TextArea, TextInput } from "./inputs";
import { toast } from "sonner";

const actions = [
  "New Permit",
  "Annual Renewal",
  "Replacement",
  "Information Change",
  "Other",
] as const;

const schemaParking = z.object({
  companyName: z.string().min(1),
  date: z.string().min(1),
  employeeName: z.string().min(1),
  phone: z.string().min(1),
  vehicleReg: z.string().min(1),
  insuranceIssue: z.string().min(1),
  insuranceExpiry: z.string().min(1),
  actionRequested: z.enum(actions),
  otherAction: z.string().optional(),
});

export type ParkingAccessValues = z.input<typeof schemaParking>;

export default function ParkingAccessApplicationForm() {
  const { register, handleSubmit, watch, reset } = useForm<ParkingAccessValues>(
    { resolver: zodResolver(schemaParking) }
  );
  const action = watch("actionRequested");

  const onSubmit = handleSubmit((data) => {
    console.log("ParkingAccess", data);
    toast.success("Saved Parking Access Application");
  });

  return (
    <FormShell
      title="Parking Access Application"
      description="Vehicle decal request"
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
        <Field label="Company Name">
          <TextInput register={register("companyName")} />
        </Field>
        <Field label="Date">
          <TextInput type="date" register={register("date")} />
        </Field>
        <Field label="Employee Name">
          <TextInput register={register("employeeName")} />
        </Field>
        <Field label="Phone">
          <TextInput register={register("phone")} />
        </Field>
        <Field label="Vehicle Registration No.">
          <TextInput register={register("vehicleReg")} />
        </Field>
        <Field label="Insurance Issue Date">
          <TextInput type="date" register={register("insuranceIssue")} />
        </Field>
        <Field label="Insurance Expiry Date">
          <TextInput type="date" register={register("insuranceExpiry")} />
        </Field>
      </div>

      <div className="grid gap-2">
        <p className="text-sm font-medium">Action Requested</p>
        <div className="grid gap-2 md:grid-cols-2">
          {actions.map((a) => (
            <Radio
              key={a}
              label={a}
              value={a}
              register={register("actionRequested")}
            />
          ))}
        </div>
        {action === "Other" ? (
          <Field label="Please specify">
            <TextArea register={register("otherAction")} />
          </Field>
        ) : null}
      </div>
    </FormShell>
  );
}

"use client";
import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(
  props: InputHTMLAttributes<HTMLInputElement> & {
    register?: UseFormRegisterReturn;
  }
) {
  const { register, className, ...rest } = props;
  return (
    <input
      className={"h-10 rounded-xl border px-3 " + (className ?? "")}
      {...register}
      {...rest}
    />
  );
}

export function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & {
    register?: UseFormRegisterReturn;
  }
) {
  const { register, className, ...rest } = props;
  return (
    <textarea
      className={"min-h-[96px] rounded-xl border p-3 " + (className ?? "")}
      {...register}
      {...rest}
    />
  );
}

export function Select(
  props: SelectHTMLAttributes<HTMLSelectElement> & {
    register?: UseFormRegisterReturn;
  }
) {
  const { register, className, children, ...rest } = props;
  return (
    <select
      className={"h-10 rounded-xl border px-3 " + (className ?? "")}
      {...register}
      {...rest}
    >
      {children}
    </select>
  );
}

export function Checkbox({
  label,
  register,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  register?: UseFormRegisterReturn;
}) {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        className="size-4 rounded border"
        {...register}
        {...rest}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export function Radio({
  label,
  register,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  register?: UseFormRegisterReturn;
}) {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="radio"
        className="size-4 rounded-full border"
        {...register}
        {...rest}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

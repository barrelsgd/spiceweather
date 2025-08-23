"use client";

import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { Form } from "radix-ui";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { subscribe } from "@/app/actions/subscribe";
import { Input } from "@/components/root/input";

const initialState = {
  message: "",
  error: "",
};

export const emailRegex = /.+@.+/u;

export const MailingList = () => {
  const [state, formAction, isPending] = useActionState(
    subscribe,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state.message]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <Form.Root action={formAction} className="relative mt-6">
      <Input
        className="pr-8"
        id="email"
        label="Email address"
        name="email"
        pattern={emailRegex.source}
        placeholder="jane@acme.com"
        required
        type="email"
      />

      <Form.Submit asChild>
        <button
          className="absolute right-0 bottom-0 flex aspect-square size-9 cursor-pointer items-center justify-center rounded-full"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <ArrowRightIcon size={16} />
          )}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

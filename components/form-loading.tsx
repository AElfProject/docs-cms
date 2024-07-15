"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export function FormLoading({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  if (pending)
    return (
      <Button
        {...props}
        className={clsx(
          props.className,
          "inline-flex justify-center whitespace-nowrap"
        )}
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );

  return (
    <Button {...props} type="submit">
      {children}
    </Button>
  );
}

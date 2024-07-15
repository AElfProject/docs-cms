"use client";

import { format } from "date-fns";

export function DateModified({ date }: { date: Date }) {
  return (
    <p className="my-4 text-right">
      Edited on: {format(date, "d LLLL yyyy hh:mm:ss O")}
    </p>
  );
}

"use client";

import { TalksSignalDots, type TalksSignalDotsProps } from "./talks-signal-dots";

/** @deprecated Prefer `TalksSignalDots` with `variant="typing"` for new code. */
export function TalksTypingIndicator(props: Omit<TalksSignalDotsProps, "variant">) {
  return <TalksSignalDots variant="typing" {...props} />;
}

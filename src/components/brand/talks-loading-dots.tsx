"use client";

import { TalksSignalDots, type TalksSignalDotsProps } from "@/components/brand/talks-signal-dots";

export type TalksLoadingDotsProps = Omit<TalksSignalDotsProps, "variant">;

/**
 * Three-dot loading — delegates to `TalksSignalDots` (`loading`) for brand-consistent,
 * premium motion (`TALKS_EASE`, reduced-motion safe). Pass `label` for screen readers.
 */
export function TalksLoadingDots(props: TalksLoadingDotsProps) {
  return <TalksSignalDots variant="loading" {...props} />;
}

import { TalksAppShell } from "@/components/shell/talks-app-shell";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return <TalksAppShell>{children}</TalksAppShell>;
}

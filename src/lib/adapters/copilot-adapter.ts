import { buildMinimizedCloudContext } from "@/lib/copilot/context-reduction";
import { runLocalProtocolAnalysis } from "@/lib/copilot/local-insights";
import {
  DEFAULT_COPILOT_MODE,
  type CopilotAnalysisResult,
  type CopilotIntelligenceMode,
} from "@/lib/copilot/types";
import type { ProtocolThread } from "@/lib/memory/types";

/**
 * Protocol Copilot port — **privacy-first**: local analysis default; cloud is opt-in later.
 */
export interface ProtocolCopilotPort {
  readonly mode: CopilotIntelligenceMode;
  analyze(protocol: ProtocolThread): CopilotAnalysisResult;
}

/**
 * Mock implementation: local heuristics only. `redactedSnapshot` illustrates minimisation
 * for settings / transparency UI — nothing is transmitted in preview builds.
 */
export function createMockProtocolCopilot(mode: CopilotIntelligenceMode = DEFAULT_COPILOT_MODE): ProtocolCopilotPort {
  return {
    mode,
    analyze(protocol) {
      const insights = runLocalProtocolAnalysis(protocol, mode);
      const redactedSnapshot =
        mode === "off"
          ? undefined
          : buildMinimizedCloudContext(protocol, { maxLines: mode === "cloud_enhanced" ? 6 : 4 });

      return { mode, insights, redactedSnapshot };
    },
  };
}

export const mockProtocolCopilot = createMockProtocolCopilot(DEFAULT_COPILOT_MODE);

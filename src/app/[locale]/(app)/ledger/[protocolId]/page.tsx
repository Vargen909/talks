import { LedgerView } from "@/components/ledger/ledger-view";

type LedgerPageProps = {
  params: Promise<{ protocolId: string }>;
};

export default async function LedgerPage({ params }: LedgerPageProps) {
  const { protocolId } = await params;

  return <LedgerView protocolId={protocolId} />;
}

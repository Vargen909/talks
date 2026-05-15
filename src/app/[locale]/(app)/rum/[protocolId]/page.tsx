import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ protocolId: string }>;
};

/** Agreement Room alias — huvudboken (`/ledger`) är rummet per ärende. */
export default async function AgreementRoomAliasPage({ params }: Props) {
  const { protocolId } = await params;
  const locale = await getLocale();
  redirect(`/${locale}/ledger/${protocolId}`);
}

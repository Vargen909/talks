export type MemoryMessage = {
  id: string;
  content: string;
  createdAt: string;
  verified_status: boolean;
  agreement_id?: string;
};

export type ProtocolThread = {
  id: string;
  title: string;
  lastInteractionAt: string;
  summary: string;
  lastMessages: MemoryMessage[];
};

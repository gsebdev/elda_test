export type SlotType = {
  id: number;
  title: string;
  startDateTime: string;
  endDateTime: string;
  slotTemplate: string | null;
  description?: string | null;
  employees?: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roleDetails?: {
      id: number;
      name: string;
    };
  }>;
  createdAt: Date;
  updatedAt: Date;
};

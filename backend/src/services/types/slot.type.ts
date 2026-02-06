export type SlotType = {
  id: number;
  title: string;
  startDateTime: Date;
  endDateTime: Date;
  slotTemplate: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SlotWithEmployeeType = SlotType & {
  employees?: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roleDetails?: {
      id: number;
      name: string;
    };
  }> | null;
};

export type CreateSlotType = {
  title: string;
  description?: string | null;
  employeeIds?: number[] | null;
  slotTemplate?: string | null;
  startDateTime: Date;
  endDateTime?: Date | null;
};

export type UpdateSlotType = Partial<CreateSlotType>;

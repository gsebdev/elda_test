export type SlotType = {
  id: number;
  startDateTime: Date;
  endDateTime: Date;
  description?: string | null;
  employeeId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SlotWithEmployeeType = SlotType & {
  employee?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roleDetails?: {
      id: number;
      name: string;
    };
  } | null;
};

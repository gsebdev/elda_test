export type EmployeeType = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  roleDetails: {
    id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type EmployeeDetailsType = {
  lastName: string;
  firstName: string;
  email: string;
  roleDetails?: {
    id?: number;
    name: string;
  };
};

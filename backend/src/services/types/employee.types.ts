export type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type EmployeeWithRoleType = EmployeeType & {
  roleDetails?: {
    id: number;
    name: string;
  };
};

export type EmployeeType = {
    lastName: string;
    fistName: string;
    email: string;
    roleDetails: {
        id: number;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
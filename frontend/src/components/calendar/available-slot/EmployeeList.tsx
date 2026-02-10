import { Plus } from 'lucide-react';
import type { EmployeeDetailsType } from '../../../types/EmployeeType';
import EmployeeAvatar from '../../employees/EmployeeAvatar';

interface EmployeeListProps {
  employees?: EmployeeDetailsType[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
  if (!employees || employees.length === 0) return null;

  return (
    <div className="text-xs font-bold text-gray-500 mt-1 uppercase justify-self-end flex gap-1 cursor-pointer">
      {employees &&
        employees.map((employee: EmployeeDetailsType) => (
          <EmployeeAvatar
            key={`${employee.firstName}-${employee.lastName}`}
            firstName={employee.firstName}
            lastName={employee.lastName}
          />
        ))}
      <div className="h-6 w-6 text-cyan-500">
        <Plus />
      </div>
    </div>
  );
};

export default EmployeeList;

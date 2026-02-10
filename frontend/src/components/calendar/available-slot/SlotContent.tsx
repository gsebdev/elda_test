import type { EmployeeDetailsType } from '../../../types/EmployeeType';
import EmployeeList from './EmployeeList';

interface SlotContentProps {
  title: string;
  description?: string | null;
  employees: EmployeeDetailsType[] | undefined;
}

const SlotContent = ({ title, description, employees }: SlotContentProps) => (
  <div className="h-full border border-cyan-300 text-cyan-800 text-xs rounded bg-cyan-100 p-1 grid gap-1">
    <div>
      <div>{title}</div>
      {description && <div className="text-xxs text-cyan-600 mt-1">{description}</div>}
    </div>
    <div>
      <EmployeeList employees={employees} />
    </div>
  </div>
);

export default SlotContent;

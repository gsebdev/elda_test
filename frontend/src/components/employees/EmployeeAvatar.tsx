import { getEmployeeInitials } from '../../lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface EmployeeAvatarProps {
  firstName: string;
  lastName: string;
}

const EmployeeAvatar = ({ firstName, lastName }: EmployeeAvatarProps) => {
  const initials = getEmployeeInitials(firstName, lastName);
  const fullName = `${firstName} ${lastName}`;

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <div className="rounded-full bg-neutral-500 text-white h-6 w-6 flex items-center justify-center">
          {initials}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{fullName}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EmployeeAvatar;

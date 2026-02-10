import { PlusCircle } from 'lucide-react';

interface AddSlotButtonProps {
  onClick?: () => void;
}

const AddSlotButton = ({ onClick }: AddSlotButtonProps) => (
  <span className="flex flex-col items-center" onClick={onClick}>
    <PlusCircle />
    Ajouter
  </span>
);

export default AddSlotButton;

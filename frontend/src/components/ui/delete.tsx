import { Trash2 } from 'lucide-react';
import type { MouseEvent } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

interface DeleteButtonProps {
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton = ({ onDelete }: DeleteButtonProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <button
        className="text-red-400 hover:text-red-600 absolute top-2 right-2 cursor-pointer z-10"
        aria-label="Supprimer le créneau"
      >
        <Trash2 size={18} />
      </button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible. Cela supprimera définitivement le créneau.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete}>Supprimer</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteButton;

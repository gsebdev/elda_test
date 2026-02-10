import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSlot,
  deleteSlot,
  fetchSlotById,
  fetchSlots,
  fetchSlotTemplates,
} from '../queries/slots';

export function useSlotTemplates() {
  return useQuery({
    queryKey: ['slotTemplates'],
    queryFn: fetchSlotTemplates,
  });
}

export function useSlots() {
  return useQuery({
    queryKey: ['slots'],
    queryFn: fetchSlots,
  });
}

export function useSlotById(id: number) {
  return useQuery({
    queryKey: ['slot', id],
    queryFn: () => fetchSlotById(id),
  });
}

export function useCreateSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
  });
}

export function useDeleteSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
  });
}

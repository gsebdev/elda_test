import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createRole, fetchRole, fetchRoles } from '../queries/roles'
import type { Role } from '../types/Role'

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  })
}


export function useRole(id: number) {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: () => fetchRole(id),
    enabled: !!id,
  })
}

export function useCreateRole() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      queryClient.setQueryData(['roles'], (old: Role[]) => [...old, data]);
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  })
}
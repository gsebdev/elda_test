import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createEmployee, fetchEmployee, fetchEmployees } from '../queries/employees.ts'

export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  })
}


export function useEmployee(id: number) {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => fetchEmployee(id),
    enabled: !!id,
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })
}
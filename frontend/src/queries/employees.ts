import type { Employee } from "../types/Employee"

export async function fetchEmployees() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`);
  
  if (!response.ok) throw new Error('Erreur lors du chargement');
  
  const data = await response.json();
  
  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function fetchEmployee(id: number) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/employees/${id}`);
  
  if (!response.ok) throw new Error('Employé non trouvé');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function createEmployee(employee: Employee) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  })
  
  if (!response.ok) throw new Error('Erreur lors de la création');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}
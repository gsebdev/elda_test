import type { Role } from "../types/Role"

export async function fetchRoles() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/roles`);
  
  if (!response.ok) throw new Error('Erreur lors du chargement des postes');
  
  const data = await response.json();
  
  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function fetchRole(id: number) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/roles/${id}`);
  
  if (!response.ok) throw new Error('Poste non trouvé');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function createRole(Roles: Role) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/roles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Roles),
  })
  
  if (!response.ok) throw new Error('Erreur lors de la création du poste');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}
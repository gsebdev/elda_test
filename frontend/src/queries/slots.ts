export async function fetchSlotTemplates() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/slots/templates`);

  if (!response.ok) throw new Error('Erreur lors du chargement des modèles de créneaux');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function fetchSlots() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/slots`);

  if (!response.ok) throw new Error('Erreur lors du chargement des créneaux');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function fetchSlotById(id: number) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/slots/${id}`);

  if (!response.ok) throw new Error('Erreur lors du chargement du créneau');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function createSlot(slotData: {
  title: string;
  startDateTime: string;
  endDateTime?: string;
  slotTemplate?: string;
  description?: string;
  employeeIds?: number[];
}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/slots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slotData),
  });

  if (!response.ok) throw new Error('Erreur lors de la création du créneau');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function updateSlot(
  id: number,
  slotData: {
    title?: string;
    startDateTime?: string;
    endDateTime?: string;
    description?: string | null;
    employeeIds?: number[];
  },
) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/slots/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slotData),
  });

  if (!response.ok) throw new Error('Erreur lors de la mise à jour du créneau');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

export async function deleteSlot(id: number) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/slots/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Erreur lors de la suppression du créneau');

  const data = await response.json();

  if (!data.success) throw new Error(data.error);

  return data.data;
}

import type { Request, Response } from 'express';

export const getRoles = async (req: Request, res: Response) => {
  res.json('roles');
};

export const getRoleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(`role ${id}`);
};

export const createRole = async (req: Request, res: Response) => {
  res.status(201).json('role created');
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(`role ${id} updated`);
};

export const removeRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(`role ${id} deleted`);
};

import { useEffect, useState } from 'react';
import { EmployeesTable } from '../components/employees/EmployeesTable';
import { Input } from '../components/ui/input';
import { useEmployees } from '../hooks/employees';
import CreateEmployeeForm from '../components/employees/CreateEmployeeForm';
import RoleSelector from '../components/roles/RoleSelector';
import { useRoles } from '../hooks/roles';
import type { Table } from '@tanstack/react-table';
import type { EmployeeType } from '../types/EmployeeType';

function Employees() {
  const { data: employees, isLoading, error } = useEmployees();
  const { data: roles } = useRoles();
  const [table, setTable] = useState<Table<EmployeeType> | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [rolesFilter, setRolesfilter] = useState<number | null>(null);

  useEffect(() => {
    if (globalFilter && table) table.setGlobalFilter(globalFilter);
  }, [globalFilter, table]);

  useEffect(() => {
    if (typeof rolesFilter === 'number' && table)
      table.getColumn('roleDetails')?.setFilterValue(rolesFilter);
  }, [rolesFilter, table]);

  if (isLoading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur : {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <h1>Employés</h1>
      <section className="pt-12">
        <div className="flex gap-8 justify-between items-center flex-wrap py-4">
          <div className="w-full max-w-sm">
            <label className="block text-xs font-bold mb-2">Rechercher un employé</label>
            <Input
              placeholder="Nom ou prénom"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value || '')}
            />
          </div>
          <div className="flex gap-8 items-end">
            {table && (
              <div>
                <label className="text-xs font-bold mb-2 block">Trier par poste</label>
                <RoleSelector roles={roles} onChange={setRolesfilter} />
              </div>
            )}
            <CreateEmployeeForm />
          </div>
        </div>
        <EmployeesTable data={employees || []} onTableReady={setTable} />
      </section>
    </div>
  );
}

export default Employees;

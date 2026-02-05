import { useState } from "react";
import { EmployeesTable } from "../components/employees/EmployeesTable";
import { Input } from "../components/ui/input";
import { useEmployees } from "../hooks/useEmployees";
import CreateEmployeeForm from "../components/employees/CreateEmployeeForm";

function Employees() {
    const { data: employees, isLoading, error } = useEmployees();
    const [globalFilter, setGlobalFilter] = useState<string>('');

    if (isLoading) return <div className="p-4">Chargement...</div>
    if (error) return <div className="p-4 text-red-500">Erreur : {error.message}</div>

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold">Employés</h1>
            <section className="pt-12">
                <div className="flex justify-between items-center py-4">
                    <Input
                        placeholder="Rechercher un employé..."
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value || '')}
                        className="max-w-sm"
                    />
                    <div>
                        <CreateEmployeeForm />
                    </div>
                </div>
                <EmployeesTable
                    data={employees || []}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </section>
        </div>
    );
}

export default Employees;
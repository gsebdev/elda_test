import { DataTable } from "../components/data-table";
import { Button } from "../components/ui/button";
import { useEmployees } from "../hooks/useEmployees";
import type { Employee } from "../types/Employee";
import { ArrowUpDown } from "lucide-react"

function Employees() {
    const { data: employees, isLoading, error } = useEmployees();

    if (isLoading) return <div className="p-4">Chargement...</div>
    if (error) return <div className="p-4 text-red-500">Erreur : {error.message}</div>

    return (
        <>
            <h1 className="text-4xl font-bold">Employés</h1>
            <section className="pt-12">
                <DataTable<Employee, unknown>
                    columns={[
                        { accessorKey: "firstName", header: "Prénom" },
                        { accessorKey: "lastName", header: "Nom" },
                        {
                            accessorKey: "email", header: ({ column }) => {
                                return (
                                    <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                    >
                                        Email
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                )
                            },
                        },
                        { accessorKey: "roleDetails.name", header: "Rôle" },
                    ]}
                    data={employees || []}
                />
            </section>
        </>
    );
}

export default Employees;
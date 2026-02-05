import type { SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import type { EmployeeFormData } from "../../schemas/createEmployeeSchema";

interface EmployeesProps {
  data: EmployeeFormData[],
  globalFilter: string,
  setGlobalFilter: Dispatch<SetStateAction<string>>
}

export function EmployeesTable({
  data,
  globalFilter,
  setGlobalFilter
}: EmployeesProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const employeeColumns = [
    { accessorKey: "firstName", header: "Prénom" },
    { accessorKey: "lastName", header: "Nom" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "roleDetails.name", header: "Poste" },
  ];

  const table = useReactTable({
    data,
    columns: employeeColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _, filterValue) => {
      const id = row.getValue('firstName')?.toString().toLowerCase() || '';
      const userId = row.getValue('lastName')?.toString().toLowerCase() || '';
      const searchTerm = filterValue.toLowerCase();
      return id.includes(searchTerm) || userId.includes(searchTerm);
    },
    state: {
      sorting,
      globalFilter,
    },
  })

  return (
    <div className="overflow-hidden rounded-md border shadow-xl">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const column = header.getContext().column;
                return (
                  <TableHead key={header.id} className="text-nowrap">
                    <>{column.columnDef.header}</>
                    <Button
                      className="ml-2"
                      variant="ghost"
                      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={employeeColumns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
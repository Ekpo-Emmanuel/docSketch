'use client'

import React, { useState } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from '@/components/ui/button'
import {ChevronsLeft, ChevronsRight, ChevronLast, ChevronFirst} from 'lucide-react'



interface Props {}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TDAta, TValue>({
    columns,
    data,
}: DataTableProps<TDAta, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
              pageIndex: 0, 
              pageSize: 20, 
            },
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <div className="">
            <div className="flex items-center justify-end space-x-2 mb-6">
                <button
                    className={`flex items-center justify-center px-2 h-8 text-[12px] font-medium text-black bg-gray-100 rounded-lg ${!table.getCanPreviousPage() ? 'bg-slate-50' : 'hover:bg-gray-100'}`}
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronFirst  size={14} strokeWidth={2} />
                </button>
                <button 
                    className={`flex items-center justify-center px-2 h-8 text-[12px] font-medium text-black bg-gray-100 rounded-lg ${!table.getCanPreviousPage() ? 'bg-slate-50' : 'hover:bg-gray-100'}`}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                        Previous
                </button>
                <button 
                    className={`flex items-center justify-center px-2 h-8 text-[12px] font-medium text-black bg-gray-100 rounded-lg ${!table.getCanNextPage() ? 'bg-slate-50' : 'hover:bg-gray-100'}`}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
                <button
                    className={`flex items-center justify-center px-2 h-8 text-[12px] font-medium text-black bg-gray-100 rounded-lg ${!table.getCanNextPage() ? 'bg-slate-50' : 'hover:bg-gray-100'}`}
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronLast size={14} strokeWidth={2} />
                </button>
                <select
                    className="block text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        {pageSize}
                        </option>
                    ))}
                </select>
                <div className="flex">

                </div>
            </div>
            <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup: { id: React.Key | null | undefined; headers: any[] }) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: { id: React.Key | null | undefined; isPlaceholder: any; column: { columnDef: { header: any } }; getContext: () => any }) => {
                    return (
                        <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: { id: React.Key | null | undefined; getIsSelected: () => any; getVisibleCells: () => any[] }) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell: { id: React.Key | null | undefined; column: { columnDef: { cell: any } }; getContext: () => any }) => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>

        </div>
      )
}


export default DataTable
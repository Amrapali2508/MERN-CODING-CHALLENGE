"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {DataTableFacetedFilter} from "./datafilter"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../components/ui/table";
import { Input } from "./../../components/ui/input";
import { useMemo, useState } from "react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./../../components/ui/dropdown-menu";
import { Button } from "./../../components/ui/button";
import { Label } from "./../../components/ui/label";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

/**
 * @typedef {Object} DataTableProps
 * @property {ColumnDef[]} columns
 * @property {Object[]} data
 */

/**
 * @param {DataTableProps} props
 */

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState ([]);
  const [columnFilters, setColumnFilters] = useState ([]);
  const [columnVisibility, setColumnVisibility] =
    useState ();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Filters */}
        <div className="flex items-center w-full py-4">
          <Label className="pr-4">Search</Label>
          <Input
            placeholder="Search here..."
            value={table.getColumn("title")?.getFilterValue() || table.getColumn("description")?.getFilterValue() || table.getColumn("price")?.getFilterValue()}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value) || table.getColumn("description")?.setFilterValue(event.target.value) || table.getColumn("price")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
            <Button variant={"outline"} className="ml-auto">
              <span className="flex items-center gap-2">
                <MixerHorizontalIcon />
                Month
              </span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Month</DropdownMenuLabel>
              <DropdownMenuItem>
              {table.getColumn("dateOfSale") && (
                <DataTableFacetedFilter
                column={table.getColumn("dateOfSale")}
                title="Month"
                // option={dateOfSale}
                />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>

        {/* Column Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="ml-auto">
              <span className="flex items-center gap-2">
                <MixerHorizontalIcon />
                View
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select columns</DropdownMenuLabel>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <Table className="border shadow-2xl">
        <TableHeader className="bg-backgroundColor">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

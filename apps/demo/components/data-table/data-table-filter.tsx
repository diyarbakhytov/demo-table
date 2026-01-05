"use client";

import * as React from "react";

import { X } from "lucide-react";

import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableSortList } from "./data-table-sort-list";

import type { Column, Table } from "@tanstack/react-table";

interface DataTableToolbarFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableFilter<TData>({ table }: DataTableToolbarFilterProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <DataTableSortList table={table} />

      {columns.map((column) => (
        <RenderFilter column={column} key={column.id} />
      ))}
      {isFiltered && (
        <Button
          aria-label="Reset filters"
          className="border-dashed"
          onClick={onReset}
          variant="outline"
        >
          <X />
          Reset
        </Button>
      )}
    </div>
  );
}

function RenderFilter<TData>({ column }: { column: Column<TData> }) {
  const columnMeta = column.columnDef.meta;

  const onFilterRender = React.useCallback(() => {
    if (!columnMeta?.filterVariant) return null;

    switch (columnMeta.filterVariant) {
      case "text":
        return <FilterText column={column} />;

      case "dateRange":
        return <DataTableDateFilter column={column} title={columnMeta.label ?? column.id} />;

      case "multiSelect":
        return (
          <DataTableFacetedFilter
            column={column}
            options={columnMeta.options ?? []}
            title={columnMeta.label ?? column.id}
          />
        );

      default:
        return null;
    }
  }, [column, columnMeta]);

  return onFilterRender();
}

function FilterText<TData>({ column }: { column: Column<TData> }) {
  const value = (column.getFilterValue() as Record<string, unknown>)?.["text"] as string;

  return (
    <Input
      className="h-8 w-40 lg:w-56"
      onChange={(event) =>
        column.setFilterValue({
          text: event.target.value,
        })
      }
      placeholder={column.columnDef.meta?.placeholder ?? column.columnDef.meta?.label}
      value={value ?? ""}
    />
  );
}

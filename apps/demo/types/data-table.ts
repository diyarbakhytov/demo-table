import { FilterVariant } from "@/lib/hooks/use-data-table-state";

import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: TData and TValue are used in the ColumnMeta interface
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant: FilterVariant;
    placeholder?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    options?: Option[];
    label?: string;
  }
}

export interface Option {
  label: string;
  value: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

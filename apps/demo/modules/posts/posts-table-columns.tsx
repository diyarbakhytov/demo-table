import type { Column, ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import {
  Book,
  CalendarIcon,
  FileText,
  Hash,
  MoreHorizontal,
  ShieldCheck,
  User2,
} from "lucide-react";

import { AuthorAvatar } from "@/components/author-avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/animate-ui/components/base/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { POST_STATUS_BADGE_CONFIG, PostStatusBadge } from "./post-status-badge";
import { POST_TYPE_BADGE_CONFIG, PostTypeBadge } from "./post-type-badge";
import type { Post } from "./types";

export const postTableColumns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    size: 32,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="ID" />
    ),
    cell: ({ cell }) => (
      <p className="font-medium text-sm">{cell.getValue<Post["id"]>()}</p>
    ),
    meta: {
      label: "ID",
      filterVariant: "text",
      icon: Hash,
    },
    size: 320,
    enableSorting: false,
  },
  {
    id: "author",
    accessorKey: "author",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="Author" />
    ),
    cell: ({ row }) =>
      row.original.author && <AuthorAvatar author={row.original.author} />,
    meta: {
      label: "Author",
      placeholder: "Search authors...",
      filterVariant: "user",
      icon: User2,
    },
    size: 160,
    enableSorting: false,
    enableColumnFilter: true,
  },
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="Title" />
    ),
    cell: ({ cell }) => (
      <p className="truncate font-medium text-sm">
        {cell.getValue<Post["title"]>()}
      </p>
    ),
    meta: {
      label: "Title",
      placeholder: "Search titles...",
      filterVariant: "text",
      icon: FileText,
    },
    size: 320,
    enableColumnFilter: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="Status" />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Post["status"]>();

      return <PostStatusBadge status={status} />;
    },
    meta: {
      label: "Status",
      filterVariant: "multiSelect",
      options: Object.entries(POST_STATUS_BADGE_CONFIG).map(([key, value]) => ({
        label: key,
        value: key,
        icon: value.icon,
      })),
      icon: ShieldCheck,
    },
    size: 120,
    enableColumnFilter: true,
  },
  {
    id: "type",
    accessorKey: "type",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="Type" />
    ),
    cell: ({ cell }) => {
      const type = cell.getValue<Post["type"]>();

      return <PostTypeBadge type={type} />;
    },
    meta: {
      label: "Type",
      filterVariant: "multiSelect",
      options: Object.entries(POST_TYPE_BADGE_CONFIG).map(([key, value]) => ({
        label: key,
        value: key,
        icon: value.icon,
      })),
      icon: Book,
    },
    size: 120,
    enableColumnFilter: true,
  },
  {
    id: "description",
    accessorKey: "description",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="Description" />
    ),
    cell: ({ cell }) => (
      <p className="max-w-xs truncate font-medium text-sm">
        {cell.getValue<Post["description"]>()}
      </p>
    ),
    meta: {
      label: "Description",
      placeholder: "Search descriptions...",
      filterVariant: "text",
      icon: FileText,
    },
    size: 360,
    enableColumnFilter: true,
  },
  {
    id: "preview",
    accessorKey: "preview",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="Preview" />
    ),
    cell: ({ cell }) => (
      <p className="max-w-xs truncate font-medium text-sm">
        {cell.getValue<Post["preview"]>()}
      </p>
    ),
    meta: {
      label: "Preview",
      placeholder: "Search previews...",
      filterVariant: "text",
      icon: FileText,
    },
    size: 320,
    enableColumnFilter: true,
  },
  {
    id: "content",
    accessorKey: "content",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} label="Content" />
    ),
    cell: ({ cell }) => (
      <p className="max-w-xs truncate font-medium text-sm">
        {cell.getValue<Post["content"]>()}
      </p>
    ),
    meta: {
      label: "Content",
      placeholder: "Search content...",
      filterVariant: "text",
      icon: FileText,
    },
    size: 320,
    enableColumnFilter: true,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Created At" />
    ),
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "dd.MM.yyyy HH:mm"),
    meta: {
      label: "Created At",
      filterVariant: "dateRange",
      icon: CalendarIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} label="Created At" />
    ),
    cell: ({ row }) =>
      format(new Date(row.original.updatedAt), "dd.MM.yyyy HH:mm"),
    meta: {
      label: "UpdatedAt At",
      filterVariant: "dateRange",
      icon: CalendarIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: "actions",
    cell() {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>

            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 32,
  },
];

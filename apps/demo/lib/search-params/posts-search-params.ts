import { createLoader, parseAsInteger, parseAsJson } from "nuqs/server";
import { z } from "zod/v4";

const sortSchema = z.record(z.string(), z.enum(["asc", "desc"]));

const filterValueSchema = z.union([
  z.object({ text: z.string() }),
  z.object({
    dateRange: z.tuple([z.number().nullable(), z.number().nullable()]),
  }),
  z.object({ multiSelect: z.array(z.string()) }),
  z.object({ user: z.string() }),
]);

const filtersSchema = z.record(z.string(), filterValueSchema.optional());

export type TextFilterValue = { text: string };
export type DateRangeFilterValue = {
  dateRange: [number | null, number | null];
};
export type MultiSelectFilterValue = { multiSelect: string[] };
export type UserFilterValue = { user: string };

export type FilterValue =
  | TextFilterValue
  | DateRangeFilterValue
  | MultiSelectFilterValue
  | UserFilterValue;

export type Filters = Record<string, FilterValue | undefined>;

export type Sort = Record<string, "asc" | "desc">;

export const pageParser = parseAsInteger.withDefault(1);
export const perPageParser = parseAsInteger.withDefault(10);
export const sortParser = parseAsJson(sortSchema.parse).withDefault({});
export const filterParser = parseAsJson(filtersSchema.parse).withDefault({});

export const postsSearchParams = {
  page: pageParser,
  perPage: perPageParser,
  sort: sortParser,
  filter: filterParser,
};

export const loadPostsSearchParams = createLoader(postsSearchParams);

export interface PostsSearchParams {
  page: number;
  perPage: number;
  sort: Sort;
  filter: Filters;
}

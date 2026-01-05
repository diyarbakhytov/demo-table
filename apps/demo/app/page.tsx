import { Suspense } from "react";

import {
  PageContainer,
  PageContent,
  PageHeader,
} from "@/components/page-container";
import { loadPostsSearchParams } from "@/lib/search-params/posts-search-params";
import { getPosts } from "@/modules/posts/get-posts";

import { PostsTable } from "./posts-table";
import { Spinner } from "@/components/ui/spinner";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await loadPostsSearchParams(searchParams);
  const data = await getPosts(params);

  return (
    <PageContainer>
      <PageHeader breadcrumbs={[{ label: "Posts", href: "/" }]} />

      <PageContent>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <Spinner className="size-10" />
            </div>
          }
        >
          <PostsTable data={data} />
        </Suspense>
      </PageContent>
    </PageContainer>
  );
}

import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { ThemeTogglerButton } from "./animate-ui/components/buttons/theme-toggler";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <SidebarInset>{children}</SidebarInset>;
}

interface PageHeaderProps {
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b pr-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        <Separator
          className="mr-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.slice(0, -1).map((breadcrumb) => (
              <Fragment key={breadcrumb.label}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href={breadcrumb.href}
                    render={
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    }
                  />
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />
              </Fragment>
            ))}

            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumbs.at(-1)?.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <ThemeTogglerButton />
    </header>
  );
}

export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-1 flex-col gap-2.5 overflow-auto p-4">
      {children}
    </div>
  );
}

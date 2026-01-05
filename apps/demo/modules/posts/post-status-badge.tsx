import { CheckCircle2, Circle, MinusCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { PostStatus } from "./types";

export const POST_STATUS_BADGE_CONFIG: Record<
  PostStatus,
  {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    className: string;
  }
> = {
  created: {
    label: "Created",
    icon: Circle,
    className: "border-blue-600 text-blue-700 bg-blue-50",
  },
  published: {
    label: "Published",
    icon: CheckCircle2,
    className: "text-green-700 border-green-600 bg-green-50",
  },
  hidden: {
    label: "Hidden",
    icon: MinusCircle,
    className: "border-amber-600 text-amber-700 bg-amber-50",
  },
  deleted: {
    label: "Deleted",
    icon: XCircle,
    className: "border-red-600 text-red-700 bg-red-50",
  },
};

interface PostStatusBadgeProps {
  status: PostStatus;
}

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const config = POST_STATUS_BADGE_CONFIG[status];

  return (
    <Badge className={config.className} variant="outline">
      <config.icon />

      <span>{config.label}</span>
    </Badge>
  );
}

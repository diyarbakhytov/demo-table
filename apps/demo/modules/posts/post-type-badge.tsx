import { FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { PostType } from "./types";

export const POST_TYPE_BADGE_CONFIG: Record<
  PostType,
  {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    className: string;
  }
> = {
  article: {
    label: "Article",
    icon: FileText,
    className: "border-purple-600 text-purple-700 bg-purple-50",
  },
};

interface PostTypeBadgeProps {
  type: PostType;
}

export function PostTypeBadge({ type }: PostTypeBadgeProps) {
  const config = POST_TYPE_BADGE_CONFIG[type];

  return (
    <Badge className={config.className} variant="outline">
      <config.icon />

      <span>{config.label}</span>
    </Badge>
  );
}

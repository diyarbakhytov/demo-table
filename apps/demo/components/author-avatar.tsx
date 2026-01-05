import type { Author } from "@/modules/posts/types";

interface AuthorAvatarProps {
  author: Author;
}

export function AuthorAvatar({ author }: AuthorAvatarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
        {author.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{author.name}</span>
        <span className="text-xs text-muted-foreground">@{author.username}</span>
      </div>
    </div>
  );
}

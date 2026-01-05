export type PostStatus = "published" | "created" | "hidden" | "deleted";

export type PostType = "article";

export interface Author {
  id: string;
  name: string;
  username: string;
  profilePicture: string | null;
  role: "admin";
}

export interface Post {
  id: string;
  title: string;
  description: string;
  preview: string;
  content: string;
  status: PostStatus;
  type: PostType;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface GetPostsResult {
  posts: Post[];
  total: number;
}

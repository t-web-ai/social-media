import type { Comment } from "./Comment";

export interface PostResponse {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
  likes: { id: string; username: string }[];
  comments: Comment[];
  likeCount: number;
  userHasLiked: boolean;
}

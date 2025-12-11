export interface PostResponse {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
  likes: [];
  comments: [];
  likeCount: number;
  userHasLiked: boolean;
}

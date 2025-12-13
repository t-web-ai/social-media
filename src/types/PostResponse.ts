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
  comments: {
    userId: string;
    user: {
      username: string;
      email: string;
    };
    comment: string;
    createdAt: string;
  }[];
  likeCount: number;
  userHasLiked: boolean;
}

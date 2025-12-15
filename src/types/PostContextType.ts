export interface PostContextType {
  DeletePost: (id: string) => void;
  DeleteComment?: (id: string) => void;
  LikePost: (id: string, hasLiked: boolean) => void;
}

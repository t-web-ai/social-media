export interface Comment {
  id: string;
  userId: string;
  user: {
    username: string;
    email: string;
  };
  comment: string;
  createdAt: string;
}

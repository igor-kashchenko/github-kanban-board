export type Issue = {
  title: string;
  id: number;
  number: number;
  comments: number;
  user: {
    login: string,
    avatar_url: string,
  };
  state: "open" | "closed";
  assignee: {
    login: string;
    avatar_url: string,
  };
  created_at: string;
}
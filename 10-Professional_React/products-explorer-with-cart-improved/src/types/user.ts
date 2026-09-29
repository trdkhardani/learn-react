export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  sessionId?: string;
}

export type Login = {
  email: string;
  password: string;
}

export type UserStore = {
  user: User | null;
  login: (login: Login) => void;
  logout: () => void;
}
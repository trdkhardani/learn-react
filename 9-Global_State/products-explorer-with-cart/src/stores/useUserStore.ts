import { create } from "zustand";
import type { User, UserStore } from "../types/user";

const usersData: User[] = [
  {
    id: 1,
    name: "Alexei",
    email: "alexei@mail.com",
    password: "plainpasswordalexei",
  },
  {
    id: 2,
    name: "Borodin",
    email: "Borodin@mail.com",
    password: "plainpasswordborodin",
  },
];

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: ({ email, password }) => {
    set((state) => {
      const user = usersData.find(
        (user) => user.email === email && user.password === password,
      );
      if (!user) {
        console.log('Invalid username or password!')
        return { user: null }
      };

      console.log('Valid User! ' + user.name)

      return {
        user: {
          ...user,
          sessionId: btoa(user.email)
        }
      }
    });
  },
  logout: () => {
    set({ user: null });
  },
}));

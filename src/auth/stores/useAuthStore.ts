import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Profile} from "@/auth/models/Profile.ts";

type AuthStore = {
  token?: string,
  profile?: Profile,
  username?: string,
  password?: string,
  login: (token: string, profile: Profile, username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>()(persist(((set, get) => ({
  token: undefined,
  profile: undefined,
  username: undefined,
  password: undefined,
  login: (token: string, profile: Profile, username: string, password: string) => set(() => ({ token, profile, username, password })),
  logout: () => set(() => ({ token: undefined, profile: undefined, username: undefined, password: undefined })),
  isLoggedIn: () => get().token !== undefined,
})), {
  name: "user"
}));
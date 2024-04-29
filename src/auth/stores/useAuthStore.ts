import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Profile} from "@/auth/models/Profile.ts";

type AuthStore = {
  token?: string,
  profile?: Profile,
  login: (token: string, profile: Profile) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>()(persist(((set, get) => ({
  token: undefined,
  profile: undefined,
  login: (token: string, profile: Profile) => set(() => ({ token: token, profile: profile })),
  logout: () => set(() => ({ token: undefined, profile: undefined })),
  isLoggedIn: () => get().token !== undefined,
})), {
  name: "user"
}));
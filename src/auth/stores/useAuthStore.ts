import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Profile} from "@/profiles/models/Profile.ts";

type AuthStore = {
  token?: string,
  profile?: Profile,
  updateToken: (token: string) => void,
  updateProfile: (profile: Profile) => void,
}

export const useAuthStore = create<AuthStore>()(persist(((set) => ({
  token: undefined,
  profile: undefined,
  updateToken: (token: string) => set(() => ({ token: token })),
  updateProfile: (profile: Profile) => set(() => ({ profile: profile })),
})), {
  name: "user"
}));
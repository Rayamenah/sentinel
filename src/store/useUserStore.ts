import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    completedProfile?: boolean;
};

type UserState = {
    users: Record<string, { name: string; email: string; password: string }>;
    currentUser?: User | null;
    signUp: (data: { name: string; email: string; password: string }) => { ok: boolean; message?: string };
    signIn: (data: { email: string; password: string }) => { ok: boolean; message?: string };
    signOut: () => void;
    updateProfile: (patch: Partial<User>) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            users: {},
            currentUser: null,
            signUp: ({ name, email, password }) => {
                const users = get().users;
                if (users[email]) {
                    return { ok: false, message: "User already exists" };
                }
                users[email] = { name, email, password };
                set({ users });
                return { ok: true };
            },
            signIn: ({ email, password }) => {
                const users = get().users;
                const u = users[email];
                if (!u) return { ok: false, message: "Please sign up first" };
                if (u.password !== password) return { ok: false, message: "Invalid credentials" };
                const user = { id: email, name: u.name, email, avatar: undefined, completedProfile: false };
                set({ currentUser: user });
                return { ok: true };
            },
            signOut: () => set({ currentUser: null }),
            updateProfile: (patch) => set((s) => ({ currentUser: s.currentUser ? { ...s.currentUser, ...patch } : s.currentUser }))
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
);

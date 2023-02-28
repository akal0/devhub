import { create } from "zustand";

const useUserStore = create<userStore>((set) => ({
    username: "",
    setUsername: (username) => set((state) => ({
        username
    })),
}));

export default useUserStore;

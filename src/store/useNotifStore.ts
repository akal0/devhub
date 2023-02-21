import { create } from "zustand";

const useNotifStore = create<notifStore>((set) => ({
  message: "",
  setNotif: (message) =>
    set((state) => ({
      message,
    })),
  closeNotif: () =>
    set((state) => ({
      message: "",
    })),
}));

export default useNotifStore;

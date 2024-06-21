import { create } from "zustand";

interface UserState {
  user: string;
}

const useUserStore = create<UserState>()((set) => ({
  user: "",
}));

export default useUserStore;

import { create } from 'zustand';

export const userStore = create((set) => ({
  username: 'test',
  userID: '65e8fc7fc0d2eafacb7698a9',
  updateUsername: (username) => set(() => ({ username: username })),
  updateUserID: (userID) => set(() => ({ userID: userID })),
}));

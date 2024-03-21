import { create } from 'zustand';

const initialState = {
  username: '', // State to store username
  password: '', // State to store password
  showPassword: false, // State to toggle password visibility
  usernameInvalid: false, // State to manage password validity
  usernameErrorMessage: '', // State to store username error message
  passwordInvalid: false, // State to manage username validity
  passwordErrorMessage: '', // State to store password error message
}

export const userStore = create((set) => ({
  ...initialState,
  reset: () => {set(initialState)},
}));

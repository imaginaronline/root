import { create } from 'zustand';

const useAuthStore = create((set: any) => ({
  accessToken: localStorage.getItem('accessToken') || null, // Initialize from localStorage if available
  setAccessToken: (token: any) => {
    set({ accessToken: token });
    localStorage.setItem('accessToken', token); // Save to localStorage
  },
  logout: () => {
    set({ accessToken: null }); // Clear the access token
    localStorage.removeItem('accessToken'); // Remove from localStorage
  },
}));

export default useAuthStore;
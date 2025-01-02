import { create } from 'zustand';

interface ProfilePanelStore {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

export const useProfilePanel = create<ProfilePanelStore>((set) => ({
  isOpen: false,
  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),
}));
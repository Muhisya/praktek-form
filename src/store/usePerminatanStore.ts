import { create } from 'zustand';
import type { PeminatanFormData } from '../schemas/perminatanSchema';

interface PeminatanState {
  santriList: PeminatanFormData[];
  addSantri: (data: PeminatanFormData) => void;
}

const usePerminatanStore = create<PeminatanState>((set) => ({
  santriList: [],
  addSantri: (data) =>
    set((state) => ({
      santriList: [...state.santriList, data],
    })),
}));

export default usePerminatanStore;
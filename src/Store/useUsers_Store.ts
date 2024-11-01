import { create } from 'zustand';

interface Store {
  id: number;
  name: string;
  address?: string;
}

interface StoreState {
  stores: Store[];
  isDeleteMode: boolean;
  addStore: (store: Omit<Store, 'id'>) => void;
  updateStore: (updatedStore: Store) => void;
  deleteStore: (id: number) => void;
  toggleDeleteMode: () => void;
}

const useUsers_Store = create<StoreState>((set) => ({
  stores: [],
  isDeleteMode: false,

  addStore: (store) =>
    set((state) => {
      const newId =
        state.stores.length > 0
          ? Math.max(...state.stores.map((s) => s.id)) + 1
          : 1;

      return {
        stores: [...state.stores, { ...store, id: newId }],
        isDeleteMode: false,
      };
    }),

  updateStore: (updatedStore) =>
    set((state) => ({
      stores: state.stores.map((store) =>
        store.id === updatedStore.id ? updatedStore : store
      ),
    })),

  deleteStore: (id) =>
    set((state) => {
      const updatedStores = state.stores.filter((store) => store.id !== id);
      const isDeleteMode =
        updatedStores.length > 0 ? state.isDeleteMode : false;

      return {
        stores: updatedStores,
        isDeleteMode,
      };
    }),

  toggleDeleteMode: () =>
    set((state) => ({
      isDeleteMode: state.stores.length > 0 ? !state.isDeleteMode : false,
    })),
}));

export default useUsers_Store;

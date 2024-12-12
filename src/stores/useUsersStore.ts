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

const useUsersStore = create<StoreState>((set) => ({
  stores: [],
  isDeleteMode: false,

  addStore: (store) =>
    set((state) => {
      const newId = Date.now();

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

      return {
        stores: updatedStores,
      };
    }),

  toggleDeleteMode: () =>
    set((state) => ({
      isDeleteMode: state.stores.length > 0 ? !state.isDeleteMode : false,
    })),
}));

export default useUsersStore;

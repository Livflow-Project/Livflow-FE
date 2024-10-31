// src/stores/storeStore.ts
import { create } from 'zustand';

interface Store {
  id: number; // 각 상점을 고유하게 식별하기 위한 ID 추가
  name: string;
  address?: string;
}

interface StoreState {
  stores: Store[];
  addStore: (store: Omit<Store, 'id'>) => void;
  updateStore: (updatedStore: Store) => void;
}

const useUsers_Store = create<StoreState>((set) => ({
  stores: [],
  addStore: (store) =>
    set((state) => {
      const newId =
        state.stores.length > 0
          ? Math.max(...state.stores.map((s) => s.id)) + 1
          : 1; // 새로운 id 계산
      return { stores: [...state.stores, { ...store, id: newId }] };
    }),
  updateStore: (updatedStore) =>
    set((state) => ({
      stores: state.stores.map((store) =>
        store.id === updatedStore.id ? updatedStore : store
      ),
    })),
}));

export default useUsers_Store;

import { ReactNode, createContext, useContext, useState } from 'react';

type StoreInfo = {
  name: string;
  address?: string;
};

type StoreContextType = {
  storeInfo: StoreInfo | null;
  setStoreInfo: (info: StoreInfo) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);

  return (
    <StoreContext.Provider
      value={{
        storeInfo,
        setStoreInfo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      'useStore Hook은 StoreContext 내부에서만 사용할 수 있습니다.'
    );
  }
  return context;
};

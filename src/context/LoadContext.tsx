import { createContext, useCallback, useState } from "react";
import ActionLoader from "../components/ActionLoader";

export interface LoadProviderProps {
  children: JSX.Element | JSX.Element[]
}

export interface LoadContextProps {
  enableLoader(): void
  disableLoader(): void
}

export const LoadContext = createContext({} as LoadContextProps);

const LoaderProvider = ({ children }: LoadProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const enableLoader = useCallback(
    () => setIsLoading(true),
    [setIsLoading]
  );

  const disableLoader = useCallback(
    () => {
      setIsLoading(false);
    },
    [setIsLoading]
  );

  return (
    <LoadContext.Provider
      value={{
        enableLoader,
        disableLoader
      }}
    >
      <>
        {isLoading && <ActionLoader />}
        {children}
      </>
    </LoadContext.Provider>
  );
};

export default LoaderProvider;
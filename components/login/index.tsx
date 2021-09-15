import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface RootState {
  userId: number;
  setLoginState: Dispatch<SetStateAction<number>>;
}

const initialState = {
  userId: -1,
  setLoginState: (a: any) => {},
};

const LoginStateContext = createContext(initialState);

export const LoginProvider = ({ children }: any) => {
  const [loginState, setLoginState] = useState(initialState.userId);
  return (
    <LoginStateContext.Provider value={{ userId: loginState, setLoginState }}>
      {children}
    </LoginStateContext.Provider>
  );
};

export const useLogin = () => useContext(LoginStateContext);

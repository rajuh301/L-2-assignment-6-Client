"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { IUser } from "../types";
import { getCurrentUser } from "../services/AuthService";

const UserContex = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setisLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setisLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();

    setUser(user);
    setisLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContex.Provider value={{ user, setUser, isLoading, setisLoading }}>
      {children}
    </UserContex.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContex);

  if (context === undefined) {
    throw new Error("useUser must be use within the UserProvider context");
  }

  return context;
};

export default UserProvider;

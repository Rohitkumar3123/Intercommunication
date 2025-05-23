
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UserContextType {
  currentUser: User;
}

const defaultUser: User = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@example.com",
  avatar: "https://github.com/shadcn.png"
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser] = useState<User>(defaultUser);
  
  return (
    <UserContext.Provider value={{
      currentUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

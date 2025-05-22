
import { createContext, useContext, useState, ReactNode } from "react";

interface AIAssistantContextType {
  isAIAssistantVisible: boolean;
  toggleAIAssistant: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export const AIAssistantProvider = ({ children }: { children: ReactNode }) => {
  const [isAIAssistantVisible, setIsAIAssistantVisible] = useState(true);
  
  const toggleAIAssistant = () => {
    setIsAIAssistantVisible(prev => !prev);
  };
  
  return (
    <AIAssistantContext.Provider value={{
      isAIAssistantVisible,
      toggleAIAssistant
    }}>
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error("useAIAssistant must be used within an AIAssistantProvider");
  }
  return context;
};

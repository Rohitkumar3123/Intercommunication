
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Types definition
export interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    title?: string;
    phone?: string;
    location?: string;
    firstSeen: Date;
    lastActive: Date;
    recentActivity?: {
      description: string;
      timestamp: Date;
    }[];
  };
  status: "active" | "closed" | "waiting";
  lastMessage: {
    text: string;
    timestamp: Date;
  };
  messages: Message[];
}

interface ConversationContextType {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  selectConversation: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "conv1",
    user: {
      id: "user1",
      name: "Sophie Miller",
      email: "sophie.m@example.com",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sophie",
      title: "Marketing Manager at TechCorp",
      phone: "+1 (555) 123-4567",
      firstSeen: new Date(2023, 8, 15),
      lastActive: new Date(),
      recentActivity: [
        {
          description: "Viewed pricing page",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          description: "Signed up for newsletter",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    status: "active",
    lastMessage: {
      text: "I'm having trouble accessing my account. Can you help?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "Hi there, I'm having trouble accessing my account. I keep getting an error message.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: "msg2",
        sender: "agent",
        text: "Hello Sophie, I'm sorry to hear you're having trouble. Could you tell me what error message you're seeing?",
        timestamp: new Date(Date.now() - 10 * 60 * 1000)
      },
      {
        id: "msg3",
        sender: "user",
        text: "It says 'Invalid credentials' but I'm sure I'm using the correct password.",
        timestamp: new Date(Date.now() - 7 * 60 * 1000)
      },
      {
        id: "msg4",
        sender: "user",
        text: "I'm having trouble accessing my account. Can you help?",
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      }
    ]
  },
  {
    id: "conv2",
    user: {
      id: "user2",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Michael",
      title: "CEO at StartupInc",
      firstSeen: new Date(2023, 6, 10),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    status: "waiting",
    lastMessage: {
      text: "When will the new feature be available?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "Hello, I'm interested in the enterprise plan. Can you provide more details?",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: "msg2",
        sender: "agent",
        text: "Hi Michael, I'd be happy to help with information about our enterprise plan. What specific details are you looking for?",
        timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000)
      },
      {
        id: "msg3",
        sender: "user",
        text: "I'm mostly interested in the pricing and the features included.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
      },
      {
        id: "msg4",
        sender: "user",
        text: "When will the new feature be available?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: "conv3",
    user: {
      id: "user3",
      name: "David Chen",
      email: "david.c@example.com",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=David",
      title: "Developer",
      firstSeen: new Date(2023, 5, 5),
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    status: "active",
    lastMessage: {
      text: "Thanks for the quick response!",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    messages: [
      {
        id: "msg1",
        sender: "user",
        text: "I'm having an issue with the API documentation. The endpoints don't match what's described.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: "msg2",
        sender: "agent",
        text: "Hi David, I apologize for the confusion. We recently updated our API and there might be a delay in updating the documentation. Let me check this for you.",
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000)
      },
      {
        id: "msg3",
        sender: "agent",
        text: "I've checked with our development team and they confirmed that the documentation will be updated by the end of the week. In the meantime, I can provide you with the correct endpoints if you tell me what you're trying to accomplish.",
        timestamp: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000)
      },
      {
        id: "msg4",
        sender: "user",
        text: "Thanks for the quick response!",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]
  }
];

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const selectedConversation = selectedConversationId 
    ? conversations.find(conv => conv.id === selectedConversationId) || null
    : null;
  
  const selectConversation = (id: string) => {
    setSelectedConversationId(id);
  };
  
  const sendMessage = (conversationId: string, text: string) => {
    const timestamp = new Date();
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "agent",
      text,
      timestamp
    };
    
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversationId 
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: { text, timestamp }
            }
          : conv
      )
    );
    
    // Show toast for demo purposes
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };
  
  // Auto-select the first conversation on initial load
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);
  
  return (
    <ConversationContext.Provider value={{
      conversations,
      selectedConversation,
      selectConversation,
      sendMessage
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
};

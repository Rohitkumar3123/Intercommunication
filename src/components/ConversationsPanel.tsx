
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { ConversationItem } from "./ConversationItem";
import { useConversation } from "@/contexts/ConversationContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conversation } from "@/types";

export const ConversationsPanel = () => {
  const { conversations, selectConversation } = useConversation();
  
  // Map conversations from the context to match the expected Conversation type
  const mappedConversations: Conversation[] = conversations.map(conv => ({
    id: conv.id,
    customer: {
      id: conv.user.id,
      name: conv.user.name,
      email: conv.user.email,
      avatar: conv.user.avatar,
    },
    lastMessage: {
      text: conv.lastMessage.text,
      timestamp: conv.lastMessage.timestamp,
      sender: conv.messages.length > 0 && conv.messages[conv.messages.length - 1].sender === 'user' ? 'customer' : 'agent',
    },
    status: conv.status === 'active' ? 'active' : conv.status === 'closed' ? 'resolved' : 'pending',
    unread: false,
  }));
  
  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8" 
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {mappedConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              onClick={() => selectConversation(conversation.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

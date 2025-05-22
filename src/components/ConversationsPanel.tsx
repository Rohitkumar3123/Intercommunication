
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { ConversationItem } from "./ConversationItem";
import { useConversation } from "@/contexts/ConversationContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ConversationsPanel = () => {
  const { conversations, selectConversation } = useConversation();
  
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
          {conversations.map((conversation) => (
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

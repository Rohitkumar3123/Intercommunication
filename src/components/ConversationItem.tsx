
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useConversation } from "@/contexts/ConversationContext";

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
}

export const ConversationItem = ({ conversation, onClick }: ConversationItemProps) => {
  const { selectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;
  
  return (
    <div 
      className={cn(
        "flex items-start p-3 rounded-md cursor-pointer hover:bg-gray-100",
        isSelected ? "bg-gray-100" : ""
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 mr-3 mt-0.5">
        <img src={conversation.user.avatar} alt={conversation.user.name} />
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate">{conversation.user.name}</p>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.text}</p>
        
        <div className="flex items-center mt-1">
          {conversation.status === "active" && (
            <Badge variant="default" className="bg-green-500 text-white text-xs">Active</Badge>
          )}
          {conversation.status === "waiting" && (
            <Badge variant="outline" className="text-orange-500 border-orange-500 text-xs">Waiting</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

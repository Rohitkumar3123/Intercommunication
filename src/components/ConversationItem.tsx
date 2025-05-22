
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Conversation } from "@/types";

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, onClick }) => {
  const { customer, lastMessage, status, unread } = conversation;

  const timeAgo = formatDistanceToNow(lastMessage.timestamp, {
    addSuffix: true,
  });

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-3 p-3 w-full rounded-md hover:bg-secondary transition-colors",
        unread ? "bg-secondary" : "bg-transparent"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={customer.avatar} alt={customer.name} />
        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{customer.name}</p>
          {status === "resolved" && (
            <Badge variant="secondary">
              <CheckCheck className="h-3 w-3 mr-1" />
              Resolved
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {lastMessage.text.length > 50
            ? lastMessage.text.substring(0, 50) + "..."
            : lastMessage.text}
        </p>
      </div>
      <div className="text-xs text-muted-foreground">{timeAgo}</div>
    </button>
  );
};

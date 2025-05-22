
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
  userName: string;
}

export const MessageBubble = ({ message, isUser, userName }: MessageBubbleProps) => {
  const timestamp = format(message.timestamp, 'h:mm a');
  
  return (
    <div className={cn(
      "flex mb-4",
      isUser ? "flex-row-reverse" : ""
    )}>
      <Avatar className={cn("h-8 w-8", isUser ? "ml-2" : "mr-2")}>
        {isUser ? (
          <img src={`https://api.dicebear.com/7.x/personas/svg?seed=${userName}`} alt="User" />
        ) : (
          <div className="bg-primary flex items-center justify-center text-white">
            <Bot size={16} />
          </div>
        )}
      </Avatar>
      
      <div className={cn(
        "max-w-[70%]",
      )}>
        <div className={cn(
          "px-4 py-2 rounded-lg inline-block",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-secondary text-secondary-foreground rounded-tl-none"
        )}>
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
        <div className={cn(
          "text-xs text-muted-foreground mt-1",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

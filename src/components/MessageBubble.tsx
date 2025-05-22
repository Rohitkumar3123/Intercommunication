import { Avatar } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";
import { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { currentUser } = useUser();
  const isCurrentUser = message.sender === "agent" && currentUser.id === "admin-1";

  return (
    <div className={cn(
      "flex w-full py-2",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex flex-col space-y-2 text-sm max-w-[80%]",
        isCurrentUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-3 py-2 rounded-lg",
          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          <p className="text-sm">{message.text}</p>
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2">
              {message.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Attachment {index + 1}
                </a>
              ))}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>
      {!isCurrentUser && (
        <Avatar className="ml-3 h-8 w-8">
          <img src="https://github.com/shadcn.png" alt="Customer Avatar" />
        </Avatar>
      )}
    </div>
  );
};

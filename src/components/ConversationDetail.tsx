
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Info, User, Bot, PlusCircle, Smile, Paperclip } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useConversation } from "@/contexts/ConversationContext";
import { MessageBubble } from "./MessageBubble";
import { CustomerInfo } from "./CustomerInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIAssistant } from "./AIAssistant";
import { useAIAssistant } from "@/contexts/AIAssistantContext";

export const ConversationDetail = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedConversation, sendMessage } = useConversation();
  const { isAIAssistantVisible } = useAIAssistant();
  
  if (!selectedConversation) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value.trim()) {
      sendMessage(selectedConversation.id, inputRef.current.value);
      inputRef.current.value = "";
    }
  };
  
  return (
    <div className="h-full flex overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 bg-white flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="mr-3 h-10 w-10">
              <img src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
            </Avatar>
            <div>
              <h2 className="font-medium">{selectedConversation.user.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedConversation.user.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Info size={16} className="mr-2" />
            View customer
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          {selectedConversation.messages.map((message, index) => (
            <MessageBubble 
              key={index}
              message={{
                id: message.id,
                text: message.text,
                timestamp: message.timestamp,
                sender: message.sender === "user" ? "customer" : "agent",
                attachments: message.attachments,
              }}
              isUser={message.sender === "user"}
              userName={selectedConversation.user.name}
            />
          ))}
        </ScrollArea>
        
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Button type="button" variant="ghost" size="icon" className="text-gray-500">
              <PlusCircle size={20} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="text-gray-500">
              <Paperclip size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Type your message..."
                className="pr-10"
              />
              <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                <Smile size={20} />
              </Button>
            </div>
            <Button type="submit">
              <Send size={16} className="mr-1" />
              Send
            </Button>
          </form>
        </div>
      </div>
      
      {isAIAssistantVisible && (
        <CustomerInfo />
      )}
    </div>
  );
};

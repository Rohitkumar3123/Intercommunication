
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Plus } from "lucide-react";
import { useAIAssistant } from "@/contexts/AIAssistantContext";

export const Header = () => {
  const { toggleAIAssistant } = useAIAssistant();
  
  return (
    <div className="h-16 border-b flex items-center justify-between px-6 bg-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Conversations</h1>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-8 w-[300px]" 
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleAIAssistant}
          className="text-sm font-medium"
        >
          AI Assistant
        </Button>
        <Button variant="outline" size="icon">
          <Bell size={18} />
        </Button>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New conversation
        </Button>
      </div>
    </div>
  );
};

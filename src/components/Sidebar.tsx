
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Users, 
  Settings, 
  PanelLeft, 
  Bell, 
  BarChart3, 
  Inbox, 
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    { icon: MessageSquare, label: "Conversations", active: true },
    { icon: Users, label: "Contacts" },
    { icon: Inbox, label: "Inbox" },
    { icon: BarChart3, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];
  
  return (
    <div 
      className={cn(
        "bg-[#23242F] text-white flex flex-col h-full transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <span className="text-xl font-bold">Intercom</span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-white hover:bg-[#2F3140]"
        >
          <PanelLeft size={20} className={collapsed ? "rotate-180" : ""} />
        </Button>
      </div>
      
      <div className="flex-1 px-2 py-4">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full justify-start text-white mb-1 hover:bg-[#2F3140]",
              item.active ? "bg-[#2F3140]" : "",
              collapsed ? "px-2" : "px-4"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </Button>
        ))}
      </div>
      
      <div className="p-4 border-t border-[#2F3140] flex items-center">
        <Avatar className="h-8 w-8">
          <img src="https://github.com/shadcn.png" alt="Avatar" />
        </Avatar>
        {!collapsed && <span className="ml-2 text-sm">Admin User</span>}
      </div>
    </div>
  );
};

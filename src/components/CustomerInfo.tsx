
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConversation } from "@/contexts/ConversationContext";
import { User, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

export const CustomerInfo = () => {
  const { selectedConversation } = useConversation();
  
  if (!selectedConversation) return null;
  
  const user = selectedConversation.user;
  
  return (
    <div className="w-[350px] border-l bg-white overflow-hidden">
      <Tabs defaultValue="profile">
        <TabsList className="w-full border-b rounded-none">
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="m-0">
          <ScrollArea className="h-[calc(100vh-160px)]">
            <div className="p-4">
              <div className="flex flex-col items-center mb-6 mt-2">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="h-20 w-20 rounded-full mb-2"
                />
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.title}</p>
              </div>
              
              <div className="space-y-4">
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem icon={Phone} label="Phone" value={user.phone || "(Not provided)"} />
                <InfoItem icon={MapPin} label="Location" value={user.location || "San Francisco, CA"} />
                <InfoItem 
                  icon={Calendar} 
                  label="First seen" 
                  value={format(user.firstSeen, 'MMM d, yyyy')}
                />
                <InfoItem 
                  icon={Clock} 
                  label="Last active" 
                  value={format(user.lastActive, 'MMM d, yyyy')}
                />
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Recent activity</h4>
                {user.recentActivity && user.recentActivity.map((activity, index) => (
                  <div key={index} className="mb-3 border-l-2 border-gray-200 pl-3">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(activity.timestamp, 'MMM d, h:mm a')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="notes" className="m-0">
          <ScrollArea className="h-[calc(100vh-160px)]">
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                No notes available for this customer.
              </p>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-0.5">
        <Icon size={16} className="text-gray-500" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
};

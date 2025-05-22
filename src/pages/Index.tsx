
import { AdminPanel } from "@/components/AdminPanel";
import { Toaster } from "@/components/ui/toaster";
import { AIAssistantProvider } from "@/contexts/AIAssistantContext";
import { UserProvider } from "@/contexts/UserContext";
import { ConversationProvider } from "@/contexts/ConversationContext";

const Index = () => {
  return (
    <UserProvider>
      <ConversationProvider>
        <AIAssistantProvider>
          <div className="min-h-screen bg-[#f9fafc]">
            <AdminPanel />
            <Toaster />
          </div>
        </AIAssistantProvider>
      </ConversationProvider>
    </UserProvider>
  );
};

export default Index;

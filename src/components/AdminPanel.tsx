
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ConversationsPanel } from "./ConversationsPanel";
import { ConversationDetail } from "./ConversationDetail";
import { useConversation } from "@/contexts/ConversationContext";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export const AdminPanel = () => {
  const { selectedConversation } = useConversation();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={30} minSize={20} className="min-w-[250px]">
            <ConversationsPanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            {selectedConversation ? (
              <ConversationDetail />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Select a conversation to view details</p>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

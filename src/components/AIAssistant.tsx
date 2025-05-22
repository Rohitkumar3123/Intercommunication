
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparkleIcon, CopyIcon, CheckIcon, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "@/contexts/ConversationContext";
import { useToast } from "@/components/ui/use-toast";

export const AIAssistant = () => {
  const { selectedConversation } = useConversation();
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const { toast } = useToast();
  
  if (!selectedConversation) return null;
  
  const handleGenerateResponse = () => {
    setIsGenerating(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      const responses = [
        `Hi ${selectedConversation.user.name},\n\nThank you for contacting our support team. I understand you're having an issue with accessing your account. Let me help you with that.\n\nCould you please provide me with your account email address so I can look into this further?\n\nBest regards,\nSupport Team`,
        
        `Hello ${selectedConversation.user.name},\n\nI appreciate you reaching out about the billing issue you're experiencing. I'd be happy to help resolve this.\n\nI can see that there was an error processing your last payment. This could be due to an expired card or insufficient funds. Would you like me to resend the invoice or would you prefer to update your payment method?\n\nLet me know how you'd like to proceed.\n\nBest,\nSupport Team`,
        
        `Hi there ${selectedConversation.user.name},\n\nThank you for your message. I see you're interested in our enterprise plan.\n\nOur enterprise plan includes unlimited users, priority support, custom integrations, and advanced security features. The pricing is custom based on your organization's needs.\n\nWould you be available for a quick call this week to discuss your specific requirements? I'd be happy to set that up for you.\n\nLooking forward to your response!\n\nBest,\nSupport Team`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsGenerating(false);
    }, 2000);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    toast({
      title: "Response copied to clipboard",
      description: "You can now paste it into your message.",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="absolute right-6 bottom-20 z-10 w-[400px]">
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50 pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SparkleIcon size={18} className="text-blue-500 mr-2" />
              <CardTitle className="text-md">AI Assistant</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setAiResponse("")}
            >
              <X size={16} />
            </Button>
          </div>
          <CardDescription className="text-xs mt-1">
            Generate helpful responses based on the conversation context
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {aiResponse ? (
            <ScrollArea className="h-[200px]">
              <div className="whitespace-pre-wrap text-sm">
                {aiResponse}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8">
              <SparkleIcon size={32} className="mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium">Generate AI Response</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Get help crafting the perfect reply
              </p>
              <Button 
                onClick={handleGenerateResponse} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate response"}
              </Button>
            </div>
          )}
        </CardContent>
        
        {aiResponse && (
          <CardFooter className="pt-0 pb-3">
            <div className="w-full flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <CheckIcon size={14} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon size={14} className="mr-1" />
                    Copy to clipboard
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

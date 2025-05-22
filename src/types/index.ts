
export interface Conversation {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    sender: 'customer' | 'agent';
  };
  status: 'active' | 'resolved' | 'pending';
  unread?: boolean;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'customer' | 'agent';
  attachments?: string[];
}

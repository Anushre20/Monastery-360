import { useState } from "react";
import { MessageCircle, X, Send, MapPin, Clock, Route } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to Monastery 360! I'm here to help you explore the monastery. Ask me about the history, architecture, or specific locations you'd like to visit.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");

  const quickSuggestions = [
    "Tell me about the main chapel",
    "What's the history of this monastery?",
    "Show me the ancient manuscripts",
    "How old is the bell tower?"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("chapel") || input.includes("main")) {
      return "The Main Chapel is the heart of our monastery, built in the 12th century. It features stunning Gothic architecture with intricate stone carvings. You can access it through the 360° viewer - look for the hotspot near the altar!";
    } else if (input.includes("history") || input.includes("old")) {
      return "This monastery was founded in 1147 by Cistercian monks. It has served as a center of learning and worship for over 875 years, surviving wars and natural disasters while preserving countless manuscripts and artifacts.";
    } else if (input.includes("manuscript") || input.includes("book")) {
      return "Our collection includes over 500 illuminated manuscripts dating back to the 9th century. These precious texts contain religious writings, historical chronicles, and scientific treatises. You can explore them in the Ancient Scriptorium section.";
    } else if (input.includes("bell tower") || input.includes("tower")) {
      return "The bell tower stands 45 meters tall and was completed in 1203. It houses 7 bells, the oldest dating to 1289. From the top, you can see the entire monastery grounds and surrounding countryside.";
    } else if (input.includes("help") || input.includes("navigate")) {
      return "To navigate: Use the 360° viewer to explore different areas, tap on hotspots for detailed information, access the sidebar for location filters, or ask me specific questions about what you'd like to see!";
    } else {
      return "That's an interesting question! I can help you learn about the monastery's history, architecture, manuscripts, and specific locations. Try asking about the chapel, bell tower, or use the sidebar to explore different areas.";
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  return (
    <>
      {/* Floating Chat Button - Positioned below SOS */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
        title="Tour Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-card rounded-t-2xl w-full max-w-md h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="font-medium text-foreground">Tour Assistant</h3>
                <p className="text-sm text-muted-foreground">Ask me about the monastery</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-accent rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>



            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
                <div className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-2 text-sm bg-muted hover:bg-accent rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about the monastery..."
                  className="flex-1 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-input-background"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
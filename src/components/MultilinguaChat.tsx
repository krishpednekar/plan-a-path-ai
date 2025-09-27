import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Globe, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  message: string;
  language: string;
  timestamp: Date;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
];

const aiResponses = {
  en: [
    "🌟 India is amazing! Would you prefer safari, hill stations, or cultural tourism?",
    "I'd recommend visiting during October-March for the best weather. What type of activities interest you?",
    "For adventure seekers, I suggest trekking in the Western Ghats or wildlife safaris in national parks.",
    "Cultural enthusiasts would love exploring ancient temples, local festivals, and traditional art forms."
  ],
  hi: [
    "🌟 भारत अद्भुत है! क्या आप सफारी, हिल स्टेशन या सांस्कृतिक पर्यटन पसंद करेंगे?",
    "मैं अक्टूबर-मार्च के दौरान सबसे अच्छे मौसम के लिए यात्रा की सलाह दूंगा। आपको किस प्रकार की गतिविधियां पसंद हैं?",
    "साहसिक प्रेमियों के लिए, मैं पश्चिमी घाट में ट्रेकिंग या राष्ट्रीय उद्यानों में वन्यजीव सफारी का सुझाव देता हूं।",
    "सांस्कृतिक उत्साही लोगों को प्राचीन मंदिरों, स्थानीय त्योहारों और पारंपरिक कला रूपों की खोज करना पसंद आएगा।"
  ],
  ur: [
    "🌟 ہندوستان بہت خوبصورت ہے! کیا آپ سفاری، پہاڑی مقامات، یا ثقافتی سیاحت پسند کریں گے؟",
    "میں بہترین موسم کے لیے اکتوبر سے مارچ تک سفر کی تجویز دوں گا۔ آپ کو کس قسم کی سرگرمیاں پسند ہیں؟",
    "مہم جوئی کے شائقین کے لیے، میں مغربی گھاٹ میں ٹریکنگ یا قومی پارکوں میں جنگلی حیات کی سفاری کا مشورہ دیتا ہوں۔",
    "ثقافتی شوقین لوگ قدیم مندروں، مقامی تہواروں، اور روایتی فن کی تلاش کرنا پسند کریں گے۔"
  ],
  bn: [
    "🌟 ভারত অসাধারণ! আপনি সাফারি, পার্বত্য এলাকা, নাকি সাংস্কৃতিক পর্যটন পছন্দ করবেন?",
    "সেরা আবহাওয়ার জন্য অক্টোবর-মার্চের মধ্যে ভ্রমণের পরামর্শ দেব। আপনার কী ধরনের কার্যকলাপে আগ্রহ?",
    "দুঃসাহসিকদের জন্য, আমি পশ্চিমঘাট পর্বতমালায় ট্রেকিং বা জাতীয় উদ্যানে বন্যপ্রাণী সাফারির পরামর্শ দিই।",
    "সাংস্কৃতিক উৎসাহীরা প্রাচীন মন্দির, স্থানীয় উৎসব এবং ঐতিহ্যবাহী শিল্পকলা অন্বেষণ করতে পছন্দ করবেন।"
  ]
};

export function MultilingualChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message when language changes
    if (messages.length === 0) {
      const welcomeMessages = {
        en: "Hello! I'm your AI travel assistant. Ask me about destinations, travel tips, or planning advice!",
        hi: "नमस्ते! मैं आपका AI यात्रा सहायक हूं। मुझसे गंतव्य, यात्रा टिप्स, या योजना सलाह के बारे में पूछें!",
        ur: "السلام علیکم! میں آپ کا AI ٹریول اسسٹنٹ ہوں۔ مجھ سے منزلوں، سفری تجاویز، یا منصوبہ بندی کی مشاورت کے بارے میں پوچھیں!",
        bn: "হ্যালো! আমি আপনার AI ভ্রমণ সহায়ক। আমাকে গন্তব্য, ভ্রমণ টিপস, বা পরিকল্পনা পরামর্শ সম্পর্কে জিজ্ঞাসা করুন!"
      };

      const welcomeMessage: ChatMessage = {
        id: "welcome",
        type: "ai",
        message: welcomeMessages[selectedLanguage as keyof typeof welcomeMessages],
        language: selectedLanguage,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
    }
  }, [selectedLanguage]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: inputMessage,
      language: selectedLanguage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = aiResponses[selectedLanguage as keyof typeof aiResponses];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message: randomResponse,
        language: selectedLanguage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: "AI Response Generated",
        description: `Replied in ${languages.find(l => l.code === selectedLanguage)?.name}`,
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Multilingual AI Chat</h1>
          <p className="text-muted-foreground mt-1">
            Get travel assistance in your preferred language
          </p>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0 border-b">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Chat with TourismAI</span>
            </div>
            <Badge variant="secondary" className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground ml-4"
                      : "bg-secondary text-secondary-foreground mr-4"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</p>
                </div>
              </div>
              
              <div className={`flex-shrink-0 ${msg.type === "user" ? "order-1" : "order-2"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === "user"
                      ? "bg-primary/20"
                      : "bg-secondary"
                  }`}
                >
                  {msg.type === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-secondary rounded-2xl px-4 py-3">
                <Bot className="h-4 w-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        
        {/* Input */}
        <div className="flex-shrink-0 border-t p-4">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Type your message in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>AI-powered responses</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
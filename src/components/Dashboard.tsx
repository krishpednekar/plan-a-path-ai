import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Compass, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  CreditCard,
  AlertCircle,
  TrendingUp,
  Users
} from "lucide-react";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const featureCards = [
  {
    id: "recommendations",
    title: "AI Recommendations",
    description: "Get personalized travel suggestions",
    icon: Compass,
    gradient: "gradient-primary",
    stats: "50+ destinations"
  },
  {
    id: "map",
    title: "Interactive Map", 
    description: "Explore locations visually",
    icon: MapPin,
    gradient: "gradient-nature",
    stats: "Live tracking"
  },
  {
    id: "chat",
    title: "AI Chat Assistant",
    description: "24/7 multilingual support",
    icon: MessageSquare,
    gradient: "gradient-sunset",
    stats: "4 languages"
  },
  {
    id: "payments",
    title: "Secure Payments",
    description: "Blockchain-powered transactions",
    icon: CreditCard,
    gradient: "gradient-primary",
    stats: "Safe & fast"
  }
];

const travelAlerts = [
  {
    type: "weather",
    message: "Perfect weather expected in Jharkhand hills this weekend",
    severity: "info"
  },
  {
    type: "promotion",
    message: "Special 20% off on weekend getaway packages",
    severity: "success"
  },
  {
    type: "update",
    message: "New AI recommendations algorithm now live",
    severity: "info"
  }
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to TourismAI</h1>
          <p className="text-muted-foreground mt-1">
            Discover amazing destinations with AI-powered travel assistance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>AI Online</span>
          </Badge>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card 
              key={card.id}
              className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-hover group"
              onClick={() => onNavigate(card.id)}
            >
              <div className={cn("absolute inset-0 opacity-10", card.gradient)} />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  <Badge variant="outline" className="text-xs">
                    {card.stats}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground text-sm mb-4">
                  {card.description}
                </p>
                <Button size="sm" className="w-full">
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Travel Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <span>Travel Alerts & News</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {travelAlerts.map((alert, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2",
                  alert.severity === "info" ? "bg-blue-500" :
                  alert.severity === "success" ? "bg-green-500" : "bg-yellow-500"
                )} />
                <p className="text-sm text-foreground flex-1">
                  {alert.message}
                </p>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Updates
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Your Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Destinations Explored</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AI Conversations</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Itineraries Created</span>
              <span className="font-semibold">3</span>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Join 10,000+ travelers using TourismAI
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
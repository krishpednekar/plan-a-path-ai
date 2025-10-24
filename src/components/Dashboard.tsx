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
import tourismHero from "@/assets/tourism-hero.jpg";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const featureCards = [
  {
    id: "recommendations",
    title: "Nature Expeditions",
    description: "AI-curated wilderness experiences",
    icon: Compass,
    gradient: "gradient-forest",
    stats: "100+ locations"
  },
  {
    id: "map",
    title: "Wildlife Map", 
    description: "Track habitats & trails",
    icon: MapPin,
    gradient: "gradient-nature",
    stats: "Live updates"
  },
  {
    id: "chat",
    title: "Wilderness Guide AI",
    description: "Expert nature & wildlife advice",
    icon: MessageSquare,
    gradient: "gradient-safari",
    stats: "24/7 support"
  },
  {
    id: "payments",
    title: "Premium Bookings",
    description: "Secure safari & tour payments",
    icon: CreditCard,
    gradient: "gradient-earth",
    stats: "Instant confirm"
  }
];

const travelAlerts = [
  {
    type: "weather",
    message: "🌤️ Ideal wildlife spotting conditions in Bandhavgarh National Park this week",
    severity: "info"
  },
  {
    type: "promotion",
    message: "🐅 Premium Tiger Safari - Early bird discount 25% off for October bookings",
    severity: "success"
  },
  {
    type: "update",
    message: "🌿 New eco-lodges opened in Jim Corbett sanctuary with zero-carbon footprint",
    severity: "info"
  }
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section with Hero Image */}
      <div className="relative gradient-wildlife rounded-2xl p-10 text-center overflow-hidden shadow-premium">
        <div 
          className="absolute inset-0 opacity-50 bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${tourismHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-accent/40 rounded-2xl" />
        <div className="relative z-10">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 gradient-forest rounded-2xl shadow-premium mb-4">
              <Compass className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-4 tracking-tight">
            Welcome to VanYatra
          </h1>
          <p className="text-xl text-white drop-shadow-lg mb-8 max-w-2xl mx-auto font-medium">
            Your premium gateway to pristine nature, untamed wildlife, and unforgettable wilderness adventures
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-lg">
              🌿 Nature Expeditions
            </Badge>
            <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-lg">
              🐅 Wildlife Safaris
            </Badge>
            <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-lg">
              🏔️ Adventure Trails
            </Badge>
            <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-lg">
              🌄 Eco Tourism
            </Badge>
          </div>
          <Badge className="inline-flex items-center space-x-2 bg-emerald-500/30 text-white border-emerald-300/50 backdrop-blur-md px-4 py-2 shadow-lg">
            <div className="w-2.5 h-2.5 bg-emerald-300 rounded-full animate-pulse shadow-lg"></div>
            <span className="font-semibold">AI Wilderness Guide Active</span>
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
              className="relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-premium hover:scale-105 group border-2 border-transparent hover:border-primary/30 shadow-card"
              onClick={() => onNavigate(card.id)}
            >
              <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity", card.gradient)} />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs font-semibold border-primary/30 bg-background/80 backdrop-blur-sm">
                    {card.stats}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors mt-4">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {card.description}
                </p>
                <Button size="sm" className="w-full shadow-md group-hover:shadow-lg transition-all">
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Travel Alerts */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gradient-primary">
              <AlertCircle className="h-6 w-6 text-primary" />
              <span>Wildlife & Nature Updates</span>
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
        <Card className="shadow-card gradient-earth/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>Your Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm text-muted-foreground font-medium">🌲 Wilderness Explored</span>
              <span className="font-bold text-primary text-lg">18</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm text-muted-foreground font-medium">🐾 Wildlife Spotted</span>
              <span className="font-bold text-primary text-lg">42</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm text-muted-foreground font-medium">🗓️ Safaris Booked</span>
              <span className="font-bold text-primary text-lg">5</span>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 p-3 bg-gradient-nature/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-xs text-foreground font-medium">
                  Join 25,000+ nature enthusiasts on VanYatra
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
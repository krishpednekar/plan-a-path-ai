import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, MapPin, Star, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recommendation {
  id: number;
  title: string;
  description: string;
  category: string;
  rating: number;
  duration: string;
  visitors: string;
  image: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: 1,
    title: "Netarhat Hill Station",
    description: "Perfect for sunrise views and trekking. Known as the 'Queen of Chotanagpur', this hill station offers breathtaking panoramic views and cool mountain air.",
    category: "nature",
    rating: 4.8,
    duration: "2-3 days",
    visitors: "1.2k/month",
    image: "🏔️"
  },
  {
    id: 2,
    title: "Betla National Park", 
    description: "Wildlife safari and elephant rides. Home to tigers, elephants, and diverse flora & fauna in the heart of Jharkhand. Perfect for wildlife photography and nature walks.",
    category: "wildlife",
    rating: 4.6,
    duration: "1-2 days",
    visitors: "800/month",
    image: "🐅"
  },
  {
    id: 3,
    title: "Hundru Falls",
    description: "Monsoon photography and adventure activities. A spectacular 320-foot waterfall that's perfect for nature lovers and adventure seekers looking for trekking and rappelling.",
    category: "adventure",
    rating: 4.7,
    duration: "Half day",
    visitors: "600/month", 
    image: "💧"
  },
  {
    id: 4,
    title: "Dassam Falls",
    description: "Scenic waterfall with natural pools for swimming. A hidden gem surrounded by dense forests and rocky terrain, ideal for picnics and nature photography.",
    category: "nature",
    rating: 4.5,
    duration: "Half day",
    visitors: "400/month",
    image: "🌊"
  },
  {
    id: 5,
    title: "Jagannath Temple Ranchi",
    description: "Ancient temple with rich cultural heritage. A replica of the famous Puri Jagannath Temple with stunning architecture and peaceful spiritual atmosphere.",
    category: "heritage",
    rating: 4.9,
    duration: "2-3 hours",
    visitors: "2k/month",
    image: "🏛️"
  },
  {
    id: 6,
    title: "Patratu Valley",
    description: "Valley of valleys with dam views and boating. Often called the 'Kashmir of Jharkhand' for its scenic beauty, perfect for romantic getaways and photography.",
    category: "nature",
    rating: 4.4,
    duration: "1 day",
    visitors: "900/month",
    image: "🏞️"
  },
  {
    id: 7,
    title: "Kerala Backwaters",
    description: "Serene houseboat cruises through palm-fringed canals. Experience the unique ecosystem of Kerala's backwaters with traditional hospitality and ayurvedic treatments.",
    category: "nature",
    rating: 4.9,
    duration: "3-5 days",
    visitors: "5k/month",
    image: "🛶"
  },
  {
    id: 8,
    title: "Goa Beaches",
    description: "Golden sandy beaches with vibrant culture. Perfect blend of Portuguese architecture, beach activities, water sports, and famous nightlife scene.",
    category: "beach",
    rating: 4.5,
    duration: "4-7 days", 
    visitors: "15k/month",
    image: "🏖️"
  },
  {
    id: 9,
    title: "Rajasthan Palaces",
    description: "Majestic forts and royal heritage. Explore the land of kings with stunning Rajput architecture, desert safaris, and rich cultural traditions.",
    category: "heritage",
    rating: 4.8,
    duration: "5-10 days",
    visitors: "8k/month",
    image: "🏰"
  }
];

const categoryColors = {
  nature: "bg-green-100 text-green-800 border-green-200",
  wildlife: "bg-orange-100 text-orange-800 border-orange-200", 
  adventure: "bg-red-100 text-red-800 border-red-200",
  heritage: "bg-purple-100 text-purple-800 border-purple-200",
  beach: "bg-blue-100 text-blue-800 border-blue-200"
};

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchRecommendations = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
      toast({
        title: "AI Recommendations Generated!",
        description: "Found 9 amazing destinations tailored for you.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Smart AI Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            Discover personalized travel destinations powered by AI
          </p>
        </div>
        <Button 
          onClick={fetchRecommendations}
          disabled={loading}
          className="bg-primary hover:bg-primary/90"
        >
          <Compass className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Get AI Recommendations"}
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground">AI is analyzing the best destinations for you...</p>
          </div>
        </div>
      )}

      {/* No Recommendations State */}
      {!loading && recommendations.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Compass className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Explore?</h3>
            <p className="text-muted-foreground mb-4">
              Click the button above to get personalized AI recommendations based on your preferences.
            </p>
            <Button onClick={fetchRecommendations} variant="outline">
              Start Discovering
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Grid */}
      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="overflow-hidden hover:shadow-hover transition-all duration-300 group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{rec.image}</div>
                  <Badge className={categoryColors[rec.category as keyof typeof categoryColors]}>
                    {rec.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {rec.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {rec.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{rec.rating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{rec.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{rec.visitors}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <MapPin className="mr-1 h-3 w-3" />
                    View on Map
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Add to Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Additional Info */}
      {recommendations.length > 0 && (
        <Card className="bg-secondary/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Want more personalized recommendations?</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with our AI assistant to get recommendations based on your specific interests, budget, and travel dates.
                </p>
              </div>
              <Button variant="outline">
                Chat with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
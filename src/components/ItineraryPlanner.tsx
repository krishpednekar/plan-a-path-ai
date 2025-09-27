import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ItineraryDay {
  day: number;
  activities: string[];
}

interface GeneratedItinerary {
  title: string;
  plan: ItineraryDay[];
}

export function ItineraryPlanner() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateItinerary = async () => {
    if (!destination || !duration || !travelStyle) {
      toast({
        title: "Please fill all fields",
        description: "Destination, duration, and travel style are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockItinerary: GeneratedItinerary = {
        title: `${travelStyle} Itinerary for ${destination} (${duration})`,
        plan: [
          {
            day: 1,
            activities: [
              `Arrive in ${destination}`,
              "Check into accommodation",
              "Visit local market and try street food",
              "Evening sunset viewpoint"
            ]
          },
          {
            day: 2,
            activities: [
              "Early morning nature walk",
              "Visit main tourist attractions",
              "Local cultural experience",
              "Traditional dinner at local restaurant"
            ]
          },
          {
            day: 3,
            activities: [
              "Adventure activities (trekking/safari)",
              "Photography session at scenic spots",
              "Shopping for local handicrafts",
              "Departure preparation"
            ]
          }
        ]
      };

      if (duration === "1 Week") {
        mockItinerary.plan.push(
          {
            day: 4,
            activities: [
              "Day trip to nearby attractions",
              "Water sports/adventure activities",
              "Local cooking class",
              "Night market exploration"
            ]
          },
          {
            day: 5,
            activities: [
              "Historical sites and museums",
              "Local guide walking tour", 
              "Traditional art and craft workshop",
              "Cultural performance evening"
            ]
          },
          {
            day: 6,
            activities: [
              "Relaxation and spa day",
              "Visit religious/spiritual sites",
              "Final shopping and souvenirs",
              "Farewell dinner"
            ]
          },
          {
            day: 7,
            activities: [
              "Check out and departure",
              "Airport/station transfer",
              "Safe journey home"
            ]
          }
        );
      }

      setItinerary(mockItinerary);
      setLoading(false);
      
      toast({
        title: "Itinerary Generated!",
        description: `Your personalized ${travelStyle.toLowerCase()} itinerary for ${destination} is ready.`,
      });
    }, 2000);
  };

  const resetForm = () => {
    setDestination("");
    setDuration("");
    setTravelStyle("");
    setItinerary(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Itinerary Planner</h1>
          <p className="text-muted-foreground mt-1">
            Create personalized travel plans with AI assistance
          </p>
        </div>
        {itinerary && (
          <Button onClick={resetForm} variant="outline">
            Plan New Trip
          </Button>
        )}
      </div>

      {/* Planning Form */}
      {!itinerary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Tell us about your dream trip</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Jharkhand, Goa, Kerala"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 Days">2 Days</SelectItem>
                    <SelectItem value="3-5 Days">3-5 Days</SelectItem>
                    <SelectItem value="1 Week">1 Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Travel Style</Label>
                <Select value={travelStyle} onValueChange={setTravelStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comfort">Comfort</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={generateItinerary}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Generating Your Perfect Itinerary...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Generate AI Itinerary
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generated Itinerary */}
      {itinerary && (
        <div className="space-y-6">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{itinerary.title}</span>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Generated</span>
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {itinerary.plan.map((dayPlan) => (
              <Card key={dayPlan.day} className="overflow-hidden hover:shadow-hover transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {dayPlan.day}
                    </div>
                    <span>Day {dayPlan.day}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {dayPlan.activities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <p className="text-sm text-foreground flex-1">{activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" size="lg">
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  <Clock className="mr-2 h-4 w-4" />
                  Customize Timing
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  <Users className="mr-2 h-4 w-4" />
                  Share Itinerary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tips */}
      {!itinerary && (
        <Card className="bg-secondary/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Pro Tips for Better Itineraries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>• Be specific with your destination for better recommendations</div>
              <div>• Consider local weather and seasons</div>
              <div>• Adventure style includes more outdoor activities</div>
              <div>• Budget style focuses on cost-effective options</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
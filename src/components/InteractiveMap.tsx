import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Search,
  Star,
  Camera,
  Clock,
  Users
} from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description: string;
  rating: number;
  image: string;
  visitors: string;
  bestTime: string;
}

const mockLocations: MapLocation[] = [
  {
    id: "1",
    name: "Netarhat Hill Station",
    category: "nature",
    lat: 23.4667,
    lng: 84.2500,
    description: "Queen of Chotanagpur with breathtaking sunrise views",
    rating: 4.8,
    image: "🏔️",
    visitors: "1.2k/month",
    bestTime: "Oct-Mar"
  },
  {
    id: "2",
    name: "Betla National Park",
    category: "wildlife",
    lat: 23.9000,
    lng: 84.2000,
    description: "Tigers, elephants, and diverse wildlife safari",
    rating: 4.6,
    image: "🐅",
    visitors: "800/month",
    bestTime: "Nov-Feb"
  },
  {
    id: "3", 
    name: "Hundru Falls",
    category: "adventure",
    lat: 23.4333,
    lng: 85.6167,
    description: "Spectacular 320-foot waterfall perfect for photography",
    rating: 4.7,
    image: "💧",
    visitors: "600/month",
    bestTime: "Jul-Oct"
  },
  {
    id: "4",
    name: "Jagannath Temple",
    category: "heritage",
    lat: 23.3441,
    lng: 85.3096,
    description: "Ancient temple with stunning architecture",
    rating: 4.9,
    image: "🏛️", 
    visitors: "2k/month",
    bestTime: "All year"
  }
];

const categoryColors = {
  nature: "bg-green-100 text-green-800 border-green-200",
  wildlife: "bg-orange-100 text-orange-800 border-orange-200",
  adventure: "bg-red-100 text-red-800 border-red-200", 
  heritage: "bg-purple-100 text-purple-800 border-purple-200"
};

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "standard">("standard");
  const [showAllPins, setShowAllPins] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interactive Map</h1>
          <p className="text-muted-foreground mt-1">
            Explore destinations with our AI-powered interactive map
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search Places
          </Button>
          <Button variant="outline" size="sm">
            <Navigation className="mr-2 h-4 w-4" />
            My Location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Controls & Filters */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-primary" />
                <span>Map Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Map View</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={mapView === "standard" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMapView("standard")}
                    className="text-xs"
                  >
                    Standard
                  </Button>
                  <Button 
                    variant={mapView === "satellite" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMapView("satellite")}
                    className="text-xs"
                  >
                    Satellite
                  </Button>
                  <Button 
                    variant={mapView === "terrain" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMapView("terrain")}
                    className="text-xs"
                  >
                    Terrain
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Filters</label>
                <div className="space-y-2">
                  {Object.entries(categoryColors).map(([category, className]) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <Badge className={className} variant="outline">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Badge>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location List */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLocations.map((location) => (
                <div
                  key={location.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-secondary/50 ${
                    selectedLocation?.id === location.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{location.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{location.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{location.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{location.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge className={categoryColors[location.category as keyof typeof categoryColors]} variant="outline">
                          {location.category}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{location.visitors}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Explore Jharkhand</span>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{mockLocations.length} locations</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
              {/* Mock Map Display */}
              <div className="relative h-full bg-gradient-to-br from-sky-light/20 to-forest-green/20 rounded-lg overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-12 h-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className="border border-gray-300/30" />
                    ))}
                  </div>
                </div>

                {/* Location Pins */}
                {mockLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110 z-10 ${
                      selectedLocation?.id === location.id ? "scale-125" : ""
                    }`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${
                        location.category === "nature" ? "bg-green-500" :
                        location.category === "wildlife" ? "bg-orange-500" :
                        location.category === "adventure" ? "bg-red-500" : "bg-purple-500"
                      }`}>
                        <MapPin className="h-5 w-5" />
                      </div>
                      {selectedLocation?.id === location.id && (
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border">
                          <div className="text-center">
                            <div className="text-2xl mb-1">{location.image}</div>
                            <h3 className="font-semibold text-sm">{location.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{location.description}</p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span>{location.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{location.bestTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Map Attribution */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded px-2 py-1 text-xs text-muted-foreground">
                  Map View: {mapView.charAt(0).toUpperCase() + mapView.slice(1)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Location Details */}
          {selectedLocation && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{selectedLocation.name}</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Camera className="mr-1 h-3 w-3" />
                      Photos
                    </Button>
                    <Button size="sm">
                      <Navigation className="mr-1 h-3 w-3" />
                      Directions
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{selectedLocation.description}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{selectedLocation.rating} Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedLocation.visitors}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedLocation.bestTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
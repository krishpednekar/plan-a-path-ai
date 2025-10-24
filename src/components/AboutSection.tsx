import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Compass, 
  Bot, 
  MapPin, 
  Calendar,
  MessageSquare,
  CreditCard,
  Shield,
  Sparkles,
  Users,
  Globe,
  HelpCircle,
  Mail,
  Phone,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Wilderness Guide",
    description: "Receive expert wildlife tracking insights and nature expedition recommendations tailored to your adventure style and conservation preferences."
  },
  {
    icon: MapPin,
    title: "Wildlife Habitat Mapping",
    description: "Navigate pristine reserves with detailed topographic maps showing animal territories, watering holes, and optimal viewing points."
  },
  {
    icon: Calendar,
    title: "Safari Itinerary Planner",
    description: "AI-crafted multi-day wildlife expeditions optimizing seasonal migrations, weather patterns, and exclusive eco-lodge experiences."
  },
  {
    icon: MessageSquare,
    title: "Expert Naturalist Chat",
    description: "Connect with our AI wilderness assistant trained on decades of conservation data, available 24/7 in multiple languages."
  },
  {
    icon: CreditCard,
    title: "Premium Booking System",
    description: "Secure safari bookings, eco-lodge reservations, and conservation fee payments with instant confirmation and carbon offset options."
  },
  {
    icon: Shield,
    title: "Responsible Tourism",
    description: "Every booking supports wildlife conservation. Your data is protected while we maintain transparency with local communities and sanctuaries."
  }
];

const stats = [
  { label: "Nature Enthusiasts", value: "25,000+", icon: Users },
  { label: "Wildlife Reserves", value: "350+", icon: MapPin },
  { label: "Conservation Projects", value: "120+", icon: Globe },
  { label: "Safari Expeditions", value: "15,000+", icon: MessageSquare }
];

export function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 gradient-wildlife rounded-2xl flex items-center justify-center shadow-premium">
            <Compass className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gradient-safari">
            VanYatra
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your premium wilderness companion powered by AI. Discover pristine nature reserves, 
          encounter magnificent wildlife, and embark on transformative eco-adventures with expert guidance.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="gradient-wildlife/20 border-primary/30 shadow-premium">
        <CardContent className="p-10 text-center">
          <Sparkles className="h-14 w-14 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-gradient-primary">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            To transform wildlife tourism through AI-powered conservation travel, making pristine nature accessible 
            while protecting it for future generations. Every journey with VanYatra supports habitat preservation, 
            community welfare, and creates meaningful connections between travelers and the natural world.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">Why Choose VanYatra?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <Card className="shadow-premium">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-gradient-safari">How VanYatra Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 gradient-forest rounded-2xl flex items-center justify-center mx-auto shadow-premium">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="font-bold text-lg">Share Your Vision</h3>
              <p className="text-sm text-muted-foreground">Tell us your wildlife interests, adventure level, and conservation values</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-20 h-20 gradient-safari rounded-2xl flex items-center justify-center mx-auto shadow-premium">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="font-bold text-lg">AI Curates Experiences</h3>
              <p className="text-sm text-muted-foreground">Our wilderness AI matches you with perfect reserves and wildlife encounters</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-20 h-20 gradient-nature rounded-2xl flex items-center justify-center mx-auto shadow-premium">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="font-bold text-lg">Book Premium Safari</h3>
              <p className="text-sm text-muted-foreground">Secure eco-lodges and expert guides with seamless booking</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-20 h-20 gradient-wildlife rounded-2xl flex items-center justify-center mx-auto shadow-premium">
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <h3 className="font-bold text-lg">Explore & Conserve</h3>
              <p className="text-sm text-muted-foreground">Experience nature while supporting conservation efforts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">wilderness@vanyatra.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+91 1800-123-456</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-sm text-muted-foreground">24/7 AI Chat, Mon-Fri 9AM-6PM Human Support</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Chat Support
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Does VanYatra support conservation?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! 10% of every booking goes directly to wildlife conservation and community development projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">How experienced are the guides?</h4>
              <p className="text-sm text-muted-foreground">
                All our naturalist guides are certified experts with 10+ years of wildlife tracking experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Are safaris suitable for families?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! We offer family-friendly safaris with age-appropriate activities and safety protocols.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">What's included in premium packages?</h4>
              <p className="text-sm text-muted-foreground">
                Luxury eco-lodges, expert guides, all meals, safari equipment, and exclusive wildlife experiences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer CTA */}
      <Card className="gradient-wildlife text-white shadow-premium">
        <CardContent className="p-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Wilderness Adventure?</h2>
          <p className="text-white mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
            Join 25,000+ nature enthusiasts who've discovered pristine wilderness with VanYatra. 
            Experience premium wildlife safaris, expert naturalist guidance, and make a positive impact on conservation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-premium">
              <Compass className="mr-2 h-5 w-5" />
              Start Your Safari Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/20 backdrop-blur-sm">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat with Wilderness Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState } from "react";
import { TourismLayout } from "@/components/TourismLayout";
import { Dashboard } from "@/components/Dashboard";
import { Recommendations } from "@/components/Recommendations";
import { InteractiveMap } from "@/components/InteractiveMap";
import { ItineraryPlanner } from "@/components/ItineraryPlanner";
import { MultilingualChat } from "@/components/MultilinguaChat";
import { PaymentSection } from "@/components/PaymentSection";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveTab} />;
      case "recommendations":
        return <Recommendations />;
      case "map":
        return <InteractiveMap />;
      case "itinerary":
        return <ItineraryPlanner />;
      case "chat":
        return <MultilingualChat />;
      case "payments":
        return <PaymentSection />;
      case "about":
        return <AboutSection />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <TourismLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </TourismLayout>
  );
};

export default Index;

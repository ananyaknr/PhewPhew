"use client";

import React, { useState } from "react";
import { OnboardingScreen } from "./organisms/OnboardingScreen";
import { HomeScreen } from "./organisms/HomeScreen";
import { ScanScreen } from "./organisms/ScanScreen";
import { AnalysisScreen } from "./organisms/AnalysisScreen";
import { CommunityScreen } from "./organisms/CommunityScreen";
import { LoyaltyScreen } from "./organisms/LoyaltyScreen";
import { TrackerScreen } from "./organisms/TrackerScreen";
import { RoutineScreen } from "./organisms/RoutineScreen";
import { DermScreen } from "./organisms/DermScreen";
import { ShopScreen } from "./organisms/ShopScreen";

export default function PhewphewApp() {
  const [currentScreen, setCurrentScreen] = useState<string>("onboarding");

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnboardingScreen onNav={setCurrentScreen} />;
      case "home":
        return <HomeScreen onNav={setCurrentScreen} />;
      case "scan":
        return <ScanScreen onNav={setCurrentScreen} />;
      case "analysis":
        return <AnalysisScreen onNav={setCurrentScreen} />;
      case "community":
        return <CommunityScreen onNav={setCurrentScreen} />;
      case "loyalty":
        return <LoyaltyScreen onNav={setCurrentScreen} />;
      case "tracker":
        return <TrackerScreen onNav={setCurrentScreen} />;
      case "routine":
        return <RoutineScreen onNav={setCurrentScreen} />;
      case "derm":
        return <DermScreen onNav={setCurrentScreen} />;
      case "shop":
        return <ShopScreen onNav={setCurrentScreen} />;
      default:
        return <HomeScreen onNav={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF8FD]">
      {renderScreen()}
    </div>
  );
}

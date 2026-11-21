import React from "react";
import { PulseLandingView } from "@/components/marketing/PulseLandingView";
import { BRAND_CONFIG, getPageTitle } from "@/lib/brand-config";

export const metadata = {
  title: getPageTitle(),
  description: BRAND_CONFIG.description,
};

export default function HomePage() {
  return <PulseLandingView />;
}

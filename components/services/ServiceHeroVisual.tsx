"use client";

import { ChatVisual } from "./visuals/ChatVisual";
import { VoiceVisual } from "./visuals/VoiceVisual";
import { FunnelVisual } from "./visuals/FunnelVisual";
import { FlowVisual } from "./visuals/FlowVisual";
import { CalendarVisual } from "./visuals/CalendarVisual";
import { DashboardVisual } from "./visuals/DashboardVisual";

export function ServiceHeroVisual({ slug, isHe }: { slug: string; isHe: boolean }) {
  switch (slug) {
    case "whatsapp-agent":
      return <ChatVisual isHe={isHe} variant="whatsapp" />;
    case "sales-service":
      return <ChatVisual isHe={isHe} variant="sales" />;
    case "ecommerce":
      return <ChatVisual isHe={isHe} variant="ecommerce" />;
    case "voice-agent":
      return <VoiceVisual isHe={isHe} />;
    case "lead-management":
      return <FunnelVisual isHe={isHe} />;
    case "automation":
    case "ai-agents":
      return <FlowVisual isHe={isHe} />;
    case "scheduling":
      return <CalendarVisual isHe={isHe} />;
    case "smart-crm":
      return <DashboardVisual isHe={isHe} variant="crm" />;
    case "consultation":
      return <DashboardVisual isHe={isHe} variant="consulting" />;
    default:
      return <ChatVisual isHe={isHe} variant="whatsapp" />;
  }
}

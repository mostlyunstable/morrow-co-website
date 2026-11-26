"use client";

import {
  Bot,
  Braces,
  Cloud,
  Code2,
  Cpu,
  CreditCard,
  Database,
  GitBranch,
  Layers,
  MessageSquare,
  Phone,
  Sparkles,
  Terminal,
  Wallet,
  Workflow,
} from "lucide-react";
import { MARQUEE_TOOLS } from "@/data/agency";

const TOOL_ICONS = [
  Code2,
  Braces,
  Terminal,
  Workflow,
  GitBranch,
  Cloud,
  Database,
  Layers,
  CreditCard,
  Wallet,
  Sparkles,
  Bot,
  Cpu,
  MessageSquare,
  Phone,
];

export function ToolMarquee() {
  const items = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS];

  return (
    <div className="pt-4">
      <p className="text-center text-[13.5px] font-medium tracking-[-0.01em] text-zinc-900">
        The tools we build with
      </p>

      <div className="marquee-wrap relative mt-7 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-36" />

        <div className="marquee-track flex items-center gap-12 sm:gap-16">
          {items.map((tool, idx) => {
            const Icon = TOOL_ICONS[idx % TOOL_ICONS.length];
            return (
              <div
                key={`${tool}-${idx}`}
                className="flex items-center gap-2.5 text-zinc-400"
              >
                <Icon className="h-[18px] w-[18px] shrink-0 text-zinc-400" />
                <span className="text-[17px] font-semibold tracking-[-0.02em] text-zinc-400">
                  {tool}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

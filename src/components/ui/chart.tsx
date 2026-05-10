"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { type TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

// This is a simplified version of shadcn/ui chart component
// adapted to work without the full registry complex configuration

const ChartContext = React.createContext<{ config: any } | null>(null);

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  config: any;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip({
  content,
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  return (
    <RechartsPrimitive.Tooltip
      content={content}
      cursor={{ strokeOpacity: 0.2 }}
      {...props}
    />
  );
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<any>;
  label?: any;
  indicator?: "dot" | "line" | "dashed";
  hideLabel?: boolean;
  labelKey?: string;
  labelFormatter?: (label: any) => React.ReactNode;
  className?: string;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  indicator = "dot",
  hideLabel = false,
  labelKey,
  labelFormatter,
  className,
}: ChartTooltipContentProps) {
  const { config } = React.useContext(ChartContext) || { config: {} };

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-xl border border-gray-100 bg-white p-4 shadow-xl text-[10px] font-black uppercase tracking-widest",
        className,
      )}
    >
      {!hideLabel && (
        <div className="font-bold text-gray-400">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item: any, index: number) => {
          const key = item.dataKey;
          const configItem = config[key] || {};

          return (
            <div key={key} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-500 uppercase">
                {configItem.label || key}:
              </span>
              <span className="text-[#111111] font-black ml-auto">
                {item.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

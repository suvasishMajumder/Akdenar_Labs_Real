"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient?: string; // tailwind gradient class
}

const HoverEffect = ({
  icon,
  title,
  description,
  gradient = "from-purple-500 via-pink-500 to-red-500",
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-2xl transition-all duration-300",
        "p-0 bg-transparent"
      )}
    >
      <Card className={cn("rounded-2xl bg-gradient-to-b transition-all duration-300 group-hover:shadow-xl relative z-10 h-full", gradient)}>
        <CardContent className="p-8 flex flex-col gap-4 items-center text-center">
          <div className="flex items-center justify-center mb-5">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            {title}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoverEffect;



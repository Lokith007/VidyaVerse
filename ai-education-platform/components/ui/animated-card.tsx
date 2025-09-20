"use client"

import { Card, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface AnimatedCardProps extends CardProps {
  delay?: number
  animation?: "fade-in" | "slide-up" | "scale-in"
}

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, delay = 0, animation = "fade-in", children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "card-hover hover-lift",
          animation === "fade-in" && "animate-fade-in",
          animation === "slide-up" && "animate-slide-up",
          animation === "scale-in" && "animate-scale-in",
          className,
        )}
        style={{ animationDelay: `${delay}ms` }}
        {...props}
      >
        {children}
      </Card>
    )
  },
)

AnimatedCard.displayName = "AnimatedCard"

export { AnimatedCard }

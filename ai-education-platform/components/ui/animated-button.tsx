"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface AnimatedButtonProps extends ButtonProps {
  shimmer?: boolean
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, shimmer = false, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "btn-animate focus-ring transition-all duration-200",
          shimmer && "relative overflow-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }

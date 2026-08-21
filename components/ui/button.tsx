import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[color,background-color,border-color,opacity,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        brand:
          "bg-gradient-to-r from-[#0876df] to-[#1688ee] text-white shadow-[0_10px_26px_rgba(8,118,223,.2),inset_0_1px_0_rgba(255,255,255,.28)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(8,118,223,.25)]",
        glass:
          "bg-white/[.62] text-[#24282e] shadow-[0_10px_28px_rgba(35,57,86,.08),inset_0_1px_0_rgba(255,255,255,.75)] ring-1 ring-black/[.055] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/80",
        glassOutline:
          "bg-[#e8f4ff]/65 text-[#0876df] shadow-[inset_0_1px_0_rgba(255,255,255,.8)] ring-1 ring-[#0876df]/15 backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[#dcefff]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

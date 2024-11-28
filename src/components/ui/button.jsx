import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        transparent: "bg-secondary button-text text-secondary-text cursor-pointer px-[31.5px] py-[13px]",
        default: "bg-primarybutton button-text  text-buttontextcolor hover:bg-primarybutton px-4 py-2 rounded-none h-10 w-fit ",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary bg-muted hover:bg-accent text-primary hover:text-primary h-10 px-4 py-2",
        secondary:
          "bg-secondarybutton px-4 py-2 h-10 w-fit button-text text-buttontextcolor",
        ghost: "body-text hover:bg-accent hover:text-accent-foreground",
        ghostadditional: "body14-meadium text-primary hover:bg-accent hover:text-accent-foreground",
        link: "text-linkbutton body-text underline-offset-4 hover:underline",
        danger:"bg-transparent text-red-600 border-2 border-red-600 ",
      },
      size: {
        // default: "h-10",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false,type = "button", icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
      >{icon && <span className="mr-1">{icon}</span>} {/* Render the icon */}
        {props.children}
        </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

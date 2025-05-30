import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-green-700 text-white shadow-xs hover:bg-green-600 focus-visible:ring-green-300 dark:focus-visible:ring-green-700",
        destructive:
          "bg-red-500 text-white shadow-xs hover:bg-red-600 focus-visible:ring-red-300 dark:focus-visible:ring-red-700",
        outline:
          "border border-green-500 text-green-500 bg-transparent shadow-xs hover:bg-green-50 dark:hover:bg-green-900 dark:text-green-400",
        secondary:
          "bg-green-100 text-green-700 shadow-xs hover:bg-green-200 dark:bg-green-800 dark:text-green-300",
        ghost:
          "hover:bg-green-50 text-green-500 dark:hover:bg-green-900 dark:text-green-400",
        link: "text-green-500 underline-offset-4 hover:underline dark:text-green-400",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

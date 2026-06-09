"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      offset={16}
      icons={{
        success: <CircleCheckIcon className="size-5 text-success" />,
        info: <InfoIcon className="size-5 text-brand" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-destructive" />,
        loading: <Loader2Icon className="size-5 animate-spin text-brand" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "calc(var(--radius) + 4px)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group cn-toast items-start! gap-3! rounded-xl! border! border-border! bg-popover! p-4! shadow-[0_10px_40px_-12px_rgba(27,58,92,0.35)]! ring-1! ring-foreground/5!",
          icon: "mt-0.5!",
          title: "text-sm! font-semibold! text-foreground!",
          description: "text-xs! text-muted-foreground!",
          closeButton:
            "border-border! bg-card! text-muted-foreground! hover:text-foreground!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

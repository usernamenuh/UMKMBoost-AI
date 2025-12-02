import type { ReactNode } from "react"

interface GridBackgroundProps {
  children: ReactNode
}

export const GridBackground = ({ children }: GridBackgroundProps) => {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-60" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

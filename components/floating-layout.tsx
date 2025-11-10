import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Floating Contact Bar",
  description: "Floating Contact Bar",
}

export default function FloatingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

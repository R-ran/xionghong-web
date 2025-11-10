import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sticky Nav",
  description: "Sticky Nav",
}


export default function StickyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
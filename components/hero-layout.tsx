import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hero Carousel",
  description: "Hero Carousel",
}


export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
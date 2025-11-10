import { Metadata } from "next"

export const metadata: Metadata = {
  title: "News",
  description: "News",
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
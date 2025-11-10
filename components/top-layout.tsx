import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Header",
  description: "Top Header",
}


export default function TopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
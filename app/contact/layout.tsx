import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Us",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      
      {children}
      
    </div>
  )
}
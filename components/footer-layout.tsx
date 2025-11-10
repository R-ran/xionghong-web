import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Footer Contact Form",
  description: "Footer Contact Form",
}


export default function FooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
} 

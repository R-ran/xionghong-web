import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Testimonials",
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
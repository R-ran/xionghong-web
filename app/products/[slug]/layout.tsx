import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description: "Products",
}


export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
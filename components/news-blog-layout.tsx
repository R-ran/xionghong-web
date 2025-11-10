import { Metadata } from "next"

export const metadata: Metadata = {
  title: "News & Blogs",
  description: "News & Blogs",
}


export default function NewsBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
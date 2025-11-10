import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Successful Projects",
  description: "Successful Projects",
}


export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

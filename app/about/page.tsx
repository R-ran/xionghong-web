// 改为动态渲染，确保 WordPress 更新能及时显示
export const dynamic = 'force-dynamic'

import { Metadata } from "next"
import AboutPageClient from "./about-page-content"
import { getAboutSections, type AboutSection } from "@/lib/wordpress"




export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company, team, and state-of-the-art manufacturing facilities.",
}

// 改为动态渲染，不再使用静态缓存
// export const revalidate = 3600 // 1小时重新验证

export default async function AboutPage() {
  let sections: AboutSection[] = []

  try {
    sections = await getAboutSections()
  } catch (error) {
    console.error("Failed to load sections in AboutPage:", error)
  }

  return <AboutPageClient sections={sections} />
}

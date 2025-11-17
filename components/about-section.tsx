"use client"

import { useCallback, useEffect, useState } from "react"
import type { SyntheticEvent } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Factory, Award, History } from "lucide-react"

import { getAboutSections } from "@/lib/wordpress"
import type { AboutSection as AboutSectionType } from "@/lib/wordpress"

// 图标映射
const iconMap = {
  Award,
  Factory,
  Building2,
  History,
} as const

export function AboutSection() {
  const [aboutSections, setAboutSections] = useState<AboutSectionType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAboutSections() {
      try {
        // 添加时间戳参数避免缓存
        const sections = await getAboutSections()
        console.log('首页获取到的 About Sections:', sections)
        setAboutSections(sections)
      } catch (error) {
        console.error('Failed to fetch about sections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutSections()
    // 每30秒重新获取一次，确保 WordPress 更新能及时显示
    const interval = setInterval(fetchAboutSections, 30000)
    return () => clearInterval(interval)
  }, [])

  // 添加调试日志来确认使用的数据来源
  useEffect(() => {
    if (!loading) {
      if (aboutSections.length > 0) {
        console.log('首页使用 WordPress 数据:', aboutSections)
      } else {
        console.log('首页使用 fallback 数据，WordPress 数据未加载')
      }
    }
  }, [loading, aboutSections])

  // Fallback static data if loading or error（与详情页保持一致）
  const fallbackAboutSections = [
    {
      id: "why-choose-us",
      title: "Why choose us",
      subtitle: "Why choose us",
      description:
        "Discover what sets us apart in the geotechnical anchoring industry with our commitment to quality and innovation.",
      detailedDescription: "SINOROCK stands out as a leading provider of geotechnical anchoring solutions through our unwavering commitment to quality, innovation, and customer satisfaction. With years of expertise in the industry, we have established ourselves as a trusted partner for projects worldwide. Our comprehensive product range, cutting-edge technology, and dedicated support team ensure that every project receives the highest level of service and attention to detail.",
      icon: "Award" as const,
      image: "/why.jpg",
      imageAlt: "Engineering team collaborating on SINOROCK geotechnical solutions",
      href: "/about?section=why-choose-us",
      order: 0,
    },
    {
      id: "factory-overview",
      title: "Factory Overview",
      subtitle: "Factory Overview",
      description:
        "Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.",
      detailedDescription: "Our state-of-the-art manufacturing facilities represent the pinnacle of modern production capabilities. Spanning over extensive grounds, our factories are equipped with advanced machinery and cutting-edge technology that enable us to produce high-quality anchor bolts and geotechnical solutions at scale. We maintain strict quality control systems throughout the production process, ensuring that every product meets international standards. Our facilities feature automated production lines, precision testing equipment, and dedicated quality assurance teams that work together to deliver excellence in every product we manufacture.",
      icon: "Factory" as const,
      image: "/industrial-factory-production-floor.jpg",
      imageAlt: "Interior of SINOROCK's advanced anchor bolt manufacturing facility",
      href: "/about/factory",
      order: 1,
    },
    {
      id: "history",
      title: "History",
      subtitle: "History",
      description:
        "Learn about our journey from inception to becoming a leading provider of geotechnical anchoring solutions.",
      detailedDescription: "Since our founding, SINOROCK has been on a remarkable journey of growth and innovation. Starting as a small operation with a vision to revolutionize geotechnical anchoring, we have steadily expanded our capabilities and market presence. Over the years, we have invested heavily in research and development, manufacturing infrastructure, and talent acquisition. Today, we are proud to be recognized as a leading provider of geotechnical anchoring solutions, serving clients across multiple continents and industries. Our history is a testament to our commitment to excellence and our dedication to meeting the evolving needs of the construction and mining sectors.",
      icon: "History" as const,
      image: "/history.jpg",
      imageAlt: "Historical display of SINOROCK project milestones",
      href: "/about/history",
      order: 2,
    },
    {
      id: "certificate",
      title: "Certificate",
      subtitle: "Certificate",
      description:
        "View our certifications and quality standards that demonstrate our commitment to excellence and safety.",
      detailedDescription: "Quality and safety are at the core of everything we do at SINOROCK. We have obtained numerous international certifications and quality standards that validate our commitment to excellence. Our certifications include ISO 9001:2015 for quality management systems, demonstrating our systematic approach to maintaining the highest standards in all our operations. These certifications are not just badges of honor—they represent our ongoing dedication to continuous improvement, rigorous quality control, and adherence to international best practices. We regularly undergo audits and assessments to ensure we maintain these standards and continue to exceed industry expectations.",
      icon: "Award" as const,
      image: "/certificate.jpg",
      imageAlt: "Certificates highlighting SINOROCK quality and safety achievements",
      href: "/about/certificate",
      order: 3,
    },
  ]

  // 确保总是按正确顺序显示
  const getOrderedSections = (sections: any[]) => {
    const correctOrder = ['why-choose-us', 'factory-overview', 'history', 'certificate']

    // 按照预设顺序重新排序
    const orderedSections = []
    for (const sectionId of correctOrder) {
      const section = sections.find(s => s.id === sectionId || s.slug === sectionId)
      if (section) {
        orderedSections.push(section)
      }
    }

    // 如果有其他不在预设顺序中的section，添加到最后
    const otherSections = sections.filter(s => !correctOrder.includes(s.id) && !correctOrder.includes(s.slug))
    orderedSections.push(...otherSections)

    return orderedSections
  }

  const displaySections = loading || !aboutSections || aboutSections.length === 0
    ? fallbackAboutSections
    : getOrderedSections(aboutSections)

  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>, fallback: string) => {
      const target = event.currentTarget
      if (!target || target.dataset.fallbackApplied === "true") {
        return
      }

      target.dataset.fallbackApplied = "true"
      target.src = fallback || "/placeholder.svg"
    },
    []
  )

  return (
    <section id="about" className="py-2 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/about" className="inline-block group">
            <h2 className="text-4xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">ABOUT </span>
              <span className="text-primary">US</span>
            </h2>
            <div className="w-20 h-1 bg-primary group-hover:w-24 transition-all" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displaySections.map((item) => {
            const IconComponent = iconMap[item.icon] || Building2
            return (
              <Link key={item.id} href={item.href}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.imageAlt || item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(event) => handleImageError(event, "/placeholder.svg")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <IconComponent className="h-12 w-12 text-primary mb-2" />
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

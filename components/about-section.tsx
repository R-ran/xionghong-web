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
        const sections = await getAboutSections()
        setAboutSections(sections)
      } catch (error) {
        console.error('Failed to fetch about sections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutSections()
  }, [])

  // Fallback static data if loading or error
  const fallbackAboutSections = [
    {
      id: "why-choose-us",
      title: "Why choose us",
      subtitle: "Why choose us",
      description:
        "Discover what sets us apart in the geotechnical anchoring industry with our commitment to quality and innovation.",
      detailedDescription: "",
      icon: "Award" as const,
      image: "/why.jpg",
      imageAlt: "Engineering team collaborating on SINOROCK geotechnical solutions",
      href: "/about/why-choose-us",
      order: 0,
    },
    {
      id: "factory-overview",
      title: "Factory Overview",
      subtitle: "Factory Overview",
      description:
        "Explore our state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems.",
      detailedDescription: "",
      icon: "Factory" as const,
      image: "/industrial-factory-production-floor.jpg",
      imageAlt: "Interior of SINOROCK's advanced anchor bolt manufacturing facility",
      href: "/about/factory-overview",
      order: 1,
    },
    {
      id: "history",
      title: "History",
      subtitle: "History",
      description:
        "Learn about our journey from inception to becoming a leading provider of geotechnical anchoring solutions.",
      detailedDescription: "",
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
      detailedDescription: "",
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

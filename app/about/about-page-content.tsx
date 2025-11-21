"use client"

import { Suspense, useEffect, useState } from "react"
import type { FormEvent, MouseEvent, SyntheticEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Building2, Factory, Award, X, History, ScrollText } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { getAboutSections, type AboutSection as WordPressAboutSection } from "@/lib/wordpress"

type AboutSection = WordPressAboutSection & {
  fallbackImage?: string
}

const FALLBACK_IMAGES: Record<string, string> = {
  "why-choose-us": "/why.jpg",
  "factory-overview": "/industrial-factory-production-floor.jpg",
  factory: "/industrial-factory-production-floor.jpg",
  history: "/history.jpg",
  certificate: "/certificate.jpg",
  overview: "/construction-site-with-installed-rock-bolts.jpg",
}

const PRIORITY_SECTION_IDS = ["why-choose-us"]

// 图标映射
const iconMap: Record<string, LucideIcon> = {
  Award,
  Factory,
  Building2,
  History,
  Certificate: ScrollText,
}

interface Props {
  sections: AboutSection[]
}

export default function AboutPageClient({ sections }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AboutPageContent initialSections={sections} />
    </Suspense>
  )
}

function withFallbackImages(sections: AboutSection[]): AboutSection[] {
  if (!Array.isArray(sections)) return []

  const processedSections = sections.map((section) => {
    const sanitizeImageUrl = (url?: string | null): string => {
      if (!url) return ""
      const normalized = url.trim()
      if (!normalized) return ""
      const lower = normalized.toLowerCase()
      if (
        lower === "/placeholder.svg" ||
        lower.endsWith("/placeholder.svg") ||
        lower === "placeholder.svg"
      ) {
        return ""
      }
      return normalized
    }

    const baseImage = sanitizeImageUrl(section.image)
    const fallbackImage = FALLBACK_IMAGES[section.id] ?? "/placeholder.svg"

    return {
      ...section,
      fallbackImage,
      image: baseImage || fallbackImage,
    }
  })

  if (PRIORITY_SECTION_IDS.length === 0) {
    return processedSections
  }

  const priorityOrder = PRIORITY_SECTION_IDS.map((id) => id.toLowerCase())
  const prioritySections: AboutSection[] = []
  const remainingSections: AboutSection[] = []

  for (const section of processedSections) {
    const normalizedId = section.id.toLowerCase()
    if (priorityOrder.includes(normalizedId)) {
      prioritySections.push(section)
    } else {
      remainingSections.push(section)
    }
  }

  const orderedPrioritySections = priorityOrder.flatMap((id) =>
    prioritySections.filter((section) => section.id.toLowerCase() === id)
  )

  return [...orderedPrioritySections, ...remainingSections]
}

function AboutPageContent({ initialSections }: { initialSections: AboutSection[] }) {
  const [sections, setSections] = useState<AboutSection[]>(withFallbackImages(initialSections))
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>, fallback: string) => {
    if (!fallback) {
      return
    }

    const target = event.currentTarget

    if (!target || target.dataset.fallbackApplied === "true") {
      return
    }

    target.dataset.fallbackApplied = "true"

    try {
      const resolved = fallback.startsWith("http")
        ? fallback
        : new URL(fallback, target.baseURI || window.location.origin).toString()

      target.src = resolved
    } catch (error) {
      console.error("Failed to apply fallback image:", error)
      target.src = fallback
    }
  }

  useEffect(() => {
    const processedSections = withFallbackImages(initialSections)
    console.log('Client sections after processing:', processedSections.map(s => ({ id: s.id, title: s.title })))
    setSections(processedSections)
  }, [initialSections])

  useEffect(() => {
    let isMounted = true

    const fetchSections = async () => {
      try {
        const data = await getAboutSections()
        console.log('About 页面获取到的 Sections:', data)
        if (isMounted) {
          setSections(withFallbackImages(data))
        }
      } catch (error) {
        console.error("Failed to fetch about sections on client:", error)
      }
    }

    fetchSections()
    // 每30秒重新获取一次，确保 WordPress 更新能及时显示
    const interval = setInterval(fetchSections, 30000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, []) // 移除对initialSections的依赖，确保每次都重新获取数据

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const sectionParam = searchParams.get("section")
    if (sectionParam && sections.length > 0) {
      const normalized = sectionParam.toLowerCase()
      const matchingCategory = sections.find(
        (section) => section.id.toLowerCase() === normalized || 
                     section.slug?.toLowerCase() === normalized
      )
      if (matchingCategory) {
        setSelectedCategory(matchingCategory.id)
        // 延迟清理 URL，确保状态已设置
        setTimeout(() => {
          const navElement = document.querySelector('[data-nav-section]')
          if (navElement) {
            navElement.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          // 清理 URL 查询参数，但保留选中的状态
          router.replace("/about", { scroll: false })
        }, 200)
      }
    }
  }, [searchParams, router, sections])

  const selectedItem = selectedCategory
    ? sections.find((item) => item.id === selectedCategory) ?? null
    : null
  const SelectedIcon = selectedItem ? iconMap[selectedItem.icon] : null

  const handleCardClick = (itemId: string) => {
    setSelectedCategory(itemId)
    setTimeout(() => {
      const navElement = document.querySelector('[data-nav-section]')
      if (navElement) {
        navElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleLearnMoreClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted")
    alert("Message sent successfully!")
    setShowModal(false)
  }

  // 无数据时展示占位
  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">敬请期待，我们正在准备关于我们的内容。</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; About Us
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="text-primary">Us</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn more about our company, team, and state-of-the-art manufacturing facilities.
          </p>
        </div>

        {/* About Categories Navigation */}
        <div className="container mx-auto px-4 mb-8" data-nav-section>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-700">
              {sections.map((section) => {
                const isSelected = selectedCategory === section.id
                const IconComponent = iconMap[section.icon]
                return (
                  <div
                    key={section.id}
                    onClick={() => setSelectedCategory(section.id)}
                    className={`p-6 transition-colors cursor-pointer flex flex-col items-center justify-center h-full ${
                      isSelected ? "bg-primary" : "hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-gray-800" : "bg-primary"
                        }`}
                      >
                        {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-1">{section.title}</h3>
                        <p className="text-white/80 text-sm">
                          {section.subtitle || section.title}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* About Content - Image and Text */}
        {selectedItem ? (
          <div className="container mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={selectedItem.image || selectedItem.fallbackImage || "/placeholder.svg"}
                  alt={selectedItem.imageAlt || selectedItem.title}
                  className="w-full h-auto max-h-[600px] object-contain rounded-lg"
                  data-fallback={selectedItem.fallbackImage || "/placeholder.svg"}
                  onError={(event) =>
                    handleImageError(event, selectedItem.fallbackImage || "/placeholder.svg")
                  }
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  {SelectedIcon && <SelectedIcon className="h-12 w-12 text-primary" />}
                  <h2 className="text-3xl md:text-4xl font-bold">{selectedItem.title}</h2>
                </div>
                <div 
                  className="text-lg text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedItem.detailedDescription }}
                />
                <button
                  onClick={handleLearnMoreClick}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sections.map((item) => {
                const IconComponent = iconMap[item.icon]
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item.id)}
                    className="cursor-pointer"
                  >
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                      <CardContent className="p-0">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={item.image || item.fallbackImage || "/placeholder.svg"}
                            alt={item.imageAlt || item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            data-fallback={item.fallbackImage || "/placeholder.svg"}
                            onError={(event) =>
                              handleImageError(event, item.fallbackImage || "/placeholder.svg")
                            }
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            {IconComponent && <IconComponent className="h-12 w-12 text-primary mb-2" />}
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company Name *
                    </label>
                    <Input id="company" placeholder="Your company name" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input id="phone" type="tel" placeholder="+86 123 4567 8900" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={6} required />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
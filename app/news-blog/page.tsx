"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect } from "react"

const allNews = [
  {
    id: 1,
    title: "New Generation Rock Bolt Technology Launched",
    excerpt:
      "We are excited to announce the launch of our latest rock bolt technology, featuring enhanced corrosion resistance and improved load capacity.",
    date: "2024-03-15",
    image: "/modern-rock-bolt-technology.jpg",
    category: "Product News",
  },
  {
    id: 2,
    title: "SINOROCK Participates in International Mining Conference",
    excerpt:
      "Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference in Singapore.",
    date: "2024-03-10",
    image: "/conference-exhibition-booth.jpg",
    category: "Company News",
  },
  {
    id: 3,
    title: "Case Study: Successful Tunnel Project in Europe",
    excerpt:
      "Learn how our T Thread self-drilling anchor bolts contributed to the successful completion of a major tunnel project in Switzerland.",
    date: "2024-03-05",
    image: "/european-tunnel-project.jpg",
    category: "Case Study",
  },
  {
    id: 4,
    title: "Industry Insights: Future of Geotechnical Anchoring",
    excerpt:
      "Explore the latest trends and innovations shaping the future of geotechnical anchoring solutions in construction and mining.",
    date: "2024-02-28",
    image: "/future-technology-concept.jpg",
    category: "Industry Insights",
  },
  {
    id: 5,
    title: "Quality Certification: ISO 9001:2015 Renewed",
    excerpt:
      "SINOROCK successfully renewed its ISO 9001:2015 certification, demonstrating our commitment to quality management excellence.",
    date: "2024-02-20",
    image: "/quality-certification-ceremony.jpg",
    category: "Company News",
  },
  {
    id: 6,
    title: "Technical Guide: Selecting the Right Anchor Bolt",
    excerpt:
      "A comprehensive guide to help engineers and contractors choose the most suitable anchor bolt system for their specific project requirements.",
    date: "2024-02-15",
    image: "/technical-engineering-diagram.jpg",
    category: "Technical Guide",
  },
]

export default function NewsBlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen">
      <TopHeader />
      <StickyNav />

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-foreground">NEWS & </span>
              <span className="text-primary">BLOG</span>
            </h1>
            <div className="w-20 h-1 bg-primary" />
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Stay updated with the latest news, product launches, industry insights, and success stories from SINOROCK.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded">
                    {item.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-balance">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 text-pretty">{item.excerpt}</p>
                  <Link href={`/news-blog/${item.id}`}>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Read More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

"use client"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const xinghongNews = [
  {
    id: 1,
    title: "Common Failures For Hollow Anchor Bar Tunnel Construction",
    excerpt:
      "Common failures in hollow anchor bar tunnel construction: causes, solutions, and Sinorock's self-drilling anchor technology advantages.",
    date: "2024-10-28",
    category: "Technical",
  },
  {
    id: 2,
    title: "Top 6 Critical Steps For Self-Drilling Anchor Bolt Construction",
    excerpt:
      "Master the 6 critical steps for self-drilling anchor installation! Boost construction safety and efficiency with expert guidance.",
    date: "2024-10-23",
    category: "Guide",
  },
  {
    id: 3,
    title: "SINOROCK Participates in International Mining Conference",
    excerpt:
      "Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference.",
    date: "2024-10-15",
    category: "Company News",
  },
]

const blogPosts = [
  {
    id: 4,
    title: "Understanding Rock Bolt Technology in Modern Construction",
    excerpt: "A comprehensive guide to rock bolt applications, types, and best practices for construction projects.",
    date: "2024-10-20",
    author: "Engineering Team",
  },
  {
    id: 5,
    title: "Corrosion Prevention in Underground Anchoring Systems",
    excerpt:
      "Learn about the latest techniques and materials for preventing corrosion in harsh underground environments.",
    date: "2024-10-12",
    author: "Technical Department",
  },
]

export function NewsBlogSection() {
  return (
    <section id="news-blog" className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Xinghong News */}
          <div>
            <div className="mb-4">
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-foreground">NE</span>
                <span className="text-primary">WS</span>
              </h2>
              <div className="w-20 h-1 bg-primary" />
            </div>

            <div className="space-y-6">
              {xinghongNews.map((item) => (
                <div key={item.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-semibold text-balance flex-1">{item.title}</h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3 text-pretty">{item.excerpt}</p>
                  <Link href={`/news-blog/${item.id}`}>
                    <Button variant="link" className="p-0 h-auto text-primary group/btn">
                      VIEW MORE
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Blog */}
          <div>
            <div className="mb-4">
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-foreground">BL</span>
                <span className="text-primary">OG</span>
              </h2>
              <div className="w-20 h-1 bg-primary" />
            </div>

            {/* Blog Post Listings */}
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-semibold text-balance flex-1">{post.title}</h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3 text-pretty">{post.excerpt}</p>
                  <Link href={`/news-blog/${post.id}`}>
                    <Button variant="link" className="p-0 h-auto text-primary group/btn">
                      VIEW MORE
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/news-blog">
                <Button variant="outline" size="lg" className="group bg-transparent">
                  VIEW MORE
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

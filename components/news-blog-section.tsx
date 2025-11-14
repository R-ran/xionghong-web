"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { getNewsBlogs, truncateExcerpt } from "@/lib/wordpress"
import type { NewsBlogArticle } from "@/lib/wordpress"

export function NewsBlogSection() {
  const [newsArticles, setNewsArticles] = useState<NewsBlogArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data: articles } = await getNewsBlogs({ page: 1, perPage: 3, type: 'news' })
        setNewsArticles(articles)
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Fallback static data if loading or error
  const fallbackNews = [
    {
      id: "1",
      title: "New Generation Rock Bolt Technology Launched",
      excerpt: "We are excited to announce the launch of our latest rock bolt technology, featuring enhanced corrosion resistance and improved load capacity.",
      date: "2024-03-15",
      featured_image: "/placeholder.svg",
      slug: "new-generation-rock-bolt"
    },
    {
      id: "2",
      title: "SINOROCK Participates in International Mining Conference",
      excerpt: "Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference.",
      date: "2024-03-10",
      featured_image: "/placeholder.svg",
      slug: "mining-conference"
    },
    {
      id: "3",
      title: "Case Study: Successful Tunnel Project in Europe",
      excerpt: "Learn how our T Thread self-drilling anchor bolts contributed to the successful completion of a major tunnel project.",
      date: "2024-03-05",
      featured_image: "/placeholder.svg",
      slug: "tunnel-project-europe"
    }
  ]

  const displayNews = loading || !newsArticles || newsArticles.length === 0 ? fallbackNews : newsArticles
  return (
    <section id="news-blogs" className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/news-blogs/news" className="group inline-flex flex-col">
            <h2 className="text-4xl font-bold mb-2 transition-colors group-hover:text-primary">
              <span className="text-foreground group-hover:text-primary/80">NE</span>
              <span className="text-primary">WS</span>
            </h2>
          </Link>
          <div className="w-20 h-1 bg-primary" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {displayNews.map((item) => (
            <article
              key={item.id}
              className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col"
            >
              <Link href={`/news-blogs/news?article=${item.id}`} className="relative block h-48 w-full">
                <Image
                  src={item.featured_image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </Link>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-balance flex-1">{item.title}</h3>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(item.publish_date || item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty flex-1 line-clamp-3">
                  {truncateExcerpt(item.excerpt, 120)}
                </p>
                <Link href={`/news-blogs/news?article=${item.id}`}>
                  <Button variant="link" className="p-0 h-auto text-primary group/btn">
                    VIEW MORE
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/news-blogs/news">
            <Button variant="outline" size="lg" className="group bg-transparent">
              VIEW MORE
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

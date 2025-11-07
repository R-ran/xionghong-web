"use client"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { getArticlesByType } from "@/lib/news-blogs-data"

const xinghongNews = getArticlesByType("news").slice(0, 3)
const blogPosts = getArticlesByType("blog").slice(0, 2)

export function NewsBlogSection() {
  return (
    <section id="news-blogs" className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Xinghong News */}
          <div>
            <div className="mb-4">
              <Link href="/news-blogs/news" className="group inline-flex flex-col">
                <h2 className="text-4xl font-bold mb-2 transition-colors group-hover:text-primary">
                  <span className="text-foreground group-hover:text-primary/80">NE</span>
                  <span className="text-primary">WS</span>
                </h2>
              </Link>
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
                  <Link href={`/news-blogs/news?article=${item.id}`}>
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
              <Link href="/news-blogs/blogs" className="group inline-flex flex-col">
                <h2 className="text-4xl font-bold mb-2 transition-colors group-hover:text-primary">
                  <span className="text-foreground group-hover:text-primary/80">BL</span>
                  <span className="text-primary">OG</span>
                </h2>
              </Link>
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
                  <Link href={`/news-blogs/blogs?article=${post.id}`}>
                    <Button variant="link" className="p-0 h-auto text-primary group/btn">
                      VIEW MORE
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/news-blogs">
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

"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
// 注释掉不再需要的导入
// import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
// 从共享数据文件导入
import { getLatestNews } from "@/lib/news-blog-data"

// 辅助函数：截断文本
function truncateExcerpt(text: string, maxLength: number): string {
  if (!text) return ''
  const cleaned = text.replace(/<[^>]*>/g, '')
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength) + '...'
}

export function NewsBlogSection() {
  // 从共享数据文件获取最新的3条新闻
  const displayNews = getLatestNews(3).map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    date: article.publish_date,
    featured_image: article.featured_image,
    slug: article.id, // 使用 id 作为 slug
    publish_date: article.publish_date // 添加 publish_date 以兼容现有代码
  }))
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



import { Calendar, ArrowLeft, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { Metadata } from "next"

// 注释掉 WordPress API 导入
// import { getNewsBlogDetail, getAllNewsBlogPaths } from "@/lib/wordpress"

// 从共享数据文件导入
import { getArticleById, type StaticArticle } from "@/lib/news-blog-data"

export const metadata: Metadata = {
  title: "News & Blogs",
  description: "News & Blogs",
}

// 注释掉 WordPress 静态路径生成
// // 修改：从WordPress获取所有文章路径
// export async function generateStaticParams() {
//   try {
//     const paths = await getAllNewsBlogPaths()
//     // 只返回有效的路径
//     return paths.filter(path => path.id && path.slug).map(({ id }) => ({ id }))
//   } catch (error) {
//     console.warn('⚠️ Failed to generate static params for news-blogs:', error)
//     // 返回空数组，避免构建失败
//     return []
//   }
// }

export const dynamic = "force-dynamic";

// 修改：使用静态数据
export default function NewsArticlePage({ params }: { params: { id: string } }) {
  // 注释掉 WordPress 数据获取
  // const article = await getNewsBlogDetail(params.id)
  
  // 从共享数据文件获取文章
  const article = getArticleById(params.id)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <TopHeader />
      <StickyNav />

      <article className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href={article.type === "news" ? "/news-blogs/news" : "/news-blogs/blogs"}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {article.type === "news" ? "News" : "Blogs"}
            </Button>
          </Link>

          <div className="space-y-8">
            {/* 文章标题和元信息 */}
            <div className="space-y-4 text-center">
              <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded">
                {article.categories?.[0] || article.type}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mx-auto max-w-4xl">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {article.author_name && (
                  <span className="flex items-center gap-2">
                    <PenLine className="h-4 w-4" />
                    {article.author_name}
                  </span>
                )}
              </div>
            </div>

            {/* 文章图片 */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={article.featured_image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* 文章内容 */}
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  lineHeight: "1.8",
                }}
              />
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
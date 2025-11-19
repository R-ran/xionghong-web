// 共享的新闻博客数据
// 改为从WordPress获取数据，确保数据一致性

export type StaticArticle = {
  id: string
  title: string
  excerpt: string
  publish_date: string
  featured_image: string
  content: string
  categories?: string[]
  type?: string
  author_name?: string
}

// 静态文章数据 - 已清空，改为从WordPress获取数据
export const staticArticles: StaticArticle[] = []

// 获取新闻文章（type: 'news'）
export function getNewsArticles(): StaticArticle[] {
  return staticArticles.filter(article => article.type === 'news')
}

// 获取博客文章（type: 'blogs'）
export function getBlogArticles(): StaticArticle[] {
  return staticArticles.filter(article => article.type === 'blogs')
}

// 根据 ID 获取文章
export function getArticleById(id: string): StaticArticle | undefined {
  return staticArticles.find(article => article.id === id)
}

// 获取最新的新闻文章（用于首页显示）
export function getLatestNews(count: number = 3): StaticArticle[] {
  return getNewsArticles()
    .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
    .slice(0, count)
}
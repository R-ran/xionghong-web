// 共享的新闻博客数据
// 所有 news & blogs 相关页面都从这里获取数据，确保数据一致性

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

// 静态文章数据
export const staticArticles: StaticArticle[] = [
  {
    id: "1",
    title: "New Generation Rock Bolt Technology Launched",
    excerpt: "We are excited to announce the launch of our latest rock bolt technology, featuring enhanced corrosion resistance and improved load capacity.",
    publish_date: "2024-03-15",
    featured_image: "/anchor-accessories-and-tools.jpg",
    content: "<p>We are excited to announce the launch of our latest rock bolt technology, featuring enhanced corrosion resistance and improved load capacity.</p>",
    categories: ["News"],
    type: "news",
    author_name: "SINOROCK Team"
  },
  {
    id: "2",
    title: "SINOROCK Participates in International Mining Conference",
    excerpt: "Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference.",
    publish_date: "2024-03-10",
    featured_image: "/anchor-bolt-drilling-equipment.jpg",
    content: "<p>Our team showcased innovative anchoring solutions at the 2024 International Mining and Tunneling Conference.</p>",
    categories: ["News"],
    type: "news",
    author_name: "SINOROCK Team"
  },
  {
    id: "3",
    title: "Case Study: Successful Tunnel Project in Europe",
    excerpt: "Learn how our T Thread self-drilling anchor bolts contributed to the successful completion of a major tunnel project.",
    publish_date: "2024-03-05",
    featured_image: "/news3.jpg",
    content: "<p>Learn how our T Thread self-drilling anchor bolts contributed to the successful completion of a major tunnel project.</p>",
    categories: ["News"],
    type: "news",
    author_name: "SINOROCK Team"
  },
  {
    id: "4",
    title: "Complete Guide to Rock Bolt Installation",
    excerpt: "Learn the best practices for installing rock bolts in various geological conditions.",
    publish_date: "2024-03-20",
    featured_image: "/blog1.jpg",
    content: "<p>Learn the best practices for installing rock bolts in various geological conditions.</p>",
    categories: ["Blogs"],
    type: "blogs",
    author_name: "SINOROCK Team"
  },
  {
    id: "5",
    title: "Corrosion Resistance Techniques for Anchor Bolts",
    excerpt: "Discover advanced techniques to enhance the corrosion resistance of anchor bolts in challenging environments.",
    publish_date: "2024-03-18",
    featured_image: "/blog2.jpg",
    content: "<p>Discover advanced techniques to enhance the corrosion resistance of anchor bolts in challenging environments.</p>",
    categories: ["Blogs"],
    type: "blogs",
    author_name: "SINOROCK Team"
  },
  {
    id: "6",
    title: "Best Practices for Tunneling Projects",
    excerpt: "Expert insights on selecting and using anchor bolts for tunneling applications.",
    publish_date: "2024-03-12",
    featured_image: "/blog3.jpg",
    content: "<p>Expert insights on selecting and using anchor bolts for tunneling applications.</p>",
    categories: ["Blogs"],
    type: "blogs",
    author_name: "SINOROCK Team"
  }
]

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


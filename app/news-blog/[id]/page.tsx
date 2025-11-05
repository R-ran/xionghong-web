import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

const newsArticles: Record<string, any> = {
  "1": {
    id: 1,
    title: "New Generation Rock Bolt Technology Launched",
    date: "2024-03-15",
    image: "/modern-rock-bolt-technology.jpg",
    category: "Product News",
    content: `
      <p>We are thrilled to announce the launch of our latest innovation in rock bolt technology. This new generation of anchor bolts represents a significant leap forward in geotechnical anchoring solutions.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Enhanced corrosion resistance with advanced coating technology</li>
        <li>Improved load capacity up to 30% compared to previous models</li>
        <li>Faster installation time, reducing project costs</li>
        <li>Extended service life in harsh environmental conditions</li>
      </ul>
      
      <h2>Technical Specifications</h2>
      <p>The new rock bolt system has been rigorously tested and certified to meet international standards. Our engineering team has worked tirelessly to ensure that this product delivers exceptional performance in the most demanding applications.</p>
      
      <p>For more information about our new rock bolt technology, please contact our technical support team or visit our products page.</p>
    `,
  },
  "2": {
    id: 2,
    title: "SINOROCK Participates in International Mining Conference",
    date: "2024-03-10",
    image: "/conference-exhibition-booth.jpg",
    category: "Company News",
    content: `
      <p>SINOROCK was proud to participate in the 2024 International Mining and Tunneling Conference held in Singapore. This prestigious event brought together industry leaders, engineers, and innovators from around the world.</p>
      
      <h2>Exhibition Highlights</h2>
      <p>Our exhibition booth showcased our complete range of anchoring solutions, including our latest T Thread and R Thread self-drilling anchor bolts. Visitors had the opportunity to see live demonstrations and speak directly with our technical experts.</p>
      
      <h2>Networking and Partnerships</h2>
      <p>The conference provided an excellent platform for networking with potential partners and clients. We engaged in meaningful discussions about future collaborations and explored opportunities in emerging markets.</p>
      
      <p>We look forward to participating in more industry events and continuing to contribute to the advancement of geotechnical engineering.</p>
    `,
  },
  "3": {
    id: 3,
    title: "Case Study: Successful Tunnel Project in Europe",
    date: "2024-03-05",
    image: "/european-tunnel-project.jpg",
    category: "Case Study",
    content: `
      <p>We are pleased to share the success story of a major tunnel construction project in Switzerland, where our T Thread self-drilling anchor bolts played a crucial role in ensuring project safety and efficiency.</p>
      
      <h2>Project Overview</h2>
      <p>The project involved the construction of a 5-kilometer tunnel through challenging geological conditions. Our anchoring solutions were selected for their reliability and proven performance in similar applications.</p>
      
      <h2>Challenges and Solutions</h2>
      <ul>
        <li>Variable rock conditions requiring flexible anchoring solutions</li>
        <li>Strict safety requirements and quality standards</li>
        <li>Tight project timeline demanding efficient installation</li>
      </ul>
      
      <h2>Results</h2>
      <p>The project was completed on schedule with zero safety incidents. Our anchor bolts performed exceptionally well, providing the required support and stability throughout the construction process.</p>
      
      <p>This case study demonstrates our commitment to delivering high-quality products and technical support for complex engineering projects worldwide.</p>
    `,
  },
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = newsArticles[params.id]

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <TopHeader />
      <StickyNav />

      <article className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/news-blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News & Blog
            </Button>
          </Link>

          <div className="mb-6">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{article.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              lineHeight: "1.8",
            }}
          />
        </div>
      </article>

      <Footer />
    </main>
  )
}

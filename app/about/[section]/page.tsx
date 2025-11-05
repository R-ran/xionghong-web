import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AboutPage({ params }: { params: { section: string } }) {
  const titles: Record<string, string> = {
    company: "The Company",
    team: "Our Team",
    factory: "Our Factory",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{titles[params.section] || params.section}</h1>

          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <img
              src={`/placeholder.svg?height=600&width=1200&query=${params.section}`}
              alt={params.section}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              {params.section === "company" && (
                <>
                  OUR VISION: Become a leading productivity provider in geotechnical anchoring. OUR MISSION: Keep
                  providing competitive solutions to global geotechnical anchoring projects, making projects safer and
                  more efficient.
                </>
              )}
              {params.section === "team" && (
                <>
                  Our experienced team of engineers and professionals is dedicated to providing innovative solutions and
                  exceptional service. With decades of combined experience in the geotechnical industry, we bring
                  expertise and commitment to every project.
                </>
              )}
              {params.section === "factory" && (
                <>
                  Our state-of-the-art manufacturing facilities are equipped with advanced technology and quality
                  control systems. We maintain strict production standards to ensure every product meets international
                  quality requirements.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

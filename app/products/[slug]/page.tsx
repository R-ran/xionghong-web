import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ProductPage({ params }: { params: { slug: string } }) {
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
          <h1 className="text-4xl font-bold mb-8 capitalize">{params.slug.replace(/-/g, " ")}</h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={`/placeholder.svg?height=600&width=600&query=${params.slug}`}
                alt={params.slug}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                <p className="text-muted-foreground leading-relaxed">
                  High-quality anchoring solution designed for demanding geotechnical applications. Our products meet
                  international standards and are trusted by professionals worldwide.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Superior strength and durability</li>
                  <li>• Corrosion-resistant materials</li>
                  <li>• Easy installation process</li>
                  <li>• Compliant with industry standards</li>
                  <li>• Available in various specifications</li>
                </ul>
              </div>

              <Button className="w-full" size="lg">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

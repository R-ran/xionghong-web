"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { ProductsSection } from "@/components/products-section"
import { Footer } from "@/components/footer"
import { useEffect } from "react"

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        <div className="container mx-auto px-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Discover our comprehensive range of high-quality anchoring solutions designed for various geotechnical
            applications.
          </p>
        </div>

        <ProductsSection />
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { useEffect } from "react"

export default function AboutPage() {
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
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn more about our company, team, and state-of-the-art manufacturing facilities.
          </p>
        </div>

        <AboutSection />
      </main>

      <Footer />
    </div>
  )
}

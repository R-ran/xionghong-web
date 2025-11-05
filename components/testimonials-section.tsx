"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const chinaProjects = [
  {
    id: 1,
    name: "Beijing Subway Line 16",
    location: "Beijing, China",
    description:
      "Successfully provided rock bolt solutions for the construction of Beijing Subway Line 16, ensuring structural stability in complex geological conditions.",
    image: "/beijing.jpg",
    year: "2023",
  },
  {
    id: 2,
    name: "Sichuan Hydropower Station",
    location: "Sichuan, China",
    description:
      "Delivered high-performance anchor systems for the underground powerhouse excavation of a major hydropower project in mountainous terrain.",
    image: "/sichuan.jpg",
    year: "2022",
  },
]

const overseasProjects = [
  {
    id: 3,
    name: "Swiss Alpine Tunnel",
    location: "Switzerland",
    description:
      "Provided T Thread self-drilling anchor bolts for a major alpine tunnel project, meeting stringent European safety standards.",
    image: "/overseas1.jpg",
    year: "2023",
  },
  {
    id: 4,
    name: "Australian Mining Project",
    location: "Western Australia",
    description:
      "Supplied corrosion-resistant rock bolts for underground mining operations in harsh environmental conditions.",
    image: "/overseas2.jpg",
    year: "2022",
  },
]

export function TestimonialsSection() {
  const [chinaIndex, setChinaIndex] = useState(0)
  const [overseasIndex, setOverseasIndex] = useState(0)

  return (
    <section id="testimonials" className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/testimonials" className="inline-block group">
            <h2 className="text-4xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">SUCCESSFUL </span>
              <span className="text-primary">PROJECTS</span>
            </h2>
            <div className="w-20 h-1 bg-primary group-hover:w-24 transition-all" />
          </Link>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">
            <span className="text-foreground">China </span>
            <span className="text-primary">Projects</span>
          </h3>
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-96 md:h-auto">
                    <img
                      src={chinaProjects[chinaIndex].image || "/placeholder.svg"}
                      alt={chinaProjects[chinaIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-primary font-semibold mb-2">{chinaProjects[chinaIndex].year}</div>
                    <h4 className="text-2xl font-bold mb-2">{chinaProjects[chinaIndex].name}</h4>
                    <p className="text-muted-foreground mb-4">{chinaProjects[chinaIndex].location}</p>
                    <p className="text-lg text-pretty">{chinaProjects[chinaIndex].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setChinaIndex((prev) => (prev - 1 + chinaProjects.length) % chinaProjects.length)}
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                {chinaProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setChinaIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === chinaIndex ? "bg-primary w-8" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setChinaIndex((prev) => (prev + 1) % chinaProjects.length)}
                className="rounded-full bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">
            <span className="text-foreground">Overseas </span>
            <span className="text-primary">Projects</span>
          </h3>
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-96 md:h-auto">
                    <img
                      src={overseasProjects[overseasIndex].image || "/placeholder.svg"}
                      alt={overseasProjects[overseasIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-primary font-semibold mb-2">{overseasProjects[overseasIndex].year}</div>
                    <h4 className="text-2xl font-bold mb-2">{overseasProjects[overseasIndex].name}</h4>
                    <p className="text-muted-foreground mb-4">{overseasProjects[overseasIndex].location}</p>
                    <p className="text-lg text-pretty">{overseasProjects[overseasIndex].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setOverseasIndex((prev) => (prev - 1 + overseasProjects.length) % overseasProjects.length)
                }
                className="rounded-full bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                {overseasProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setOverseasIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === overseasIndex ? "bg-primary w-8" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOverseasIndex((prev) => (prev + 1) % overseasProjects.length)}
                className="rounded-full bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

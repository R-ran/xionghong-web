"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

import { getProjects, truncateExcerpt } from "@/lib/wordpress"
import type { Project } from "@/lib/wordpress"

export function TestimonialsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsData = await getProjects()
        console.log('首页获取到的项目数据:', projectsData)
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData.slice(0, 4)) // 只显示前4个项目
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Fallback static data if loading or error
  const fallbackProjects: Project[] = [
    {
      id: "1",
      title: "Beijing Subway Line 16",
      excerpt: "Successfully provided rock bolt solutions for the construction of Beijing Subway Line 16, ensuring structural stability in complex geological conditions.",
      content: "",
      image: "/beijing.jpg",
      imageAlt: "Beijing Subway Line 16 tunnel reinforced with SINOROCK anchor bolts",
      location: "Beijing, China",
      date: "2023",
      slug: "beijing-subway-line-16",
      categories: ["china-projects"]
    },
    {
      id: "2",
      title: "Sichuan Hydropower Station",
      excerpt: "Delivered high-performance anchor systems for the underground powerhouse excavation of a major hydropower project in mountainous terrain.",
      content: "",
      image: "/sichuan.jpg",
      imageAlt: "Sichuan hydropower excavation supported by SINOROCK anchoring systems",
      location: "Sichuan, China",
      date: "2022",
      slug: "sichuan-hydropower-foundation",
      categories: ["china-projects"]
    },
    {
      id: "3",
      title: "Swiss Alpine Tunnel",
      excerpt: "Provided T Thread self-drilling anchor bolts for a major alpine tunnel project, meeting stringent European safety standards.",
      content: "",
      image: "/overseas1.jpg",
      imageAlt: "Swiss alpine tunnel construction featuring SINOROCK self-drilling anchors",
      location: "Switzerland",
      date: "2023",
      slug: "swiss-alpine-tunnel",
      categories: ["overseas-projects"]
    },
    {
      id: "4",
      title: "Australian Mining Project",
      excerpt: "Supplied corrosion-resistant rock bolts for underground mining operations in harsh environmental conditions.",
      content: "",
      image: "/overseas2.jpg",
      imageAlt: "Australian mining operation reinforced with SINOROCK corrosion-resistant bolts",
      location: "Western Australia",
      date: "2022",
      slug: "australian-mining-project",
      categories: ["overseas-projects"]
    }
  ]

  const displayProjects = loading || !projects || projects.length === 0 ? fallbackProjects : projects

  // 调试信息
  console.log('首页项目加载状态:', loading)
  console.log('首页项目数据:', projects)
  console.log('首页显示项目:', displayProjects.map(p => ({ id: p.id, title: p.title })))

  return (
    <section id="testimonials" className="py-2 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/successful-projects" className="inline-block group">
            <h2 className="text-4xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
              <span className="text-foreground">SUCCESSFUL </span>
              <span className="text-primary">PROJECTS</span>
            </h2>
            <div className="w-20 h-1 bg-primary group-hover:w-24 transition-all" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProjects.map((project) => {
            // 构建详情页链接：使用第一个分类，如果没有分类则使用默认值
            const category = project.categories && project.categories.length > 0 
              ? project.categories[0] 
              : 'china-projects'
            const detailUrl = `/successful-projects/${category}/${project.slug}`
            
            return (
              <Link
                key={project.id}
                href={detailUrl}
              >
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all h-full">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.imageAlt || project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { 
                          (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-primary font-semibold mb-2 text-sm">
                          {project.date}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground mb-2 text-sm">{project.location}</p>
                      <p className="text-muted-foreground line-clamp-3">
                        {truncateExcerpt(project.excerpt, 120)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

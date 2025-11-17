"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { X, Download, Mail, Phone, Printer, MapPin, MessageSquare, Send } from "lucide-react"
import { useState, useEffect } from "react"

// 产品列表（保持静态）
const productCategories = [
  { name: "XH self-drilling anchor bolt", slug: "self-drilling-bolt" },
  { name: "XH grouted anchor bolt", slug: "grouted-anchor-bolt" },
  { name: "XH common anchor bolt", slug: "common-anchor-bolt" },
  { name: "Combination hollow anchor bolt", slug: "combination-hollow-bolt" },
  { name: "Expansion-shell hollow anchor bolt", slug: "expansion-shell-bolt" },
  { name: "Fiberglass anchor bolt", slug: "fiberglass-bolt" },
]

// 产品数据类型定义
type Product = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  model: string
  specs: string
  tech_params: string
  application_areas: string
  features: Array<{ feature: string }>
  case_images: Array<any>
  categories: string[]
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("")
  const [product, setProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("introduction")

  // Handle async params
  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug || "")
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (!slug) return // 等待 slug 被设置
    // 直接使用默认产品数据
    setProduct(getDefaultProductData(slug))
  }, [slug])

  // 根据slug获取默认产品数据
  const getDefaultProductData = (productSlug: string): Product => {
    const defaultProducts: Record<string, Product> = {
      "self-drilling-bolt": {
        id: "self-drilling-1",
        title: "XH Self-Drilling Anchor Bolt",
        slug: "self-drilling-bolt",
        content: "<p>The XH Self-Drilling Anchor Bolt is a revolutionary anchoring system that combines drilling and anchoring in one operation. This innovative design significantly reduces installation time and costs while providing superior holding capacity in various ground conditions.</p><p>Key features include hollow steel body for simultaneous drilling and grouting, hardened drill bit for efficient penetration, and reliable thread connection for assured load transfer.</p>",
        excerpt: "High-efficiency self-drilling anchor bolt system for rock and soil reinforcement. Suitable for various geological conditions.",
        featured_image: "/product1.jpg",
        model: "XH-25, XH-32, XH-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Tensile Strength: ≥600MPa",
        tech_params: "Drilling Speed: 0.5-1.0m/min, Grouting Pressure: 1.5-3.0MPa",
        application_areas: "Tunneling, Slope Stabilization, Mining, Foundation Engineering",
        features: [
          { feature: "Combined drilling and anchoring in one operation" },
          { feature: "High tensile strength and corrosion resistance" },
          { feature: "Suitable for various geological conditions" },
          { feature: "Reduced installation time and costs" }
        ],
        case_images: [],
        categories: ["self-drilling"]
      },
      "grouted-anchor-bolt": {
        id: "hollow-grouted-1",
        title: "XH Grouted Anchor Bolt",
        slug: "grouted-anchor-bolt",
        content: "<p>The XH Grouted Anchor Bolt features a grouted design that allows for efficient grouting during installation. This system provides excellent load-bearing capacity and long-term durability in challenging ground conditions.</p>",
        excerpt: "Advanced grouted anchor system with superior corrosion resistance and high load-bearing capacity.",
        featured_image: "/product2.jpg",
        model: "XH-G-25, XH-G-32, XH-G-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Hollow Diameter: 15-25mm",
        tech_params: "Grouting Pressure: 1.5-3.0MPa, Bond Strength: ≥15MPa",
        application_areas: "Underground Works, Slope Protection, Rock Reinforcement",
        features: [
          { feature: "Efficient grouting through hollow body" },
          { feature: "Superior corrosion resistance" },
          { feature: "High load-bearing capacity" },
          { feature: "Long-term durability" }
        ],
        case_images: [],
        categories: ["hollow-grouted"]
      },
      "common-anchor-bolt": {
        id: "common-anchor-1",
        title: "XH Common Anchor Bolt",
        slug: "common-anchor-bolt",
        content: "<p>The XH Common Anchor Bolt features a common design that allows for efficient installation. This system provides excellent load-bearing capacity and long-term durability in challenging ground conditions.</p>",
        excerpt: "Advanced common anchor system with superior corrosion resistance and high load-bearing capacity.",
        featured_image: "/product3.jpg",
        model: "XH-C-25, XH-C-32, XH-C-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Common Diameter: 15-25mm",
        tech_params: "Common Pressure: 1.5-3.0MPa, Bond Strength: ≥15MPa",
        application_areas: "Underground Works, Slope Protection, Rock Reinforcement",
        features: [
          { feature: "Efficient installation through common body" },
          { feature: "Superior corrosion resistance" },
          { feature: "High load-bearing capacity" },
          { feature: "Long-term durability" }
        ],
        case_images: [],
        categories: ["common-anchor"]
      },
      "combination-hollow-bolt": {
        id: "combination-hollow-1",
        title: "Combination Hollow Anchor Bolt",
        slug: "combination-hollow-bolt",
        content: "<p>The Combination Hollow Anchor Bolt features a combination design that allows for efficient installation. This system provides excellent load-bearing capacity and long-term durability in challenging ground conditions.</p>",
        excerpt: "Advanced combination anchor system with superior corrosion resistance and high load-bearing capacity.",
        featured_image: "/product4.jpg",
        model: "XH-C-25, XH-C-32, XH-C-40",
        specs: "Diameter: 25-40mm, Length: 1.0-6.0m, Common Diameter: 15-25mm",
        tech_params: "Common Pressure: 1.5-3.0MPa, Bond Strength: ≥15MPa",
        application_areas: "Underground Works, Slope Protection, Rock Reinforcement",
        features: [
          { feature: "Efficient installation through combination body" },
          { feature: "Superior corrosion resistance" },
          { feature: "High load-bearing capacity" },
          { feature: "Long-term durability" }
        ],
        case_images: [],
        categories: ["combination-hollow"]
      },
      "expansion-shell-bolt": {
        id: "expansion-shell-1",
        title: "Expansion-Shell Hollow Anchor Bolt",
        slug: "expansion-shell-bolt",
        content: "<p>The Expansion-Shell Hollow Anchor Bolt provides immediate support upon installation through mechanical expansion. This system is ideal for applications requiring instant load-bearing capacity.</p>",
        excerpt: "Reliable expansion-shell anchor system for immediate support in tunneling and mining applications.",
        featured_image: "/product5.jpg",
        model: "ES-25, ES-32, ES-40",
        specs: "Shell Diameter: 45-65mm, Bolt Diameter: 25-40mm",
        tech_params: "Expansion Force: 200-500kN, Installation Torque: 150-300Nm",
        application_areas: "Tunneling, Mining, Cavern Construction",
        features: [
          { feature: "Immediate support upon installation" },
          { feature: "Mechanical expansion mechanism" },
          { feature: "High initial load capacity" },
          { feature: "Easy installation" }
        ],
        case_images: [],
        categories: ["expansion-shell"]
      },
      "fiberglass-bolt": {
        id: "fiberglass-1",
        title: "Fiberglass Anchor Bolt",
        slug: "fiberglass-bolt",
        content: "<p>The Fiberglass Anchor Bolt offers excellent corrosion resistance and electrical insulation properties. Made from high-strength composite materials, it's ideal for permanent applications and special environments.</p>",
        excerpt: "Non-metallic fiberglass anchor system with excellent corrosion resistance for permanent applications.",
        featured_image: "/product6.jpg",
        model: "FG-22, FG-25, FG-32",
        specs: "Diameter: 22-32mm, Length: 1.0-6.0m, Tensile Strength: ≥800MPa",
        tech_params: "Elastic Modulus: 40-50GPa, Density: 1.9-2.1g/cm³",
        application_areas: "Permanent Structures, Marine Environment, Chemical Plants",
        features: [
          { feature: "Excellent corrosion resistance" },
          { feature: "Electrical insulation properties" },
          { feature: "Lightweight and high strength" },
          { feature: "Permanent application suitable" }
        ],
        case_images: [],
        categories: ["fiberglass"]
      }
    }

    return defaultProducts[productSlug] || {
      id: "default",
      title: productSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      slug: productSlug,
      content: "<p>Product information is being updated. Please contact us for more details.</p>",
      excerpt: "High-quality anchoring solution designed for demanding geotechnical applications.",
      featured_image: "/placeholder.svg",
      model: "",
      specs: "",
      tech_params: "",
      application_areas: "",
      features: [],
      case_images: [],
      categories: []
    }
  }

  // 获取产品数据或默认值（保持你原来的fallback逻辑）
  const productTitle = product?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const productImage = product?.featured_image || "/product1.jpg"
  const productImageAlt = product?.title || "SINOROCK anchor bolt system"
  const productDescription = product?.excerpt || "High-quality anchoring solution designed for demanding geotechnical applications."
  const productContent = product?.content || "Product introduction and detailed description."
  
  // ACF 字段映射（根据你的接口定义）
  const productModel = product?.model || ""
  const productSpecs = product?.specs || ""
  const techParams = product?.tech_params || ""
  const applicationAreas = product?.application_areas || ""
  const productFeatures = product?.features || []

  // Case studies images from ACF gallery field
  const caseStudiesImages = product?.case_images || []

  // 将特性数组转换为 conditions 格式
  const conditions = productFeatures.length > 0 
    ? productFeatures.map((f: any) => f.feature)
    : ["Tunneling", "Mining", "Slope Stabilization"]

  // 处理表单提交
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Message sent successfully!")
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Top Section - Title and Breadcrumbs */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-primary">PRODUCTS</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                world&apos;s leading self drilling anchor bolt manufacturer.
              </p>
            </div>
            <div className="text-muted-foreground text-sm">
              Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt;{" "}
              <Link href="/products" className="hover:text-primary">Products</Link> &gt; {productTitle}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white p-6 shadow-sm mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">PRODUCT LIST</h2>
                <ul className="space-y-2">
                  {productCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/products/${category.slug}`}
                        className={`flex items-center gap-2 py-2 px-3 text-sm transition-colors ${
                          slug === category.slug
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-gray-700 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${slug === category.slug ? "bg-primary" : "bg-gray-300"}`} />
                        <span>{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white mb-6" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>

              <div className="bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">CONTACT US</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Phone</div>
                      <div className="text-sm text-gray-700">+00-370-00207220</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Printer className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Fax</div>
                      <div className="text-sm text-gray-700">+86-379-65267220</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">E-mail</div>
                      <div className="text-sm text-gray-700">sinorock@sinorock.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Address</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        No.1703, Building 3, No. 1 Ganghua Road, Luolong District, Luoyang, China (Henan Pilot Free Trade Zone), Henan Province, P.R. China
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Product Display Section */}
              <div className="bg-white p-6 shadow-sm mb-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="bg-muted rounded-lg overflow-hidden h-96 md:h-[500px] relative">
                    <img
                      src={productImage}
                      alt={productImageAlt}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "100%" }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        if (!target.src.includes("placeholder")) {
                          target.src = "/placeholder.svg?height=500&width=500"
                        }
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{productTitle}</h2>
                      <p className="text-muted-foreground leading-relaxed">{productDescription}</p>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setShowModal(true)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Messages
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setShowModal(true)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information Section */}
              <div className="bg-white shadow-sm">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab("introduction")}
                      className={`px-6 py-4 font-semibold transition-colors ${
                        activeTab === "introduction"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Introduction
                    </button>
                    <button
                      onClick={() => setActiveTab("parameters")}
                      className={`px-6 py-4 font-semibold transition-colors ${
                        activeTab === "parameters"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Parameters
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "introduction" && (
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{productContent}</p>
                      
                      {applicationAreas && (
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Application Areas:</h3>
                          <p className="whitespace-pre-line text-muted-foreground">{applicationAreas}</p>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Application Conditions:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {conditions.map((condition: string, index: number) => (
                            <li key={index}>• {condition}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4">Cases</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {caseStudiesImages.length > 0 ? (
                            caseStudiesImages.map((image: any, index: number) => (
                              <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                                <img
                                  src={image.url || image}
                                  alt={`Case study ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg?height=200&width=300"
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            // Fallback to placeholder images if no WordPress images
                            [1, 2, 3, 4, 5, 6].map((i) => (
                              <div key={i} className="aspect-video bg-muted rounded-lg overflow-hidden">
                                <img
                                  src={`/placeholder.svg?height=200&width=300&query=case${i}`}
                                  alt={`Illustrative case study ${i}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "parameters" && (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-700 text-white">
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Parameter</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productSpecs && (
                              <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Specifications</td>
                                <td className="border border-gray-300 px-4 py-2">{productSpecs}</td>
                              </tr>
                            )}
                            {techParams && (
                              <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Technical Parameters</td>
                                <td className="border border-gray-300 px-4 py-2">{techParams}</td>
                              </tr>
                            )}
                            {productModel && (
                              <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Model</td>
                                <td className="border border-gray-300 px-4 py-2">{productModel}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <Input id="company" placeholder="Your company name" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="+86 123 4567 8900" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={6} required />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
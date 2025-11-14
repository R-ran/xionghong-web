"use client"

import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, Printer, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import { getProducts } from "@/lib/wordpress"
import type { Product } from "@/lib/wordpress"

// 产品种类数据（保持原有静态分类导航）
// 注意：使用查询参数格式来过滤产品，而不是跳转到单个产品详情页
const productCategories = [
  {
    id: "self-drilling",
    name: "XH self-drilling anchor bolt",
    href: "/products?category=self-drilling",
  },
  {
    id: "hollow-grouted",
    name: "XH hollow grouted anchor bolt",
    href: "/products?category=hollow-grouted",
  },
  {
    id: "expansion-shell",
    name: "Expansion-shell hollow anchor bolt",
    href: "/products?category=expansion-shell",
  },
  {
    id: "fiberglass",
    name: "Fiberglass anchor bolt",
    href: "/products?category=fiberglass",
  },
  {
    id: "accessories",
    name: "Accessories",
    href: "/products?category=accessories",
  },
]

type ProductItem = {
  id: string | number
  name: string
  description: string
  image: string
  imageAlt: string
  slug: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 默认产品数据（当 WordPress 无数据时使用）
  const getDefaultProducts = (): ProductItem[] => [
    {
      id: "self-drilling-1",
      name: "XH Self-Drilling Anchor Bolt",
      description: "High-efficiency self-drilling anchor bolt system for rock and soil reinforcement. Suitable for various geological conditions.",
      image: "/placeholder.svg",
      imageAlt: "XH Self-Drilling Anchor Bolt",
      slug: "self-drilling-bolt",
    },
    {
      id: "hollow-grouted-1",
      name: "XH Hollow Grouted Anchor Bolt",
      description: "Advanced hollow grouted anchor system with superior corrosion resistance and high load-bearing capacity.",
      image: "/placeholder.svg",
      imageAlt: "XH Hollow Grouted Anchor Bolt",
      slug: "hollow-grouted-bolt",
    },
    {
      id: "expansion-shell-1",
      name: "Expansion-Shell Hollow Anchor Bolt",
      description: "Reliable expansion-shell anchor system for immediate support in tunneling and mining applications.",
      image: "/placeholder.svg",
      imageAlt: "Expansion-Shell Hollow Anchor Bolt",
      slug: "expansion-shell-bolt",
    },
    {
      id: "fiberglass-1",
      name: "Fiberglass Anchor Bolt",
      description: "Non-metallic fiberglass anchor system with excellent corrosion resistance for permanent applications.",
      image: "/placeholder.svg",
      imageAlt: "Fiberglass Anchor Bolt",
      slug: "fiberglass-bolt",
    },
    {
      id: "accessories-1",
      name: "Anchor Bolt Accessories",
      description: "Complete range of accessories including plates, nuts, couplers, and drilling tools for anchor bolt systems.",
      image: "/placeholder.svg",
      imageAlt: "Anchor Bolt Accessories",
      slug: "accessories",
    },
    {
      id: "self-drilling-2",
      name: "Heavy-Duty Self-Drilling Bolt",
      description: "Extra-heavy-duty self-drilling anchor bolt for extreme ground conditions and high-load applications.",
      image: "/placeholder.svg",
      imageAlt: "Heavy-Duty Self-Drilling Bolt",
      slug: "heavy-duty-self-drilling",
    },
  ]

  const [products, setProducts] = useState<ProductItem[]>(() => getDefaultProducts())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 从 WordPress 获取产品数据
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        // 注意：不传递 category 参数给 API，因为 WordPress REST API 
        // 可能不支持自定义文章类型的分类过滤，会在客户端进行过滤
        const { data: remoteProducts } = await getProducts({ 
          page: 1, 
          perPage: 100  // 增加每页数量以确保获取所有产品
        })

        console.log('✅ 成功获取产品数据:', remoteProducts.length, '个产品')
        console.log('📋 当前分类参数:', category || '无（显示所有产品）')
        
        // 如果有远程数据，使用远程数据
        if (remoteProducts && remoteProducts.length > 0) {
          // 收集所有产品的分类信息用于调试
          const allCategories = new Set<string>()
          remoteProducts.forEach((p: Product) => {
            p.categories.forEach(cat => allCategories.add(cat))
          })
          console.log('📂 WordPress 中所有产品分类:', Array.from(allCategories))
          console.log('📦 产品分类详情:', remoteProducts.map((p: Product) => ({ 
            title: p.title, 
            categories: p.categories 
          })))

          // 在客户端进行过滤
          let filteredProducts = remoteProducts
          
          if (category) {
            const categoryLower = category.toLowerCase().trim()
            console.log(`🔍 过滤分类 "${category}"...`)
            
            // 尝试多种匹配方式
            filteredProducts = remoteProducts.filter((product: Product) => {
              // 检查产品分类数组中是否包含当前分类
              return product.categories.some((cat: string) => {
                const catLower = cat.toLowerCase().trim()
                
                // 1. 精确匹配
                if (catLower === categoryLower) {
                  return true
                }
                
                // 2. 包含匹配（category 包含在产品分类中，或产品分类包含 category）
                if (catLower.includes(categoryLower) || categoryLower.includes(catLower)) {
                  return true
                }
                
                // 3. 部分匹配（例如 "self-drilling" 匹配 "self-drilling-bolt"）
                const categoryParts = categoryLower.split('-')
                const catParts = catLower.split('-')
                if (categoryParts.some(part => catParts.includes(part)) || 
                    catParts.some(part => categoryParts.includes(part))) {
                  return true
                }
                
                return false
              })
            })
            
            console.log(`✅ 分类 "${category}" 过滤完成: 找到 ${filteredProducts.length} 个产品`)
            
            if (filteredProducts.length === 0) {
              console.warn(`⚠️ 没有找到分类 "${category}" 的产品`)
              console.log(`💡 提示: 请检查 WordPress 中的产品分类 slug 是否与 URL 参数匹配`)
              console.log(`💡 当前可用分类:`, Array.from(allCategories))
            }
          }

          // 如果分类过滤后没有产品，显示所有产品（但记录警告）
          if (filteredProducts.length === 0 && category) {
            console.warn(`没有找到分类 "${category}" 的产品，显示所有产品`)
            // 不设置错误，而是显示所有产品
            filteredProducts = remoteProducts
          }

          const transformed = filteredProducts.map((product: Product) => ({
            id: product.id,
            name: product.title,
            description: product.excerpt.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
            image: product.featured_image || "/placeholder.svg",
            imageAlt: product.title,
            slug: product.slug,
          }))
          
          setProducts(transformed)
        } else {
          // 如果没有远程数据，使用默认数据
          console.log('没有远程产品数据，使用默认数据')
          setProducts(getDefaultProducts())
        }
      } catch (err) {
        console.error('Failed to fetch from WordPress, using fallback data:', err)
        setError(`Failed to load products: ${err instanceof Error ? err.message : 'Unknown error'}`)
        // 出错时使用默认产品数据
        setProducts(getDefaultProducts())
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 无产品状态
  if (!products.length) {
    return (
      <div className="min-h-screen bg-background">
        <TopHeader />
        <StickyNav />
        <main className="pt-12">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              {category 
                ? `No products found in category "${productCategories.find(c => c.id === category)?.name || category}"`
                : 'No products available'}
            </p>
            {category && (
              <Link href="/products">
                <Button variant="outline">
                  View All Products
                </Button>
              </Link>
            )}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />
      <StickyNav />

      <main className="pt-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-4">
          <div className="text-muted-foreground text-sm">
            Your Position : <Link href="/" className="hover:text-primary">Home</Link> &gt; Products
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Product Categories */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">PRODUCT LIST</h2>
                <ul className="space-y-2">
                  {/* 添加"全部产品"选项 */}
                  <li>
                    <Link
                      href="/products"
                      className={`flex items-center gap-3 py-2 px-3 transition-colors group ${
                        !category
                          ? 'text-primary bg-primary/10 font-medium border-l-4 border-primary'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className={`text-sm transition-all ${
                        !category ? 'font-medium' : 'group-hover:font-medium'
                      }`}>
                        All Products
                      </span>
                    </Link>
                  </li>
                  {productCategories.map((categoryItem) => {
                    // 检查当前分类是否被选中
                    const isActive = category === categoryItem.id
                    return (
                      <li key={categoryItem.id}>
                        <Link
                          href={categoryItem.href}
                          className={`flex items-center gap-3 py-2 px-3 transition-colors group ${
                            isActive
                              ? 'text-primary bg-primary/10 font-medium border-l-4 border-primary'
                              : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span className={`text-sm transition-all ${
                            isActive ? 'font-medium' : 'group-hover:font-medium'
                          }`}>
                            {categoryItem.name}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Contact Us Section */}
              <div className="bg-white p-6 shadow-sm mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">CONTACT US</h2>
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Phone</div>
                      <div className="text-sm text-gray-700">+86-510-85161569</div>
                    </div>
                  </div>

                  {/* Fax */}
                  <div className="flex items-start gap-4">
                    <Printer className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Fax</div>
                      <div className="text-sm text-gray-700">86-379-64386676</div>
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">E-mail</div>
                      <div className="text-sm text-gray-700">sinorock@sinorockco.com</div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800 mb-1">Address</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        Ronghu Village, Yuqi Supporting Area, Huishan Economic Development Zone, Wuxi City, Jiangsu Province, China
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Main Section - Product Cards */}
            <div className="flex-1">
              {/* Products Title Section */}
              <div className="mb-6">
                {category ? (
                  <>
                    {/* Category-specific title */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      {productCategories.find(cat => cat.id === category)?.name || 'Products'}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      {productCategories.find(cat => cat.id === category)?.description || 'Products in this category'}
                    </p>
                  </>
                ) : (
                  <>
                    {/* General Products title */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      <span className="text-foreground">PRO</span>
                      <span className="text-primary">DUCTS</span>
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      world's leading self drilling anchor bolt manufacturer.
                    </p>
                  </>
                )}
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all bg-white h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Image Section */}
                        <div className="relative w-full h-48 overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.imageAlt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        {/* Text Section */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 overflow-hidden text-ellipsis min-h-[2.5rem]">
                            {product.description}
                          </p>
                          <Button
                            variant="outline"
                            className="w-full justify-between group-hover:border-primary group-hover:text-primary transition-colors mt-auto"
                          >
                            MORE
                            <ChevronRight className="w-4 h-4 text-primary" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
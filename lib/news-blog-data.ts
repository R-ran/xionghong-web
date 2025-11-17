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
    title: "Wuxi Oriental Xinhong Shines at Mining Indonesia 2024: Superior Quality Wins Global Mining Trust",
    excerpt: "We are excited to announce the launch of our latest rock bolt technology, featuring enhanced corrosion resistance and improved load capacity.",
    publish_date: "2024-11-14",
    featured_image: "/news1.jpg",
    content: `<h2>Abstract: </h2>
    <p>From September 11–14, 2024, Mining Indonesia convened at Jakarta International Expo. Wuxi Oriental Xinhong Environmental Protection Technology Co., Ltd. (Oriental Xinhong), a premier Chinese mine support solutions provider, showcased its high-performance anchoring portfolio including self-drilling anchor bolts, hollow anchor rockbolts, and expansion shell anchor bolts. With robust quality, competitive pricing, and technical expertise, the company secured major deals and unanimous praise from international clients, reinforcing Chinese mine support equipment's growing influence in Southeast Asia.</p>
    <h3>1.Mining Indonesia 2024: Asia's Mining Hub</h3>
    <p>Mining Indonesia 2024, Asia's premier mining equipment exhibition, ran September 11–14 at Jakarta International Expo, alongside four concurrent trade shows. The event drew 1,200+ exhibitors from 40+ countries and 30,000+ professionals. With Southeast Asia's mining sector increasingly focused on deep excavation safety, the demand for advanced support systems was paramount. Indonesia's position as a top coal, nickel, and copper producer created ideal conditions for Oriental Xinhong to demonstrate its solutions.</p>
    <h4>2.Oriental Xinhong: China's Mine Support Leader</h4>
    <p>Based in Wuxi, Jiangsu, Oriental Xinhong is a high-tech enterprise specializing in R&D, production, and sales of mine/tunnel/slope support systems. With ISO 9001, ISO 14001, and EU CE certifications, the company exports to 50+ countries. Its modern production base features automated lines, CNC centers, and CNAS-accredited labs, producing 10 million+ meters annually of self-drilling anchor bolts, hollow anchor rockbolts, expansion shell anchor bolts, resin bolts, and anchor cables</p>
    <h5>3.Star Products Steal the Show</h5>
    <p>At Hall B2-128, three flagship products captivated visitors:</p>
    <h6>3.1Self-Drilling Anchor Bolt: Efficiency Revolution</h6>
    <p>The self-drilling anchor bolt integrates drilling, grouting, and anchoring for fractured rock and loose soils. Its hollow rod drives the drill bit; after drilling, grout is injected directly through the rod without withdrawal. A Sumatra coal mine manager noted: "This self-drilling anchor bolt saves 50% of construction time compared to separate drilling and bolting—it completely solves our efficiency challenges in fractured zones."
Made from 800MPa+ alloy steel with 95% torque efficiency, the bolts feature carbide-button bits lasting 200+ meters in hard rock. Specifications include R25, R32, R38, R51, T76, and T103 models.
</p>
    <h7>3.2Hollow Anchor Rockbolt: Deep Mine Guardian</h7>
    <p>The hollow anchor rockbolt enables full-length grouting, solving incomplete grouting issues of solid bolts. Its continuous waveform thread enhances grout bond and shear resistance. "Our hollow anchor rockbolt supports pressure grouting at 0.5–2.0 MPa, boosting anchorage capacity by 30%+," explained the overseas sales director.</p>
    <p>At an Indonesian copper mine (800m depth), Φ25mm hollow rockbolts with early-strength grout achieved 180kN anchorage force, controlling deformation effectively. The mine's engineer visited the booth to endorse the product and express expansion plans.</p>
    <h8>3.3Expansion Shell Anchor Bolt: Rapid Support Solution</h8>
    <p>The expansion shell anchor bolt provides immediate support via mechanical expansion. Installation takes 2–3 minutes, achieving 80%+ design load instantly. A Filipino dealer remarked: "This expansion shell anchor bolt is ideal for emergency roof-fall support. My clients can install it quickly during critical situations."</p>
    <p>Available in Φ20–32mm with 200kN capacity, the bolts feature heat-treated expansion shells optimized for medium-hard rock. Specialized installation tools further enhance efficiency.</p>
    <h9>4.Quality: The Core Competitive Edge</h9>
    <p>Quality is Oriental Xinhong's non-negotiable priority. Self-drilling anchor bolts undergo 10+ inspection stages, including 100% ultrasonic testing of carbide welds. Hollow rockbolts use cold-rolled threads to prevent stress concentration, while continuous quenching-and-tempering ensures uniform hardness. Surface treatments (hot-dip galvanizing, epoxy coating) exceed 1,000-hour salt spray resistance. The company presented CE certificates, ISO 9001 credentials, and third-party test reports at the booth.</p>
    <h10>5.Price: The Value Proposition</h10>
    <p>As a direct manufacturer, Oriental Xinhong eliminates intermediaries, pricing 30–50% below comparable Western brands without compromising performance. At the show, flexible strategies included trial-order discounts, volume-based tiered pricing, and free technical training for strategic partners.</p>
    <p>A Malaysian mining executive stated: "Their self-drilling anchor bolt is 40% cheaper than European brands, yet meets all design specs. This cost control is vital for our projects." Cost advantages stem from bulk material procurement, lean manufacturing, and automation achieving 99% pass rates—not quality cuts.</p>
    <h11>6.Client Accolades: Global Testimonials</h11>
    <p>Indonesian Coal Mine (Kalimantan): Ordered 10,000m R32 self-drilling bolts and 5,000 hollow rockbolt sets. "The 45-day delivery is half that of European suppliers. Their solution for our swelling mudstone conditions is perfect," said the chief engineer.</p>
    <p>Thai Distributor: Signed a regional agency agreement. "Clients placed orders immediately after seeing the expansion shell anchor bolt demo. Oriental Xinhong's technical support gives us confidence."</p>
    <p>Australian Consultant: "Their hollow anchor rockbolt anti-corrosion treatment surpasses some Western brands. I'll recommend them despite Chinese origin."</p>
    <h12>7.Strategic Partnerships</12>
    <p>Oriental Xinhong participated in technical forums, with the chief engineer presenting on intelligent Chinese anchor bolt applications in deep mines. The company proposed a hybrid support system for Indonesia's fault-fractured zones: self-drilling anchor bolts for rapid initial support, followed by hollow anchor rockbolts for permanent reinforcement. This earned Indonesian Mining Association endorsement.</p>
    <p>A collaboration was also launched with a local contractor for a Banten nickel mine pilot project using 5,000 expansion shell anchor bolts, marking a shift from product sales to integrated "product + service + solution" offerings.</p>
    <h13>8.Exhibition Outcomes</h13>
    <p>Market Penetration: 320 qualified leads, 85 A-level prospects; USD 5.2M in signed contracts, projected follow-up orders >USD 10M</p>
    <p>Awards: "Best Innovative Product" and "Most Popular Exhibitor" accolades</p>
    <p>Network: Partnerships with 3 Indonesian distributors and research links with Bandung Institute of Technology</p>
    <h14>9.Future Roadmap</h14>
    <p>Oriental Xinhong's three-year plan focuses on:</p>
<p>Localization: 80μm+ galvanized coatings and stainless steel variants for corrosive environments by 2026</p>
<p>Service Centers: Jakarta and Surabaya facilities with local teams and 15-day delivery capability</p>
<p>R&D: Joint labs for soft-rock grouting solutions and biodegradable grout systems by 2026</p>
<p>Global Presence: Expansion to Chile EXPOMIN, Australia Austmine, and South Africa Electra Mining</p>
<p>Sustainability: Recyclable drill rods and eco-friendly hollow anchor rockbolt systems</p>
<h15>10.Conclusion</h15>
<p>Mining Indonesia 2024 validated Oriental Xinhong's strategy: quality and competitive pricing drive global success. From self-drilling anchor bolts to hollow anchor rockbolts and expansion shell anchor bolts, each product reflects deep mining safety expertise. With USD 5M+ in signed deals and unanimous client praise, the company is poised to expand from Indonesia across Southeast Asia and beyond. Chinese manufacturing's reputation for excellence now firmly includes Oriental Xinhong's mine support solutions.</p>
<p></p>
<p>About Wuxi Oriental Xinhong anchor bolt: A leading Chinese provider of mine support systems, specializing in self-drilling anchor bolts, hollow anchor rockbolts, and expansion shell anchor bolts. ISO/CE certified, serving 50+ countries with 10M+ meters annual capacity.</p>
<p>Keywords:#MiningIndonesia2024#SelfDrillingAnchorBolt#HollowAnchorRockbolt #ExpansionShellAnchorBolt #ChineseManufacturing</p>`,
    categories: ["News"],
    type: "news",
    author_name: "XinHong Team"
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


import { Facebook, Twitter, Youtube, Linkedin, Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TopHeader() {
  return (
    <div className="bg-background border-b">
      {/* Top utility bar */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Email:</span>
              <a href="mailto:sinorock@sinorockco.com" className="hover:text-primary transition-colors">
                sinorock@sinorockco.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
              <select className="bg-transparent border-none text-muted-foreground hover:text-primary cursor-pointer">
                <option>English</option>
                <option>中文</option>
              </select>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logo and tagline section */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">SINOROCK</h1>
              <p className="text-xs text-muted-foreground">Engineering Excellence</p>
            </div>
          </div>

          {/* Tagline with handwriting font */}
          <div className="text-center">
            <p className="text-3xl text-primary" style={{ fontFamily: "var(--font-handwriting)" }}>
              Safer space
            </p>
            <p className="text-3xl text-foreground" style={{ fontFamily: "var(--font-handwriting)" }}>
              Better life
            </p>
          </div>

          {/* Social media icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

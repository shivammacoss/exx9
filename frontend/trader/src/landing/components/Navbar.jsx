'use client'

import { useState, useEffect } from "react"
import Link from 'next/link'
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/landing/components/ui/button"
import { LoginDialog, OpenAccountDialog } from "@/landing/components/auth-dialogs"

const navLinks = [
  { href: "/markets/forex", label: "Trading" },
  { href: "/tools/trading-platform", label: "Features" },
  { href: "/accounts/types", label: "Pricing" },
  { href: "/partnership", label: "Community" },
  { href: "/about", label: "About Us" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/70 backdrop-blur-md border-b border-emerald-100/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/images/exx9_logo_light.png"
              alt="exx9"
              width={140}
              height={36}
              className="h-8 sm:h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <LoginDialog
              trigger={
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:text-primary">
                  Log In
                </Button>
              }
            />
            <OpenAccountDialog
              trigger={
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 rounded-full shadow-md shadow-emerald-500/30">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              }
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-white">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium py-2 pl-3 hover:text-primary transition-colors text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <LoginDialog
                  trigger={
                    <Button variant="outline" className="w-full">Log In</Button>
                  }
                />
                <OpenAccountDialog
                  trigger={
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Get Started Free
                    </Button>
                  }
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

'use client'

import { Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function InfoBar() {
  return (
    <div className="bg-gradient-to-r from-[#4a9ebd] to-[#3d8ba8] text-white py-2.5 text-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Left side - Icons and contact */}
          <div className="flex items-center space-x-5">
            {/* Instagram */}
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            
            {/* WhatsApp */}
            <Link
              href={`https://wa.me/84772751430`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-all hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </Link>
            
            <div className="h-4 w-px bg-white/30" />
            
            {/* Phone */}
            <a
              href="tel:+84772751430"
              className="hover:opacity-80 transition-opacity font-medium"
            >
              +84 772751430
            </a>
            
            <div className="h-4 w-px bg-white/30 hidden sm:block" />
            
            {/* Email */}
            <a
              href="mailto:wherethelocalsgovietnam@gmail.com"
              className="hover:opacity-80 transition-opacity font-medium hidden sm:inline"
            >
              wherethelocalsgovietnam@gmail.com
            </a>
          </div>

          {/* Right side - Wishlist and My Account */}
          <div className="flex items-center space-x-5">
            <Link
              href="#"
              className="hover:opacity-80 transition-opacity font-medium hover:underline"
            >
              Wishlist
            </Link>
            <div className="h-4 w-px bg-white/30" />
            <Link
              href="#"
              className="hover:opacity-80 transition-opacity font-medium hover:underline"
            >
              My Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

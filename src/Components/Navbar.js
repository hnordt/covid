import React from "react"
import { Logo } from "Components/Logo"

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center h-16">
          <Logo className="w-7 h-7" />
        </div>
      </div>
    </nav>
  )
}

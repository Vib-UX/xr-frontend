'use client'

import GoogleSignIn from "@/components/GoogleSiginModal"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function NavbarComponent() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const [isSignInOpen, setIsSignInOpen] = useState(false)


  console.log(session, "session");

  return (
    <nav className="bg-[#111] text-white p-4">
      <GoogleSignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <span className="text-xl font-bold">BASE FIT</span>
        </div>
        <div className="hidden md:flex space-x-6">
          {[
            { name: "Market Prediction", href: "/" },
            { name: "Move To Earn", href: "/move-to-earn" },
            { name: "Membership", href: "/membership" },
            { name: "Fan Battles", href: "/fan-battles" },
            { name: "Profile", href: "/profile" },
          ].map((item) => (
            <Link key={item.name} href={item.href} className="flex flex-col items-center group">
              <span className={`text-xs ${pathname === item.href ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'}`}>{item.name}</span>
              {pathname === item.href && <div className="w-full h-0.5 bg-blue-400 mt-1"></div>}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => {
            setIsSignInOpen(true)
          }} className="bg-blue-600 hover:bg-blue-700 text-white">
            Connect Wallet
          </Button>
          <Wallet className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </nav>
  )
}
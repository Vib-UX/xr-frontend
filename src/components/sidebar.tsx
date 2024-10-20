"use client"

import { useState } from "react"
import Link from "next/link"
import { useMediaQuery } from "react-responsive"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

  const SidebarContent = () => (
    <ScrollArea className="h-full w-full rounded-md border border-blue-500">
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-500" />
          <span className="text-xl font-bold">Progression XR</span>
        </div>
        <nav className="flex flex-col space-y-2">
          {["Health Gains", "Fitness Clubs", "Betting Hub", "Fan Token Showdowns", "VR Workouts", "Coaches"].map(
            (item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                {item}
              </Link>
            )
          )}
        </nav>
        <Button className="w-full" variant="outline">
          Profile
        </Button>
        <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          Notifications
        </Link>
      </div>
    </ScrollArea>
  )

  return (
    <>
      {isDesktop ? (
        <div className="hidden h-screen w-64 flex-col md:flex">
          <SidebarContent />
        </div>
      ) : (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
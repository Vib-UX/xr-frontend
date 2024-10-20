'use client'

import GoogleSignIn from "@/components/GoogleSiginModal"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import SignupButton from "./SignupButton"

export function NavbarComponent() {
  const pathname = usePathname()
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  return (
    <nav className="bg-[#111] text-white p-4">
      <GoogleSignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg
            width={43}
            height={43}
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.0168 42.2128C32.6735 42.2128 42.1232 32.7632 42.1232 21.1064C42.1232 9.44966 32.6735 0 21.0168 0C10.0203 0 0.987982 8.40944 0 19.1481H22.5853C22.5176 17.6242 22.3387 16.1486 21.97 15.1039C21.0847 12.5956 20.6175 15.9032 20.4945 17.8705H19.019C19.1232 16.912 19.1897 16.1843 19.2452 15.5776C19.4351 13.4993 19.4952 12.8425 20.4945 9.20201C21.5274 5.43954 22.9537 7.51136 23.5377 9.01758C26.1936 17.2803 24.8902 27.707 23.9066 31.8875C22.6524 36.9041 21.2323 34.9307 20.4945 33.0863C19.7568 31.242 19.1113 26.6311 19.019 24.3257H20.679L20.8634 26.8156C21.4536 29.619 22.1544 26.6311 22.4311 24.7868C22.4768 24.3228 22.5223 23.7318 22.557 23.0647H2.11905e-06C0.987995 33.8034 10.0203 42.2128 21.0168 42.2128ZM23.0765 6.52775H27.1341C27.7796 7.05032 29.3842 8.55654 29.5317 10.7698L25.0131 10.862C24.9209 9.69389 24.4044 7.19172 23.0765 6.52775ZM29.7162 11.9686L25.3819 12.0608C27.5952 27.9222 24.7672 34.3467 23.0765 35.5763H27.0419C31.7634 30.1908 30.915 17.5631 29.7162 11.9686ZM32.2063 9.8476H29.9008C30.2697 10.5853 30.5463 12.6756 30.6386 13.6285H34.1428C33.9215 11.8579 32.7596 10.3702 32.2063 9.8476ZM34.1428 14.8273H30.9152C32.2985 23.0347 30.9459 29.2747 29.9008 32.072L32.2985 32.1642C35.3232 27.3689 34.7883 18.6083 34.1428 14.8273ZM34.8806 13.9052H36.7249C37.0016 14.1203 37.6286 14.8273 37.9237 15.934L35.2494 15.8417C35.2802 15.5343 35.2494 14.7167 34.8806 13.9052ZM37.9237 17.0406L35.2494 16.8561C35.9872 21.1903 35.4339 26.1394 34.8806 28.2911H36.5405C38.3848 25.9303 38.2311 19.8071 37.9237 17.0406ZM38.6615 18.8849H40.0447C40.2599 19.8071 40.5243 21.965 39.8603 23.2191H38.6615C38.723 22.174 38.809 19.844 38.6615 18.8849Z"
              fill="white"
            />
          </svg>
          <span className="text-xl font-bold">BASE FIT</span>
        </div>
        <div className="hidden md:flex space-x-6">
          {[
            // { name: "Market Prediction", href: "/" },
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
        <div className=" items-center  gap-3">
          <SignupButton />
        </div>
      </div>
    </nav>
  )
}
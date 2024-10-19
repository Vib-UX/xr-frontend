'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export function PowerSquatCardComponent({ title, description, image }: {
  title: string,
  description: string,
  image: string
}) {
  return (
    <Card className="w-full  overflow-hidden rounded-3xl border-4  border-blue-100">
      <div className="flex p-4">
        <div className="flex-1 pr-4 w-full">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Promo
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="mb-6 text-normal text-gray-500">
            {description}
          </p>
          <Button className="w-full max-w-xs h-10 text-blue-600 bg-blue-100 hover:bg-blue-200 border-2 border-blue-200 rounded-xl text-lg font-normal transition-all duration-200 ease-in-out">
            Bet Now
          </Button>
        </div>
        <div className="flex-1 items-center">
          <div className="relative w-full h-full mt-6 max-h-[200px] my-auto rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt="Athlete performing a squat"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
export function PowerSquatCardComponentHorizontal({ title, description, image }: {
  title: string,
  description: string,
  image: string
}) {
  return (
    <Card className="w-full  overflow-hidden rounded-3xl border-4  border-blue-100">
      <div className=" p-4">
        <div className="flex-1 pr-4 w-full">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Upcoming Challenge
          </div>
          <h2 className="mb-2 text-lg text-center font-bold text-gray-800">
            {title}
          </h2>
          <p className="mb-6 text-center text-sm text-gray-500">
            {description}
          </p>
        </div>
        <div className="relative w-full mt-6 h-[200px] my-auto rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt="Athlete performing a squat"
            layout="fill"
            priority
          />
        </div>
      </div>
    </Card>
  )
}
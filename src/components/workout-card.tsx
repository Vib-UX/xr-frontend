'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function WorkoutCardComponent({
  id,
  name,
  title,
  image,
  description,
}: {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
}) {
  return (
    <Card className="w-full max-w-sm relative  rounded-3xl border border-gray-200">
      <div className="relative h-48 overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt="Man exercising with dumbbells"
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 flex flex-col">
        <div className="grow h-full flex-1">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 relative overflow-hidden bg-gray-200 rounded-full mr-2">
              <Image src={image} layout="fill" alt="HH" />
            </div>
            <span className="font-semibold text-gray-800">{name}</span>
          </div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {description}
          </p>
          <p className="text-sm text-gray-600 mb-4">35 mins</p>
          <div className="flex space-x-2 mb-4">
            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
              Musclebuilding
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
              Dumbbells
            </Badge>
          </div>
        </div>
        <Button className="w-full bg-blue-600 h-12 absolute left-1/2 -translate-x-1/2 bottom-0 hover:bg-blue-700 text-white">
          Start Your Workout
        </Button>
      </CardContent>
    </Card>
  )
}
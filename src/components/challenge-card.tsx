'use client'

import { Card, CardContent } from "@/components/ui/card"
import JoinFitnessChallenge from "./JoinFitnessChallenge"

export function ChallengeCardComponent() {
  return (
    <Card className="w-full  overflow-hidden rounded-3xl border border-blue-100">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img
            src="/images/davidgoggins.png"
            alt="David Goggins"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">David Goggins</h2>
            <p className="text-gray-500">Fitness coach</p>
          </div>
        </div>
        <p className="text-lg text-gray-800 mb-6 text-center">
          Team Goggins ready for Challenge? Time to show Team Lazar who is the real boss.
        </p>
        <Card className="rounded-2xl border border-blue-100 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <img
                src="/images/lazar.png"
                alt="Lazar Angelo"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Lazar Angelo</h3>
                <p className="text-gray-500 text-sm">Fitness coach</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">
              <span className="font-semibold">Squat Marathon:</span> Lets see who can Do the most squats within 5 minutes
            </p>
            <img
              src="/images/people.png"
              alt="People doing squats"
              className="w-full rounded-xl"
            />
          </CardContent>
        </Card>
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-semibold text-gray-800">Want to compete in this Challenge ?</p>
          <JoinFitnessChallenge text="Register Now" />
        </div>
      </CardContent>
    </Card>
  )
}
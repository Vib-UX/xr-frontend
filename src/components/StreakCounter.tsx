"use client"
import { Zap } from 'lucide-react'
import { useState } from 'react'

interface StreakCounterProps {
    initialStreak?: number[]
}

export function StreakCounter({ initialStreak = [] }: StreakCounterProps) {
    const [streak, setStreak] = useState<number[]>(initialStreak)

    const handleClick = (index: number) => {
        setStreak((prevStreak) => {
            const newStreak = [...prevStreak]
            const streakIndex = newStreak.indexOf(index)
            if (streakIndex !== -1) {
                // Remove the streak if it already exists
                newStreak.splice(streakIndex, 1)
            } else {
                // Add the streak if it doesn't exist
                newStreak.push(index)
            }
            return newStreak.sort((a, b) => a - b)
        })
    }

    const getColor = (index: number) => streak.includes(index) ? 'text-yellow-400' : 'text-gray-400'

    return (
        <div className="p-4 rounded-lg flex items-center justify-end space-x-4">
            <span className="text-gray-700 font-bold">YOUR STREAK</span>
            {[0, 1, 2].map((index) => (
                <Zap
                    key={index}
                    className={`w-6 h-6 cursor-pointer ${getColor(index)}`}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    )
}
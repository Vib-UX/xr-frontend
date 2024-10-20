'use client'
import { CheckCircle2 } from "lucide-react"
import { createContext, ReactNode, useContext, useState } from "react"


interface StreakContextType {
    streak: number[]
    toggleStreak: () => void
    getColor: (index: number) => string
}

const StreakContext = createContext<StreakContextType | undefined>(undefined)


export function StreakProvider({ children }: { children: ReactNode }) {
    const [streak, setStreak] = useState<number[]>([])

    function toggleStreak() {
        setStreak((prevStreak) => {
            if (prevStreak.length === 3) {
                return []
            }
            return [...prevStreak, prevStreak.length]
        })
    }

    const getColor = (index: number) =>
        streak.includes(index) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400';


    const value = { streak, toggleStreak, getColor }

    return <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
}

export function useStreak() {
    const context = useContext(StreakContext)
    if (context === undefined) {
        throw new Error('useStreak must be used within a StreakProvider')
    }
    return context
}

export function StreakDisplay() {
    const { getColor, toggleStreak } = useStreak()

    return (
        <div className="rounded-lg flex items-center justify-end space-x-2">
            {[0, 1, 2, 3].map((index) => (
                <div
                    key={index}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${getColor(index)}`}
                >
                    {index <= 3 ? (
                        <CheckCircle2 className="w-6 h-6" />
                    ) : (
                        ''
                    )}
                </div>
            ))}
        </div>
    )
}

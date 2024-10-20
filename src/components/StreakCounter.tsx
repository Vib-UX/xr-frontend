'use client';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface StreakCounterProps {
    initialStreak?: number[];
}

export function StreakCounter({ initialStreak = [] }: StreakCounterProps) {
    const [streak, setStreak] = useState<number[]>(initialStreak);

    const handleClick = (index: number) => {
        setStreak((prevStreak) => {
            const newStreak = [...prevStreak];
            const streakIndex = newStreak.indexOf(index);
            if (streakIndex !== -1) {
                // Remove the streak if it already exists
                newStreak.splice(streakIndex, 1);
            } else {
                // Add the streak if it doesn't exist
                newStreak.push(index);
            }
            return newStreak.sort((a, b) => a - b);
        });
    };

    const getColor = (index: number) =>
        streak.includes(index) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400';

    return (
        <div className="flex space-x-2 items-center">
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
    );
}

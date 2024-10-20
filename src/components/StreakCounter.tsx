'use client';
import { Zap } from 'lucide-react';
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
        streak.includes(index) ? 'text-[#0051FE]' : 'text-[#313131B2]';

    return (
        <div className="flex items-center">
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <Zap
                    key={index}
                    className={`size-5 cursor-pointer ${getColor(index)}`}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
}

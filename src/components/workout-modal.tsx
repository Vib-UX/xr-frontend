"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useAccount } from 'wagmi'
import RecordDailyWorkout from "./RecordDailyWorkout"
import WalletWrapper from "./WalletWrapper"

export default function WorkoutoutModal({ children }: {
    children: React.ReactNode
}) {
    const { address } = useAccount();

    return (
        <Dialog>

            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Workout Plan</DialogTitle>
                    <DialogDescription>View your workout plan for today.</DialogDescription>
                </DialogHeader>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Power Shred: Active Arms - Day 1</CardTitle>
                        <CardDescription>Cut fat and build power at home and get your desired physique.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[
                                { name: "Chest", image: "/images/bodybuilder.png" },
                                { name: "Legs", image: "/images/dumbell.png" },
                                { name: "Back", image: "/images/luke.png" },
                                { name: "Shoulders", image: "/images/ini.png" }
                            ].map((part) => (
                                <div key={part.name} className="relative aspect-video">
                                    <Image
                                        src={part.image}
                                        alt={part.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                    <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                                        {part.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Exercises for Chest</h3>
                            <ul className="space-y-2">
                                <li>
                                    <span className="font-medium">Push-ups</span> - 3 sets of 15 reps. Works your chest, shoulders, and
                                    triceps.
                                </li>
                                <li>
                                    <span className="font-medium">Bench Press</span> - 4 sets of 12 reps. Focuses on your chest muscles.
                                </li>
                                <li>
                                    <span className="font-medium">Chest Fly</span> - 3 sets of 15 reps. Isolates the chest for definition.
                                </li>
                                <li>
                                    <span className="font-medium">Incline Press</span> - 4 sets of 10 reps. Targets the upper chest.
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {address ? (
                            <RecordDailyWorkout />
                        ) : (
                            <WalletWrapper
                                className="w-[450px] max-w-full"
                                text="Sign in to transact"
                            />
                        )}
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WorkoutoutModal from '@/components/workout-modal';
import { MUSD_ADDRESS_MAPPING } from "@/constants";
import useGlobalStore from '@/store';
import { MORPH_HOLESKY } from '@/utils/chains';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Address, erc20Abi, formatUnits, getAddress } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { StreakDisplay } from './StreakContext';

export interface Challenge {
    title: string
    description: string
    image: string
    duration: string
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export const challenges: Challenge[] = [
    {
        title: "30-Day Fitness Challenge",
        description: "Transform your body with daily workouts and nutrition tips.",
        image: "/images/crusher.png",
        duration: "30 days",
        difficulty: "Intermediate"
    },
    {
        title: "Mindful Meditation Marathon",
        description: "Reduce stress and improve focus with guided daily meditations.",
        image: "/images/back.png",
        duration: "21 days",
        difficulty: "Beginner"
    },
    {
        title: "Strength Training Bootcamp",
        description: "Build muscle and boost metabolism with intense strength workouts.",
        image: "/images/abs.png",
        duration: "6 weeks",
        difficulty: "Advanced"
    },
]

export function ChallengeCard({ title, description, image, duration, difficulty }: Challenge) {
    return (
        <Card className="w-full max-w-[340px] min-w-[250px] overflow-hidden bg-white shadow-lg border border-blue-400 rounded-md">
            <Image
                src={image}
                width={200}
                height={200}
                alt="Person doing bicep curl with dumbbell on a beach"
                className="w-full object-cover"
            />
            <CardContent className="p-4">
                <div className="text-xl text-[#313131] mb-1">
                    {title}
                </div>
                <p className="text-gray-600 text-sm mb-3">
                    {description}
                </p>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <span className="text-blue-600 font-bold text-sm mr-1">
                            {duration}
                        </span>
                        <span className="text-gray-600 text-sm">Days</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-blue-600 font-bold text-lg mr-1">
                            32
                        </span>
                        <span className="text-gray-600 text-sm">Tokens</span>
                    </div>
                </div>
                <Button
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-none"
                    variant="ghost"
                >
                    Accept Challenge
                </Button>
            </CardContent>
        </Card>
    );
}
export function UpcomingChallengeCard() {
    return (
        <Card className="w-full max-w-[400px] min-w-[400px] overflow-hidden bg-white shadow-lg border border-blue-400 rounded-md">
            <CardContent className="p-4">
                <div className="text-2xl text-[#313131] mb-1">
                    Curl Crusher Challenge
                </div>
                <p className="text-gray-600 text-sm mb-3">
                    Perform 50 bicep curls daily using either dumbbells
                </p>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <span className="text-blue-600 font-bold text-lg mr-1">
                            5
                        </span>
                        <span className="text-gray-600 text-sm">Days</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-blue-600 font-bold text-lg mr-1">
                            120
                        </span>
                        <span className="text-gray-600 text-sm">Tokens</span>
                    </div>
                </div>
                <Button
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-none"
                    variant="ghost"
                >
                    Accept Challenge
                </Button>
            </CardContent>
        </Card>
    );
}

export function OngoingChallengeCard() {
    const [open, setOpen] = useState(false)
    const { morphBiconomyAccountAddress } = useGlobalStore()
    const { address, chain } = useAccount()

    const { data } = useReadContract({
        abi: erc20Abi,
        address: MUSD_ADDRESS_MAPPING[chain?.id as keyof typeof MUSD_ADDRESS_MAPPING] as `0x${string}`,
        functionName: 'balanceOf',
        args: [address ? chain?.id === MORPH_HOLESKY.id ? morphBiconomyAccountAddress as `0x${string}` : getAddress(address as Address) : '' as '0x${string}'],
        query: {
            enabled: !!address
        }
    })


    return (
        <div className="bg-white rounded-lg shadow-lg border border-blue-400 overflow-hidden">
            <div className="md:flex">
                <div className="md:flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-2">
                        Serenity Stretch & Breathe Challenge
                    </h2>
                    <p className="text-gray-600 mb-4">
                        VR sessions focusing on gentle stretching and
                        controlled breathing to improve flexibility and
                        reduce tension.
                    </p>
                    <div className="flex justify-between mb-4">
                        <div>
                            <span className="font-semibold">Duration:</span>{' '}
                            <span className="text-blue-600 font-bold">
                                5 Days
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold">Reward:</span>{' '}
                            <span className="text-blue-600 font-bold">
                                120 Tokens
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="">
                            <p className="font-semibold">Calories Burned:</p>
                            <p className="text-gray-600">
                                Approx. 60-100 Calories per session
                                <br />
                                (300-500 total)
                            </p>
                        </div>
                        <a target="_blank" href={`${chain?.blockExplorers?.default.url}/address/${MUSD_ADDRESS_MAPPING[chain?.id as keyof typeof MUSD_ADDRESS_MAPPING] as `0x${string}`}`} className="text-blue-600 hover:text-blue-700 underline font-bold">
                            <div>
                                <span className="font-semibold">Reward:</span>{' '}
                                {data ? formatUnits(data, 6).toString() : '0'} USDC
                            </div>
                        </a>
                    </div>

                    <div>
                        <p className="font-semibold mb-2">
                            Days to Complete
                        </p>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0">
                            <StreakDisplay />
                            <WorkoutoutModal open={open} onClose={() => {
                                toast.dismiss()
                                setOpen(false)
                            }}>
                                <div
                                    onClick={() => setOpen(true)}
                                    className="bg-blue-100 p-2 rounded-lg cursor-pointer w-full md:w-fit text-center"
                                >
                                    Try It Out
                                </div>
                            </WorkoutoutModal>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/5">
                    <img
                        src="/images/vr.png"
                        alt="Person in VR headset doing yoga"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WorkoutoutModal from '@/components/workout-modal';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ChallengeCard() {
    return (
        <Card className="w-full max-w-[320px] min-w-[250px] overflow-hidden bg-white shadow-lg border border-blue-400 rounded-md">
            <Image
                src="/images/mark.png"
                width={200}
                height={200}
                alt="Person doing bicep curl with dumbbell on a beach"
                className="w-full object-cover"
            />
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
    let [isOpen, setIsOpen] = useState(false);
    function open() {
        setIsOpen(true);
    }
    return (
        <>
            {/* <WorkoutModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
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
                        <div className="mb-4">
                            <p className="font-semibold">Calories Burned:</p>
                            <p className="text-gray-600">
                                Approx. 60-100 Calories per session
                                <br />
                                (300-500 total)
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold mb-2">
                                Days to Complete
                            </p>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0">
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((day) => (
                                        <div
                                            key={day}
                                            className={`w-8 h-8 rounded-md flex items-center justify-center ${day <= 3
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-gray-100 text-gray-400'
                                                }`}
                                        >
                                            {day <= 3 ? (
                                                <CheckCircle2 className="w-6 h-6" />
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <WorkoutoutModal>
                                    <div
                                        onClick={open}
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
        </>
    );
}

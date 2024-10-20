'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { fetchStats } from '@/hooks/useFitbitAuth';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef, useState } from 'react';
import StartWorkoutButton from './health/StartWorkout';
import RecordDailyWorkout from './RecordDailyWorkout';

export default function WorkoutoutModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showVrVideo, setShowVrVideo] = useState(true);
    const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const videoRef = useRef<HTMLVideoElement>(null);
    const { data: stats, refetch } = useQuery({
        queryKey: ['user-stats'],
        queryFn: () => fetchStats(sessionCode!),
        enabled: false,
    });

    const handleStartWorkout = async () => {
        //TODO contract call of staking
        await refetch();

        if (videoRef.current) {
            videoRef.current.play();
            setIsWorkoutStarted(true);
        }
    };
    const validateWorkout = () => {
        const changeInVo2 =
            stats?.vo2Max?.cardioScore[0]?.value?.vo2Max >
            stats?.vo2Max?.cardioScore[1]?.value?.vo2Max;
        const changeInBr =
            stats?.brData[0]?.value?.breathingRate >
            stats?.brData[1]?.value?.breathingRate;
        return changeInVo2 || changeInBr;
    };
    const handleCompleteWorkout = async () => {
        const workoutResp = validateWorkout();
        console.log(workoutResp);
        if (workoutResp) {
            //TODO contract call of txn
            await refetch();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
                <Card className="w-full mt-3">
                    <CardHeader>
                        <CardTitle>
                            Get Started with your fitness journey
                        </CardTitle>
                        <CardDescription>
                            Cut fat and build power at home and get your desired
                            physique.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!showVrVideo ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {[
                                    {
                                        name: 'Chest',
                                        image: '/images/bodybuilder.png',
                                    },
                                    {
                                        name: 'Legs',
                                        image: '/images/dumbell.png',
                                    },
                                    { name: 'Back', image: '/images/luke.png' },
                                    {
                                        name: 'Shoulders',
                                        image: '/images/ini.png',
                                    },
                                ].map((part) => (
                                    <div
                                        key={part.name}
                                        className="relative aspect-video"
                                    >
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
                        ) : (
                            <div>
                                <video
                                    className="rounded-lg"
                                    ref={videoRef}
                                    controls={isWorkoutStarted}
                                >
                                    <source
                                        src="https://res.cloudinary.com/ds9mjlm1r/video/upload/v1729114456/checkVid_ypequp.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 mt-3">
                                Workout Details
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center justify-between">
                                    <span className="font-medium">
                                        Duration
                                    </span>
                                    <div className="font-bold text-blue-600">
                                        5 Days
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="font-medium">Rewards</span>
                                    <div className="font-bold text-blue-600">
                                        120 Days
                                    </div>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="font-medium">
                                        Calories burned
                                    </span>
                                    <div className="font-bold text-blue-600">
                                        60-100
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {showVrVideo ? (
                            <StartWorkoutButton
                                onSuccess={() => {
                                    setIsWorkoutStarted(true);
                                    if (videoRef.current) {
                                        videoRef.current.play();
                                    }
                                }}
                            />
                        ) : (
                            <RecordDailyWorkout />
                        )}
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

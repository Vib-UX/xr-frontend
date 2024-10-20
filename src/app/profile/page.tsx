'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchUserData, useFitbitAuth } from '@/hooks/useFitbitAuth';
import { generateCodeChallenge, generateCodeVerifier } from '@/lib/helper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

import { StreakCounter } from '@/components/StreakCounter';
import { PulsatingButton } from '@/components/buttons/PulsatingButton';
import bp from '../../../public/images/bp.png';
import Gunna from '../../../public/images/gunna.png';
import hr from '../../../public/images/hr.png';
import sleep from '../../../public/images/sleep.png';
import walking from '../../../public/images/walking.png';

const WorkoutData = [
    {
        item: 'Heart Rate',
        unit: 'bpm',
        img: hr,
    },
    {
        item: 'Blood Pressure',
        unit: 'mg/hg',
        img: bp,
    },

    {
        item: 'Calories',
        unit: 'kcal',
        img: sleep,
    },
    {
        item: 'Walking',
        unit: 'Steps',
        img: walking,
    },
    {
        item: 'Sleep',
        unit: 'Hrs',
        img: sleep,
    },
    {
        item: 'Distance',
        unit: 'km',
        img: hr,
    },
];

export default function ProfilePage() {
    const { data: session, status } = useSession();
    useFitbitAuth();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => signIn('google'),
    });

    const isConnected = !!session;

    const handleGoogleSignIn = () => {
        // In a real application, this would trigger the Google Sign-In process
        mutateAsync();
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const { data: fitbitData } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => fetchUserData(sessionCode!),
        enabled: !!sessionCode,
    });
    const handleGetFitRedirection = async () => {
        const verifier = generateCodeVerifier();
        const challenge = await generateCodeChallenge(verifier);
        sessionStorage.setItem('code_verifier', verifier);
        window.location.href = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23PVCB&scope=activity+cardio_fitness+electrocardiogram+heartrate+irregular_rhythm_notifications+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=${challenge}&code_challenge_method=S256`;
    };

    if (!isConnected) {
        return (
            <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full max-w-md bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-[#3B82F6]">
                                Welcome to BASE FIT
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center mb-6">
                                Sign in to access your profile and training
                                programs.
                            </p>
                            <Button
                                disabled={isPending}
                                onClick={handleGoogleSignIn}
                                className="w-full bg-[#3B82F6] text-white disabled:cursor-not-allowed hover:bg-[#2563EB]"
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign in with Google
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="text-2xl font-medium mb-6 text-[#0051FE]"
                variants={itemVariants}
            >
                Welcome, {fitbitData?.displayName}
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 md:gap-x-10">
                <div className="flex flex-col md:flex-row  col-span-2 border gap-x-6 border-[#7FA8FF] rounded-lg bg-[#F5FAFE]">
                    <div className="bg-white p-6 rounded-xl">
                        <Image
                            src={fitbitData?.avatar}
                            alt="avatar"
                            height={150}
                            width={150}
                            className="rounded-xl mx-auto md:mx-0"
                        />
                        <div className="text-center pt-2">
                            @{fitbitData?.displayName}
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3 p-6 gap-5 md:gap-0 text-[#313131B2]">
                        <div>Age : {fitbitData?.age} yrs</div>
                        <div>Weight : {fitbitData?.weight}</div>
                        <div>Height : {fitbitData?.height}</div>
                        <div>Steps : {fitbitData?.averageDailySteps}</div>
                        <div className="col-span-2">
                            Steps : {fitbitData?.averageDailySteps}
                        </div>

                        <div className="col-span-3 md:col-span-2 flex items-start gap-x-2">
                            Active Streaks : <StreakCounter />
                        </div>
                        <div className="md:col-span-1 col-span-3">
                            {!fitbitData && (
                                <div onClick={handleGetFitRedirection}>
                                    <PulsatingButton className="h-fit w-full md:w-fit">
                                        Connect Gear
                                    </PulsatingButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5FAFE] text-[#313131B2] mt-6 md:mt-0 border border-[#7FA8FF]">
                    Coaches
                    <div>
                        {[0, 1].map(() => (
                            <div className="pt-3 flex items-center gap-x-4">
                                <Image
                                    src={Gunna}
                                    alt="Coach"
                                    className="object-cover"
                                />
                                <div className="text-[#313131]">
                                    Gunnar Peterson
                                    <div className="text-[#313131B2] text-sm">
                                        Fitness and Health coach
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 border border-[#7FA8FF] p-4 rounded-lg bg-[#F5FAFE] my-6 h-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {WorkoutData.map((elem, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#ABC7FE] rounded-lg px-4 py-2"
                        >
                            {elem.item}
                            <div className="flex items-center justify-between mt-5">
                                <div>
                                    <div className="font-semibold text-lg md:text-2xl">
                                        120
                                    </div>
                                    <div className="bg-[#7FA8FF33] px-2 text-xs md:text-sm text-[#588DFD] rounded-lg border boreder-[#DDE9FE]">
                                        {elem.unit}
                                    </div>
                                </div>
                                <Image
                                    src={elem.img}
                                    alt="tracker"
                                    height={40}
                                    width={40}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

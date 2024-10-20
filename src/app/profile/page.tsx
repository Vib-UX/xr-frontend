'use client';

import { fetchUserData, useFitbitAuth } from '@/hooks/useFitbitAuth';
import { generateCodeChallenge, generateCodeVerifier } from '@/lib/helper';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Avatar from '../../../public/images/avatar.png';
import { StreakCounter } from '@/components/StreakCounter';
import { PulsatingButton } from '@/components/buttons/PulsatingButton';
import WaveLoader from '@/components/loader';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
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
        value: '70',
    },
    {
        item: 'Blood Pressure',
        unit: 'mg/hg',
        img: bp,
        value: '120/75',
    },

    {
        item: 'Calories',
        unit: 'kcal',
        img: sleep,
        value: '200',
    },
    {
        item: 'Walking',
        unit: 'Steps',
        img: walking,
        value: '5000',
    },
    {
        item: 'Sleep',
        unit: 'Hrs',
        img: sleep,
        value: '8hrs',
    },
    {
        item: 'Distance',
        unit: 'km',
        img: hr,
        value: '2',
    },
];

export default function ProfilePage() {
    useFitbitAuth();

    const { user } = useDynamicContext();

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
                Welcome,{' '}
                {fitbitData?.displayName ||
                    user?.verifiedCredentials[2]?.publicIdentifier}
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 md:gap-x-10">
                <div className="flex flex-col md:flex-row  col-span-2 border gap-x-6 border-[#7FA8FF] rounded-lg bg-[#F5FAFE]">
                    <div className="bg-white p-6 rounded-xl">
                        <Image
                            src={fitbitData?.avatar || Avatar}
                            alt="avatar"
                            height={150}
                            width={150}
                            className="rounded-xl mx-auto md:mx-0"
                        />
                        <div className="text-center pt-2">
                            @
                            {fitbitData?.displayName ||
                                user?.verifiedCredentials[2]?.publicIdentifier}
                        </div>
                    </div>
                    {fitbitData ? (
                        <div className="w-full grid grid-cols-3 p-6 gap-5 md:gap-0 text-[#313131B2]">
                            <div>Age : {fitbitData?.age} yrs</div>
                            <div>Weight : {fitbitData?.weight} met</div>
                            <div>Height : {fitbitData?.height} cm</div>
                            <div>Steps : {fitbitData?.averageDailySteps}</div>
                            {fitbitData?.topBadges[0]?.image300px && (
                                <div className="col-span-2 flex items-start gap-x-2">
                                    Badges :{' '}
                                    <Image
                                        src={fitbitData.topBadges[0].image300px}
                                        alt="avatar"
                                        height={25}
                                        width={25}
                                    />
                                </div>
                            )}

                            <div className="col-span-3 md:col-span-2 flex items-start gap-x-2">
                                Active Streaks : <StreakCounter />
                            </div>
                            <div className="md:col-span-1 col-span-3">
                                <PulsatingButton className="h-fit w-full md:w-fit">
                                    Gear Connected
                                </PulsatingButton>
                            </div>
                        </div>
                    ) : (
                        <div className="py-4 flex items-center justify-center w-full flex-col">
                            Connect your Fitbit to see your stats
                            <div
                                onClick={handleGetFitRedirection}
                                className="w-full px-8 md:px-0"
                            >
                                <PulsatingButton className="h-fit w-full md:w-fit mx-auto mt-3">
                                    Connect Gear
                                </PulsatingButton>
                            </div>
                        </div>
                    )}
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
                                    <div className="font-semibold text-lg">
                                        {!fitbitData ? (
                                            <WaveLoader />
                                        ) : (
                                            elem.value
                                        )}
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

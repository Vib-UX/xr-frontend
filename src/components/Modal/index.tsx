import { fetchStats } from '@/hooks/useFitbitAuth';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
export default function WorkoutModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    function close() {
        setIsOpen(false);
    }
    const [step, setStep] = useState(1);
    const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const { data: stats, refetch } = useQuery({
        queryKey: ['user-stats'],
        queryFn: () => fetchStats(sessionCode!),
        enabled: false,
    });
    const videoRef = useRef<HTMLVideoElement>(null);
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
        <>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    {step === 2 ? (
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl bg-blue-100 transition-colors text-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out"
                            >
                                <DialogTitle
                                    as="h3"
                                    className="text-base/7 font-medium pb-5"
                                >
                                    Lets Get Started
                                </DialogTitle>
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
                                <div className="mt-8">
                                    <Button
                                        onClick={
                                            isWorkoutStarted
                                                ? handleCompleteWorkout
                                                : handleStartWorkout
                                        }
                                        className="w-full text-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 "
                                    >
                                        {isWorkoutStarted ? 'End ' : 'Start '}
                                        Workout
                                    </Button>
                                </div>
                            </DialogPanel>
                        </div>
                    ) : (
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl bg-blue-100 transition-colors text-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out"
                            >
                                <DialogTitle
                                    as="h3"
                                    className="text-base/7 font-medium "
                                >
                                    Get Started with your fitness journey
                                </DialogTitle>
                                <div className="flex items-center  justify-between">
                                    <div className="mt-2 text-sm/6">
                                        Duration
                                        <div className="font-bold text-blue-600">
                                            5 Days
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm/6">
                                        Rewards
                                        <div className="font-bold text-blue-600">
                                            120 Days
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm/6">
                                        Calories burned
                                        <div className="font-bold text-blue-600">
                                            60-100
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Button
                                        onClick={() => setStep(2)}
                                        className="w-full text-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 "
                                    >
                                        Stake 15 USDC
                                    </Button>
                                </div>
                            </DialogPanel>
                        </div>
                    )}
                </div>
            </Dialog>
        </>
    );
}

'use client';
import FitnessClubCard from '@/components/FitnessChallenge';
import {
    ChallengeCard,
    challenges,
    OngoingChallengeCard
} from './ChallengeCard';
import CoachCard from './CoachCard';
import UpcomingChallenges from './UpcomingChallenges';
import { StreakProvider } from './StreakContext';


const HealthGainContent = () => {
    return (
        <div className="p-5">
            <div className="flex items-start md:space-x-3 md:flex-row flex-col justify-between">
                <div className="md:w-[72%] w-full ">
                    <p className="text-2xl text-[#313131] mb-4">
                        Ongoing Challenges
                    </p>
                    <OngoingChallengeCard />
                    <p className="text-2xl text-[#313131] mt-10 mb-4">
                        Available Challenges
                    </p>
                    <div className="flex max-w-[1400px] overflow-x-auto gap-4">
                        {challenges.map((challenge, index) => (
                            <ChallengeCard key={index} {...challenge} />
                        ))}
                    </div>
                    <p className="text-2xl text-[#313131] mt-10 mb-4">
                        Upcoming Challenges
                    </p>
                    <UpcomingChallenges />
                </div>
                <div className="md:w-[25%] w-full mt-10" >
                    <CoachCard />
                    <FitnessClubCard />
                    {/* <div className="bg-white border mt-10 border-blue-400 h-[300px] rounded-md p-4"></div> */}
                    {/* <div className="bg-white border mt-10 border-blue-400 h-[300px] rounded-md p-4"></div> */}
                </div>
            </div>
        </div>
    )
}

function HealthGainPage() {
    return (
        <StreakProvider>
            <HealthGainContent />
        </StreakProvider>
    )
}

export default HealthGainPage
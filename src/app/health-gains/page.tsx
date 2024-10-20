import ChallengeCard, {
    OngoingChallengeCard,
    UpcomingChallengeCard,
} from './ChallengeCard';
import CoachCard from './CoachCard';

const HealthGainPage = () => {
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
                        <ChallengeCard />
                        <ChallengeCard />
                        <ChallengeCard />
                        <ChallengeCard />
                        <ChallengeCard />
                        <ChallengeCard />
                    </div>
                    <p className="text-2xl text-[#313131] mt-10 mb-4">
                        Upcoming Challenges
                    </p>
                    <div className="flex max-w-[1400px] overflow-x-auto gap-4">
                        <UpcomingChallengeCard />
                        <UpcomingChallengeCard />
                        <UpcomingChallengeCard />
                        <UpcomingChallengeCard />
                        <UpcomingChallengeCard />
                        <UpcomingChallengeCard />
                    </div>
                </div>
                <div className="md:w-[25%] w-full mt-10" >
                    <CoachCard />
                    <div className="bg-white border mt-10 border-blue-400 h-[300px] rounded-md p-4"></div>
                    <div className="bg-white border mt-10 border-blue-400 h-[300px] rounded-md p-4"></div>
                </div>
            </div>
        </div>
    );
};

export default HealthGainPage;

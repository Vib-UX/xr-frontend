import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Coach {
    name: string;
    title: string;
    avatarUrl: string;
}

function CoachEntry({ name, title, avatarUrl }: Coach) {
    return (
        <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
    )
}

export default function CoachCard() {
    const coaches: Coach[] = [
        {
            name: "Gunnar Peterson",
            title: "Fitness and Health Coach",
            avatarUrl: "/images/gunnar-peterson.png"
        },
        {
            name: "Sarah Johnson",
            title: "Nutrition Specialist",
            avatarUrl: "/images/sarah-johnson.png"
        },
        {
            name: "Michael Chen",
            title: "Strength Training Expert",
            avatarUrl: "/images/michael-chen.png"
        }
    ];

    return (
        <div className="bg-white border border-blue-400 h-[300px] rounded-md p-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Coaches</h2>
            {coaches.map((coach, index) => (
                <CoachEntry key={index} {...coach} />
            ))}
        </div>
    )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function FitnessClubCard() {
    const clubs = [
        {
            name: "Sweat Society",
            description: "A community driven by passion and hard work.",
            image: "/images/people1.png",
        },
        {
            name: "Fit Life Club",
            description: "Living the fit life, one workout at a time.",
            image: "/images/people2.png",
        },
        {
            name: "Energy Circle",
            description: "Feel the energy with every movement in our fitness circle.",
            image: "/images/people3.png",
        },
    ]

    return (
        <Card className="w-full  mx-auto border border-blue-300 mt-6 shadow-sm">
            <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-xl font-normal text-gray-700">Fitness Clubs to Join</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {clubs.map((club, index) => (
                    <div key={index} className="flex space-x-4">
                        <div className="flex-shrink-0">
                            <Image
                                src={club.image}
                                alt={club.name}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-semibold text-gray-800">{club.name}</h3>
                            <p className="text-gray-600 text-sm">&quot;{club.description}&quot;</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
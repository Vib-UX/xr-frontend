import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface TaskCard {
    id: number
    title: string
    image: string
    status: string
}

const taskCards: TaskCard[] = [
    {
        id: 1,
        title: "VR Yoga Flow Task",
        image: "/images/upcom.png",
        status: "Coming soon"
    },
    {
        id: 2,
        title: "VR Meditation Session",
        image: "/images/vryoga.png",
        status: "Available now"
    },
    {
        id: 3,
        title: "Cycle Marathon",
        image: "/images/cycle.png",
        status: "Coming next week"
    }
]

export default function UpcomingChallenges() {
    return (
        <div className="flex max-w-[1400px] overflow-x-auto gap-4">
            {taskCards.map((card) => (
                <Card key={card.id} className="w-full max-w-sm mx-auto border border-blue-400 rounded-md">
                    <CardHeader className="p-0">
                        <Image
                            src={card.image}
                            alt={card.title}
                            width={150}
                            height={80}
                            className="w-full h-32 object-cover rounded-t-lg"
                        />
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex justify-between relative h-20 items-start">
                            <div>
                                <CardTitle className="text-lg font-bold text-[#313131]">{card.title}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-2">{card.status}</p>
                            </div>
                            <Button
                                size="sm"
                                className="mt-1 bg-blue-300 absolute right-0 bottom-0 text-white hover:bg-blue-400 focus:ring-blue-300"
                            >
                                Notify
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
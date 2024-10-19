"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, motion } from "framer-motion"
import { CalendarDays, Dumbbell, LogIn, Trophy, User } from "lucide-react"
import { signIn, useSession } from "next-auth/react"


const MotionCard = motion(Card)

export default function UserProfile() {
    const { data: session, status } = useSession()
    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => signIn("google")
    })
    console.log(session);


    const isConnected = !!session
    // This would typically come from an API or state management
    const user = isConnected ? {
        name: session.user?.name,
        email: session.user?.email,
        avatar: session.user?.image,
        subscriptions: [
            { name: "Beyond Motivated", trainer: "David Goggins", expires: "2024-12-31" },
            { name: "Muscle Building", trainer: "Lazar Angelov", expires: "2024-12-31" },
        ],
        programs: [
            { name: "Endurance-Focused Workouts", progress: 75 },
            { name: "Progressive Overload Techniques", progress: 50 },
        ],
    } : null

    const handleGoogleSignIn = () => {
        // In a real application, this would trigger the Google Sign-In process
        mutateAsync()
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    }

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
                            <CardTitle className="text-2xl text-center text-[#3B82F6]">Welcome to BASE FIT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center mb-6">Sign in to access your profile and training programs.</p>
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
        )
    }

    return (
        <motion.div
            className="container mx-auto p-6  min-h-screen"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>My Profile</motion.h1>
            <div className="grid gap-6 md:grid-cols-2">
                <MotionCard className="bg-white" variants={itemVariants}>
                    <CardHeader>
                        <CardTitle className="text-[#3B82F6]">User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.avatar ?? ''} alt={user?.name ?? ''} />
                            <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-semibold">{user?.name}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </CardContent>
                </MotionCard>

                <MotionCard className="bg-white" variants={itemVariants}>
                    <CardHeader>
                        <CardTitle className="text-[#3B82F6]">Active Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {user?.subscriptions.map((sub, index) => (
                                <motion.li
                                    key={index}
                                    className="flex justify-between items-center"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div>
                                        <p className="font-medium">{sub.name}</p>
                                        <p className="text-sm text-muted-foreground">Trainer: {sub.trainer}</p>
                                    </div>
                                    <p className="text-sm">Expires: {sub.expires}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </CardContent>
                </MotionCard>

                <MotionCard className="md:col-span-2 bg-white" variants={itemVariants}>
                    <CardHeader>
                        <CardTitle className="text-[#3B82F6]">My Training Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="current">
                            <TabsList>
                                <TabsTrigger
                                    value="current"
                                    className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"
                                >
                                    Current Programs
                                </TabsTrigger>
                                <TabsTrigger
                                    value="completed"
                                    className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"
                                >
                                    Completed Programs
                                </TabsTrigger>
                            </TabsList>
                            <AnimatePresence mode="wait">
                                <TabsContent value="current">
                                    {user?.programs.map((program, index) => (
                                        <motion.div
                                            key={index}
                                            className="mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-medium">{program.name}</h3>
                                                <span className="text-sm">{program.progress}% Complete</span>
                                            </div>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${program.progress}%` }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <Progress value={program.progress} className="h-2 bg-[#3B82F6]" />
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="completed">
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        No completed programs yet.
                                    </motion.p>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </CardContent>
                </MotionCard>
            </div>

            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                variants={containerVariants}
            >
                {[
                    { icon: CalendarDays, text: "Schedule" },
                    { icon: Dumbbell, text: "Workouts" },
                    { icon: Trophy, text: "Achievements" },
                    { icon: User, text: "Edit Profile" },
                ].map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Button
                            className="h-20 w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                        >
                            <item.icon className="mr-2 h-4 w-4" /> {item.text}
                        </Button>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}
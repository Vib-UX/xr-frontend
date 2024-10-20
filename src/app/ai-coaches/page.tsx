'use client';

import { SlightFlip } from '@/components/ui/SlightFlip';
import { Input } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import React, {
    ChangeEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import Markdown from 'react-markdown';
import Anllela from '../../../public/images/aneela.png';
import Henry from '../../../public/images/henry.png';
import Karina from '../../../public/images/karina.png';

import StaggeredFadeLoader from '@/components/buttons/Loader';
import { ThreeDCard } from '@/components/ui/card/ThreeDCard';
import { fetchUserData } from '@/hooks/useFitbitAuth';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface Message {
    text: string;
    sender: 'user' | 'ai';
    avatar?: any;
}

const Models = [
    {
        title: 'Anllela Sagra',
        desc: 'Colombian fitness model and bodybuilder known for her muscular physique and motivational fitness content',
        img: Anllela,
    },
    {
        title: 'Karina Elle',
        desc: 'American fitness model and former cheerleader celebrated for her tall, lean physique and active, balanced lifestyle.',
        img: Karina,
    },
    {
        title: 'Henry Cavill',
        desc: 'British actor and fitness enthusiast known for his muscular build and especially for his roles in action films.',
        img: Henry,
    },
];

const AICoaches: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const [input, setInput] = useState<string>('');
    const { data } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => fetchUserData(sessionCode!),
        enabled: !!sessionCode,
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const recognitionRef = useRef<Window['SpeechRecognition'] | null>(null);

    const [agentData, setAgentData] = useState<{
        name: string;
        avatar: string | StaticImageData;
    }>({ name: '', avatar: '' });
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            if (recognitionRef.current) {
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error('Speech recognition error', event.error);
                };

                recognitionRef.current.onend = () => {
                    console.log('Speech recognition ended');
                };
            }
        }
    }, []);
    const fetchPhalApi = async () => {
        const validateWorkout =
            input.includes('workout plan') || input.includes('Workout Plan');
        const dietValidate =
            input.includes('diet plan') || input.includes('Diet Plan');
        const stringInput = `having ${data?.age} years old, having a weight of ${data?.weight} metric, and a height of ${data?.height} cm.`;
        const finalInput =
            validateWorkout || dietValidate ? `${input} ${stringInput}` : input;
        const name = data?.fullName;
        try {
            if (validateWorkout) {
                const newMessage: Message = {
                    text: `Creating a Workout plan for ${name} ${stringInput} 🏋️`,
                    sender: 'ai',
                };
                setMessages((prev) => [...prev, newMessage]);
            }
            if (dietValidate) {
                const newMessage: Message = {
                    text: `Creating a Diet plan for ${name} 🌱`,
                    sender: 'ai',
                };
                setMessages((prev) => [...prev, newMessage]);
            }

            const resp = await fetch(
                `https://wapo-testnet.phala.network/ipfs/QmXDgi7jbmQjEVdqSuJhWxTpAx5fvgqLzbhPTWg2XGjePk?key=c74d9db176043e5e&chatQuery=${finalInput}`,
                {
                    method: 'GET',
                }
            );
            const data = await resp.json();
            return data?.message;
        } catch (error) {
            console.log(error);
        }
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessage: Message = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        inputRef.current?.focus();
        setIsLoading(true);
        const resp = await fetchPhalApi();
        if (resp) {
            const aiResponse: Message = {
                text: `${agentData.name}: ${resp}`,
                sender: 'ai',
                avatar: agentData.avatar,
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    const startRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = speechSynthesis.getVoices();
        const isMaleAgent = agentData.name
            .toLowerCase()
            .includes('Henry Cavill');

        const targetVoice = voices.find((voice) => {
            if (isMaleAgent) {
                return (
                    voice.name.toLowerCase().includes('male') ||
                    voice.name.toLowerCase().includes('man')
                );
            } else {
                return (
                    voice.name.toLowerCase().includes('female') ||
                    voice.name.toLowerCase().includes('woman')
                );
            }
        });

        if (targetVoice) {
            utterance.voice = targetVoice;
        }

        speechSynthesis.speak(utterance);
    };
    const fetchMotivation = async () => {
        try {
            const resp = await fetch(
                `https://wapo-testnet.phala.network/ipfs/QmXDgi7jbmQjEVdqSuJhWxTpAx5fvgqLzbhPTWg2XGjePk?key=c74d9db176043e5e&chatQuery=create a motivational quote in 1 line as fitness coach is ${agentData.name}`,
                {
                    method: 'GET',
                }
            );
            return await resp.json();
        } catch (error) {
            console.log(error);
        }
    };
    const handleSelectCoach = async (coach: any) => {
        setIsLoading(true);

        try {
            const data = await fetchMotivation();
            const fetchedMessage: Message = {
                text: data?.message,
                sender: 'ai',
            };

            const introMessage: Message = {
                text: `Hi, I am ${coach.title}, your coach! How can I help you today? 😄`,
                sender: 'ai',
                avatar: coach.img,
            };

            setMessages((prev) => [...prev, fetchedMessage, introMessage]);
        } catch (error) {
            console.error('Error fetching motivation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
        }
    }, [messages]);
    const influencerSelected = agentData.name && agentData.avatar;
    return (
        <div
            className={`h-[80vh] md:h-[75vh] w-full flex flex-col justify-between`}
        >
            <div className="h-full">
                <SlightFlip
                    className="text-sm md:text-4xl font-semibold -tracking-wide text-[#313131] md:leading-[2rem]"
                    word="Your Personal Companion"
                />

                <div
                    ref={messageContainerRef}
                    className="mt-12 overflow-y-auto max-h-96 md:max-h-80"
                >
                    {!influencerSelected && (
                        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-x-6 gap-y-6 md:gap-y-0">
                            {Models.map((elem, index) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    key={index}
                                    onClick={() => handleSelectCoach(elem)}
                                >
                                    <ThreeDCard
                                        {...elem}
                                        setAgentData={setAgentData}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={clsx(
                                'flex items-center p-2 rounded-lg max-w-lg break-words w-fit my-4',
                                message.sender === 'user'
                                    ? 'ml-auto bg-blue-500 text-white'
                                    : 'mr-auto bg-gray-300 text-black'
                            )}
                        >
                            {message.sender === 'ai' && message.avatar && (
                                <Image
                                    src={message.avatar}
                                    alt="AI Avatar"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <div className="w-full break-words">
                                <Markdown
                                    className="block w-full"
                                    children={message.text}
                                />
                            </div>
                            {message.sender === 'ai' && (
                                <button
                                    onClick={() => speak(message.text)}
                                    className="ml-2 text-white"
                                    aria-label="Read message"
                                >
                                    🔊
                                </button>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="p-2 rounded-lg max-w-xs break-words w-fit mr-auto bg-gray-300 text-black">
                            <StaggeredFadeLoader />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className="rounded-xl bg-[#313131B2] flex items-center px-4">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className={clsx(
                            'block w-full outline-none focus:ring-0 border-none bg-transparent text-sm/6 text-white placeholder-slate-300',
                            !influencerSelected && 'cursor-not-allowed'
                        )}
                        disabled={!influencerSelected}
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={startRecognition}
                        className="ml-2 text-white"
                    >
                        🎤
                    </button>
                    <svg
                        onClick={handleSend}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer ml-2 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AICoaches;

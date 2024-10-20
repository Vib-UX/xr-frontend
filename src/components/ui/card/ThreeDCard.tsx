'use client';

import Image, { StaticImageData } from 'next/image';
import { CardBody, CardContainer, CardItem } from './ThreeCard';

export function ThreeDCard({
    title,
    desc,
    img,
    setAgentData,
}: {
    title: string;
    desc: string;
    img: StaticImageData | string;
    setAgentData: React.Dispatch<
        React.SetStateAction<{ name: string; avatar: StaticImageData | string }>
    >;
}) {
    return (
        <CardContainer>
            <CardBody
                className="bg-[#F5FAFE] relative group/card border-[#7FA8FF] rounded-xl p-4 border cursor-pointer"
                onClick={() => {
                    setAgentData({ name: title, avatar: img });
                }}
            >
                <CardItem translateZ="100" className="w-full h-44">
                    <div className="relative w-full h-full">
                        <Image
                            src={img}
                            alt="thumbnail"
                            className="object-cover rounded-xl"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </CardItem>
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 my-2 dark:text-white"
                >
                    {title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-[12px] md:text-sm max-w-sm dark:text-neutral-300"
                >
                    {desc}
                </CardItem>
            </CardBody>
        </CardContainer>
    );
}

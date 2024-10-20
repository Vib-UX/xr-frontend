import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { airdao, SUPPORTED_CHAINS } from "@/utils/chains"
import { ChevronDown } from "lucide-react"
import * as React from "react"
import { baseSepolia, Chain, morphHolesky, skaleNebulaTestnet } from "viem/chains"
import { useAccount, useSwitchChain } from "wagmi"

const chainLogo = {
    [baseSepolia.id]:
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_23)">
                <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" fill="black" fill-opacity="0.9" />
                <path d="M14.9871 22.4154C19.091 22.4154 22.4178 19.0954 22.4178 15.0001C22.4178 10.9047 19.091 7.58472 14.9871 7.58472C11.0937 7.58472 7.89971 10.573 7.5825 14.3767H17.404V15.6233H7.5825C7.89971 19.4271 11.0937 22.4154 14.9871 22.4154Z" fill="#E3E7E9" />
            </g>
            <defs>
                <clipPath id="clip0_1_23">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ,
    [airdao.id]:
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.24497 28.4888C5.06869 28.5956 4.83909 28.546 4.7232 28.3763L4.27933 27.7258C4.16344 27.556 4.20234 27.3261 4.36494 27.1996C5.82694 26.0627 7.02866 24.7815 7.97376 23.4089C11.4928 18.2988 11.4928 11.868 7.97376 6.75777C7.02866 5.38534 5.82694 4.10397 4.36494 2.96712C4.20234 2.84067 4.16344 2.61069 4.27933 2.44089L4.7232 1.79048C4.83909 1.62068 5.06869 1.57116 5.24497 1.67796L24.9622 13.6228C26.0627 14.2895 26.0627 15.8773 24.9622 16.544L5.24497 28.4888Z" fill="url(#paint0_linear_1_20)" />
            <defs>
                <linearGradient id="paint0_linear_1_20" x1="25.7874" y1="10.5029" x2="4.21252" y2="10.5029" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#3568DD" />
                    <stop offset="1" stop-color="#7DA3F9" />
                </linearGradient>
            </defs>
        </svg>
    ,
    [morphHolesky.id]: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_17)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 30H10.3306V14.5073C10.3306 14.0065 11.0508 13.929 11.1574 14.4183L13.5948 25.6056H19.7932V21.7553C19.7932 21.5243 19.9804 21.3371 20.2114 21.3371H30V0H19.6694V3.85022C19.6694 4.08119 19.4822 4.26843 19.2512 4.26843H8.94604L9.79294 8.15564C9.84975 8.41636 9.65119 8.66288 9.38438 8.66288H0V30Z" fill="#14A800" />
        </g>
        <defs>
            <clipPath id="clip0_1_17">
                <rect width="30" height="30" fill="white" />
            </clipPath>
        </defs>
    </svg>
    ,
    [skaleNebulaTestnet.id]: <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.3238 0.0272064C23.608 0.0272064 30.3238 6.74234 30.3238 15.0272C30.3238 23.3121 23.608 30.0272 15.3238 30.0272C7.03962 30.0272 0.323822 23.3121 0.323822 15.0272C0.322449 6.74234 7.03825 0.0272064 15.3238 0.0272064Z" fill="white" />
        <path d="M6.71277 5.96704V24.0874H22.464V22.1676H8.87309V7.88682H22.464V5.96704H6.71277Z" fill="black" />
        <path d="M22.3431 20.6375C25.5527 20.6375 26.6926 18.808 26.6926 17.2478C26.6926 15.5072 25.7024 14.4584 23.7522 14.0974L21.7128 13.7378C21.0522 13.6175 20.3325 13.3782 20.3325 12.5974C20.3325 11.6676 21.2623 11.3367 22.1632 11.3367C23.3333 11.3367 23.9637 11.7264 24.1739 12.5673H26.3342C26.0636 10.6475 24.5337 9.44699 22.1934 9.44699C19.3739 9.44699 18.1131 11.0673 18.1131 12.6876C18.1131 14.308 19.0731 15.2979 20.8736 15.6275L22.9433 15.9871C23.6932 16.1375 24.443 16.4069 24.443 17.3668C24.443 18.2364 23.663 18.7765 22.4036 18.7765C20.9931 18.7765 20.1238 18.2364 19.9439 17.2164H17.7835C18.0541 19.3467 19.7035 20.6375 22.3431 20.6375Z" fill="black" />
    </svg>
    ,
}
export default function ChainDropdown() {
    const { switchChain } = useSwitchChain()
    const { address, chain, } = useAccount()
    const [selectedchain, setSelectedchain] = React.useState<Chain>(chain ?? baseSepolia)

    React.useEffect(() => {
        setSelectedchain(chain ?? baseSepolia)
    }, [chain])
    if (!address) return null
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="md:w-[240px]  h-[45px] justify-between focus:outline-none bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                    <div className="flex items-center">
                        {chainLogo[selectedchain.id as keyof typeof chainLogo]}
                        <span className="md:block hidden ml-2">{selectedchain.name}</span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[240px] bg-white">
                {SUPPORTED_CHAINS.map((chain) => (
                    <DropdownMenuItem
                        key={chain.id}
                        onSelect={() => {
                            setSelectedchain(chain)
                            switchChain({ chainId: chain.id })
                        }}
                        className={cn("flex items-center py-3 justify-start  px-4 hover:bg-gray-100", selectedchain.id === chain.id && "bg-blue-100")}
                    >
                        {chainLogo[chain.id as keyof typeof chainLogo]}
                        <span className="md:block hiddenfont-medium">{chain.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
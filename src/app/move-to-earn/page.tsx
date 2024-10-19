'use client'
import { NavbarComponent } from "@/components/Navbar"
import { StreakCounter } from "@/components/StreakCounter"
import { WorkoutCardComponent } from "@/components/workout-card"
import { MENTAL_HEALTH_TOPICS, TRAINER_CONFIG } from "@/constant/appConfig"
import { Address, erc20Abi, formatUnits, getAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

const MoveToEarnPage = () => {
  const { address } = useAccount()
  const { data } = useReadContract({
    abi: erc20Abi,
    address: '0x94Fb9bfCC16319c8FD7DDa77c7735db0823b3729',
    functionName: 'balanceOf',
    args: [address ? getAddress(address as Address) : '' as '0x${string}'],
    query: {
      enabled: !!address
    }
  })

  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto py-10">
        <h1>Training that will make you sweat.</h1>
        <StreakCounter />
        <div className="flex items-center justify-between">
          <p>Base Fit members have over 4,000 workouts at their fingertips. Try one now.</p>
          <p>{data ? formatUnits(data, 6) + " " + "USDC" : "-"}</p>
        </div>
        <div className="flex flex-row gap-4 justify-between py-10">
          {TRAINER_CONFIG.slice(0, 4).map((trainer, index) => <WorkoutCardComponent {...trainer} key={index} />)}
        </div>
        <h1>Build a stronger mind with a mental fitness routine that sticks.</h1>
        <div className="flex flex-row gap-4 justify-between py-10">
          {MENTAL_HEALTH_TOPICS.map((trainer, index) => <WorkoutCardComponent {...trainer} key={index} />)}
        </div>
      </div>
    </div>
  )
}

export default MoveToEarnPage
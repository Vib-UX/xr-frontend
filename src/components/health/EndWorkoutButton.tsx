import { FITNESS_ABI } from '@/abi/FITNESS_ABI'
import { useStreak } from '@/app/health-gains/StreakContext'
import { FITNESS_ADDRESS_MAPPING } from '@/constants'
import { fetchStats } from '@/hooks/useFitbitAuth'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
import Button from '../buttons/Button'
import useMorphBiconomyAccount from '@/hooks/useMorphBiconomyAcc'
import useGlobalStore from '@/store'

const EndWorkoutButton = ({ disabled }: { disabled: boolean }) => {
  const { chain } = useAccount()
  const { morphBiconomyAccount } = useGlobalStore()
  const [txHash, setTxHash] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toggleStreak } = useStreak()
  const publicClient = usePublicClient()
  const { writeContractAsync, isPending } = useWriteContract()
  const sessionCode = sessionStorage.getItem('fitbit_token');

  const { data: stats, refetch } = useQuery({
    queryKey: ['user-stats'],
    queryFn: () => fetchStats(sessionCode!),
    enabled: false,
  });

  const validateWorkout = () => {
    const changeInVo2 =
      stats?.vo2Max?.cardioScore[0]?.value?.vo2Max >
      stats?.vo2Max?.cardioScore[1]?.value?.vo2Max;
    const changeInBr =
      stats?.brData[0]?.value?.breathingRate >
      stats?.brData[1]?.value?.breathingRate;
    return changeInVo2 || changeInBr;
  };

  const handleRecordDailyWorkout = async () => {
    try {
      setIsLoading(true)
      if (!publicClient) {
        setIsLoading(false)
        throw new Error('Public client not found')
      }
      const workoutResp = validateWorkout();
      if (workoutResp) {
        await refetch();
      }
      const recordDailyWorkoutTxHash = await writeContractAsync({
        address: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`,
        abi: FITNESS_ABI,
        functionName: 'recordDailyWorkout',
      })
      const recordDailyWorkoutTxReceipt = await publicClient.waitForTransactionReceipt({
        hash: recordDailyWorkoutTxHash
      })
      if (recordDailyWorkoutTxReceipt.status !== 'success') {
        setIsLoading(false)
        throw new Error('Record daily workout transaction failed')
      }
      toggleStreak()
      setTxHash(recordDailyWorkoutTxReceipt.transactionHash)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }
  const withToast = (fn: () => Promise<void>) => {
    toast.promise(fn(), {
      loading: 'Transaction awaiting confirmation...',
      success: 'Transaction successful!',
      error: 'Transaction failed!',
    })
  }
  return (
    <div className=' w-full'>
      <Button onClick={() => withToast(handleRecordDailyWorkout)} disabled={disabled} isLoading={isLoading || isPending} className="w-full flex items-center justify-center bg-blue-600 h-12  hover:bg-blue-700 text-white">
        End your workout
      </Button>
      {
        txHash && (
          <div className='flex items-center justify-end'>
            <a href={`${chain?.blockExplorers?.default.url}/tx/${txHash}`} target="_blank" className="text-sm text-gray-500 hover:underline text-end mt-2">View transaction</a>
          </div>
        )
      }
    </div>
  )
}

export default EndWorkoutButton

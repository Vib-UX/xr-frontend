import { FITNESS_ABI } from '@/abi/FITNESS_ABI'
import { useStreak } from '@/app/health-gains/StreakContext'
import { FITNESS_ADDRESS_MAPPING } from '@/constants'
import { fetchStats } from '@/hooks/useFitbitAuth'
import useGlobalStore from '@/store'
import { MORPH_HOLESKY } from '@/utils/chains'
import { PaymasterMode } from '@biconomy/account'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'; // Add this import for the close icon
import { useState } from 'react'
import toast from 'react-hot-toast'
import { encodeFunctionData } from 'viem'
import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
import Button from '../buttons/Button'

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

      toast.loading("Transaction awaiting confirmation...")
      setIsLoading(true)
      if (!publicClient) {
        setIsLoading(false)
        throw new Error('Public client not found')
      }
      if (chain?.id === MORPH_HOLESKY.id && !morphBiconomyAccount) {
        throw new Error('Morph Holesky account not found')
      }
      if (chain?.id === MORPH_HOLESKY.id && morphBiconomyAccount) {
        const stakeTokensFuncData = encodeFunctionData({
          abi: FITNESS_ABI,
          functionName: 'recordDailyWorkout',
        })
        const stakeTokensTx = {
          to: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`,
          data: stakeTokensFuncData
        }
        toast.dismiss()
        toast.loading('Sending bundle transaction...')
        const bundleTransaction = await morphBiconomyAccount.sendTransaction(
          [stakeTokensTx],
          {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED },
          }
        );
        const userOpReceipt = await bundleTransaction.wait();
        if (userOpReceipt.success == 'true') {
          toast.dismiss()
          toast.success(
            ({ id }) => (
              <div className='flex items-center w-[200px] justify-between break-keep'>
                <div>
                  Transaction&nbsp;successful!&nbsp;
                  <a
                    href={`${chain?.blockExplorers?.default.url}/tx/${userOpReceipt.receipt.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-sm text-blue-500 hover:underline"
                  >
                    View&nbsp;transaction
                  </a>
                </div>
                <button
                  onClick={() => toast.dismiss(id)}
                  className="ml-2 p-1 rounded-full hover:bg-gray-200"
                >
                  <X size={16} />
                </button>
              </div>
            ),
            { duration: Infinity }
          )
          setIsLoading(false)
          setTxHash(userOpReceipt.receipt.transactionHash)
        }
        return
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
      toast.dismiss()
      toast.success(
        ({ id }) => (
          <div className='flex items-center w-[200px] justify-between break-keep'>
            <div>
              Transaction&nbsp;successful!&nbsp;
              <a
                href={`${chain?.blockExplorers?.default.url}/tx/${recordDailyWorkoutTxReceipt.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1 text-sm text-blue-500 hover:underline"
              >
                View&nbsp;transaction
              </a>
            </div>
            <button
              onClick={() => toast.dismiss(id)}
              className="ml-2 p-1 rounded-full hover:bg-gray-200"
            >
              <X size={16} />
            </button>
          </div>
        ),
        { duration: Infinity }
      )
      toggleStreak()
      setTxHash(recordDailyWorkoutTxReceipt.transactionHash)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  return (
    <div className=' w-full'>
      <Button onClick={() => handleRecordDailyWorkout()} disabled={disabled} isLoading={isLoading || isPending} className="w-full flex items-center justify-center bg-blue-600 h-12  hover:bg-blue-700 text-white">
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

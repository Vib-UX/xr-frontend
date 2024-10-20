import { FITNESS_ADDRESS_MAPPING, MUSD_ADDRESS_MAPPING } from '@/constants'

import { FITNESS_ABI } from '@/abi/FITNESS_ABI'
import useGlobalStore from '@/store'
import { MORPH_HOLESKY } from '@/utils/chains'
import Big from 'big.js'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { erc20Abi } from 'viem'
import { useAccount, usePublicClient, useReadContract, useWriteContract } from 'wagmi'
import Button from '../buttons/Button'

const StakeButtonWorkout = ({ onSuccess }: { onSuccess: () => void }) => {
  const { chain } = useAccount()
  const [txHash, setTxHash] = useState('')
  const { morphBiconomyAccount } = useGlobalStore()
  const publicClient = usePublicClient()
  const [isLoading, setIsLoading] = useState(false)
  const amount = Big(1).toString();
  const { address } = useAccount()
  const { writeContractAsync, isPending } = useWriteContract()
  const { data: allowance, isLoading: isLoadingAllowance } = useReadContract({
    address: MUSD_ADDRESS_MAPPING[chain?.id as keyof typeof MUSD_ADDRESS_MAPPING] as `0x${string}`,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address as `0x${string}`, FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`]
  })
  const { data: stakedAmount } = useReadContract({
    address: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`,
    abi: FITNESS_ABI,
    functionName: 'users',
    args: [address as `0x${string}`],
    query: {
      select(data) {
        return data[3]
      },
    }
  })
  const handleRecordDailyWorkout = async () => {
    try {
      setIsLoading(true)
      toast.loading('Transaction awaiting confirmation...')
      if (!publicClient) {
        throw new Error('Public client not found')
      }
      if (chain?.id === MORPH_HOLESKY.id && !morphBiconomyAccount) {
        throw new Error('Morph Holesky account not found')
      }
      if (chain?.id === MORPH_HOLESKY.id && morphBiconomyAccount) {

        return
      }
      if (allowance !== undefined && Big(allowance.toString()).lt(amount)) {
        const approvalTxHash = await writeContractAsync({
          address: MUSD_ADDRESS_MAPPING[chain?.id as keyof typeof MUSD_ADDRESS_MAPPING] as `0x${string}`,
          abi: erc20Abi,
          functionName: 'approve',
          args: [FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`, BigInt(amount)]
        })
        const approvalTxReceipt = await publicClient.waitForTransactionReceipt({
          hash: approvalTxHash
        })
        if (approvalTxReceipt.status !== 'success') {
          throw new Error('Approval transaction failed')
        }
        toast.dismiss()
        toast.loading('Staking tokens...')
      }
      if (!stakedAmount) {
        const stakeTokensTxHash = await writeContractAsync({
          address: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`,
          abi: FITNESS_ABI,
          functionName: 'stakeTokens',
          args: [BigInt(amount)]
        })
        const stakeTokensTxReceipt = await publicClient.waitForTransactionReceipt({
          hash: stakeTokensTxHash
        })
        setTxHash(stakeTokensTxReceipt.transactionHash)
        if (stakeTokensTxReceipt.status !== 'success') {
          throw new Error('Stake tokens transaction failed')
        }
        toast.dismiss()
        toast.success('Tokens staked successfully!')
        setIsLoading(false)
      } else {
        toast.dismiss()
        toast.success('Tokens already staked!')
        onSuccess()
      }
    } catch (error) {
      setIsLoading(false)
      toast.dismiss()
      throw new Error('Transaction failed!')
    }
  }
  return (
    <div className=' w-full'>
      {txHash ? <Button onClick={() => onSuccess()} isLoading={isLoadingAllowance || isPending} className="w-full flex items-center justify-center bg-blue-600 h-12  hover:bg-blue-700 text-white">
        Proceed to workout
      </Button> : <Button onClick={() => handleRecordDailyWorkout()} isLoading={isLoadingAllowance || isLoading || isPending} className="w-full flex items-center justify-center bg-blue-600 h-12  hover:bg-blue-700 text-white">
        Stake 15 usdc
      </Button>}
      {txHash && (
        <div className='flex items-center justify-end'>
          <a href={`${chain?.blockExplorers?.default.url}/tx/${txHash}`} target="_blank" className="text-sm text-gray-500 hover:underline text-end mt-2">View transaction</a>
        </div>
      )}
    </div>
  )
}

export default StakeButtonWorkout
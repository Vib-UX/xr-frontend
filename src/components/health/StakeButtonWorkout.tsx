import { FITNESS_ADDRESS_MAPPING, MUSD_ADDRESS_MAPPING } from '@/constants'

import { FITNESS_ABI } from '@/abi/FITNESS_ABI'
import useGlobalStore from '@/store'
import { MORPH_HOLESKY } from '@/utils/chains'
import { PaymasterMode } from '@biconomy/account'
import Big from 'big.js'
import { X } from 'lucide-react'; // Add this import for the close icon
import { useState } from 'react'
import toast from 'react-hot-toast'
import { encodeFunctionData, erc20Abi } from 'viem'
import { useAccount, usePublicClient, useReadContract, useWriteContract } from 'wagmi'
import Button from '../buttons/Button'

const StakeButtonWorkout = ({ onSuccess }: { onSuccess: () => void }) => {
  const { chain } = useAccount()
  const [txHash, setTxHash] = useState('')
  const { morphBiconomyAccount, morphBiconomyAccountAddress } = useGlobalStore()
  const publicClient = usePublicClient()
  const [isLoading, setIsLoading] = useState(false)
  const amount = Big(1).toString();
  const { address } = useAccount()
  const { writeContractAsync, isPending } = useWriteContract()
  const walletAddress = chain?.id === MORPH_HOLESKY.id ? morphBiconomyAccountAddress : address
  const { data: allowance, isLoading: isLoadingAllowance } = useReadContract({
    address: MUSD_ADDRESS_MAPPING[chain?.id as keyof typeof MUSD_ADDRESS_MAPPING] as `0x${string}`,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [walletAddress as `0x${string}`, FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`]
  })
  const { data: stakedAmount } = useReadContract({
    address: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`,
    abi: FITNESS_ABI,
    functionName: 'users',
    args: [walletAddress as `0x${string}`],
    query: {
      select(data) {
        return data[3]
      },
    }
  })
  console.log(stakedAmount, "stakedAmount");

  const handleRecordDailyWorkout = async () => {
    try {
      setIsLoading(true)
      toast.loading('Transaction awaiting confirmation...')
      if (!publicClient) {
        setIsLoading(false)
        throw new Error('Public client not found')
      }
      if (chain?.id === MORPH_HOLESKY.id && !morphBiconomyAccount) {
        throw new Error('Morph Holesky account not found')
      }
      if (chain?.id === MORPH_HOLESKY.id && morphBiconomyAccount) {
        const approveFuncData = encodeFunctionData({
          abi: erc20Abi,
          functionName: 'approve',
          args: [FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`, BigInt(amount)]
        })
        const stakeTokensFuncData = encodeFunctionData({
          abi: FITNESS_ABI,
          functionName: 'stakeTokens',
          args: [BigInt(amount)]
        })
        const approveTx = {
          to: MUSD_ADDRESS_MAPPING[chain?.id as keyof typeof MUSD_ADDRESS_MAPPING] as `0x${string}`,
          data: approveFuncData
        }
        const stakeTokensTx = {
          to: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`,
          data: stakeTokensFuncData
        }
        if (!stakedAmount) {
          const finalTx = [approveTx, stakeTokensTx]
          toast.dismiss()
          toast.loading('Sending bundle transaction...',)
          const bundleTransaction = await morphBiconomyAccount.sendTransaction(
            finalTx,
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
            setTxHash(userOpReceipt.receipt.transactionHash)
            setIsLoading(false)
            onSuccess()
          }
        } else {
          setIsLoading(false)
          toast.dismiss()
          toast.success('Tokens already staked!')
          onSuccess()
        }
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
        toast.success(
          ({ id }) => (
            <div className='flex items-center w-[200px] justify-between break-keep'>
              <div>
                Transaction&nbsp;successful!&nbsp;
                <a
                  href={`${chain?.blockExplorers?.default.url}/tx/${stakeTokensTxReceipt.transactionHash}`}
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
        onSuccess()
      } else {
        setIsLoading(false)
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
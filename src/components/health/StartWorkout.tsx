'use client';
import { FITNESS_ABI } from '@/abi/FITNESS_ABI';
import {
  FITNESS_ADDRESS_MAPPING
} from '@/constants';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type { ContractFunctionParameters } from 'viem';
import { useAccount } from 'wagmi';

export default function StartWorkoutButton({ onSuccess }: { onSuccess: () => void }) {
  const { chain } = useAccount();
  const contracts = [
    {
      address: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING],
      abi: FITNESS_ABI,
      functionName: 'recordDailyWorkout',
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
    onSuccess();
  };

  return (
    <Transaction
      contracts={contracts}
      chainId={chain?.id}
      onError={handleError}
      onSuccess={handleSuccess}
    >
      <TransactionButton className="w-full bg-blue-600 h-12 hover:bg-blue-700 text-white" text='Start Workout' />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
}

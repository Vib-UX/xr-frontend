'use client';
import { FITNESS_ABI } from '@/abi/FITNESS_ABI';
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
import {
  BASE_SEPOLIA_CHAIN_ID,
  FITNESS_ADDRESS
} from '../constants';

export default function RecordDailyWorkout() {
  const contracts = [
    {
      address: FITNESS_ADDRESS,
      abi: FITNESS_ABI,
      functionName: 'recordDailyWorkout',
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <Transaction
      contracts={contracts}
      chainId={BASE_SEPOLIA_CHAIN_ID}
      onError={handleError}
      onSuccess={handleSuccess}
    >
      <TransactionButton className="w-full bg-blue-600 h-12 hover:bg-blue-700 text-white" text='Complete your workout' />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
}

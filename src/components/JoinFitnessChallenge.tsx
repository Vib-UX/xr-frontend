'use client';
import { FITNESS_ABI } from '@/abi/FITNESS_ABI';
import { FITNESS_ADDRESS_MAPPING } from '@/constants';
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

export default function JoinFitnessChallenge({ text }:
  {
    text: string
  }
) {
  const { chain } = useAccount()
  const contracts = [
    {
      address: FITNESS_ADDRESS_MAPPING[chain?.id as keyof typeof FITNESS_ADDRESS_MAPPING] as `0x${string}`,
      abi: FITNESS_ABI,
      functionName: 'joinFitnessChallenge',
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <div className='flex items-center justify-end'>
      <Transaction
        contracts={contracts}
        chainId={chain?.id}
        onError={handleError}
        className='w-fit flex items-center justify-end '
        onSuccess={handleSuccess}
      >
        <TransactionButton className=" text-blue-600 font-semibold py-2 px-4 rounded-full  " text={text} />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}

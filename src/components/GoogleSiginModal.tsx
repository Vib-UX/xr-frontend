import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { signIn, useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, memo } from 'react';

import Button from '@/components/buttons/Button';
import { useMutation } from '@tanstack/react-query';


const GoogleLogo = () => (
  <svg width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
    <g fill='#000' fill-rule='evenodd'>
      <path
        d='M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.54C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02 1.02 4.96l2.98 2.3C4.6 4.41 6.62 3.48 9 3.48z'
        fill='#EA4335'
      ></path>
      <path
        d='M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.48h4.84c-.2 1.14-.84 2.1-1.8 2.74v2.26h2.92c1.71-1.58 2.68-3.91 2.68-6.64z'
        fill='#4285F4'
      ></path>
      <path
        d='M3.88 10.2c-.15-.43-.23-.9-.23-1.38s.08-.95.23-1.38l-2.98-2.3C.53 6.25 0 7.55 0 9s.53 2.75 1.45 3.72l2.98-2.3z'
        fill='#FBBC05'
      ></path>
      <path
        d='M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7l-2.98 2.3C2.44 15.98 5.48 18 9 18z'
        fill='#34A853'
      ></path>
      <path fill='none' d='M0 0h18v18H0z'></path>
    </g>
  </svg>
);

function GoogleSignIn({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => signIn("google")
  })
  function close() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as='div'
        style={{
          zIndex: 10000
        }}
        className='relative z-10 focus:outline-none'
        onClose={() => {
          return undefined
        }}
      >
        <div className='fixed inset-0 z-100 bg-black bg-opacity-80 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0 transform-[scale(95%)]'
              enterTo='opacity-100 transform-[scale(100%)]'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 transform-[scale(100%)]'
              leaveTo='opacity-0 transform-[scale(95%)]'
            >
              <DialogPanel className='w-full max-w-md rounded-xl bg-card_bg bg-white p-6 border border-[#CAC4D0]'>
                <DialogTitle
                  as='h3'
                  className='text-base/7 font-medium text-[#272C8A]'
                >
                  Complete user onboarding
                </DialogTitle>
                {!session ? <p className='mt-2 text-sm/6 text-[#272C8A]'>
                  Sign in with google to receive updates on subscriptions
                </p> : <p className='mt-2 text-sm/6 text-[#272C8A]'>
                  🎉Let's Mint Your Platform NFT! 🚀 Get Access Now! 🔑.
                </p>}
                <div className='h-[50px]'></div>
                <div className='mt-4 flex items-center justify-center'>
                  {!session ? (
                    <Button
                      disabled={isPending}
                      className='inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'
                      onClick={() => mutateAsync()}
                    >
                      <GoogleLogo />
                      {isPending ? "Signing..." : "Sign in with Google"}
                    </Button>
                  ) : (
                    <Button
                      // disabled={isLoading}
                      className='inline-flex disabled:cursor-not-allowed items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'
                    // onClick={() => onBoarding()}
                    >
                      {/* {isLoading ? "Onboarding..." : " Complete onboarding"} */}
                    </Button>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default memo(GoogleSignIn)
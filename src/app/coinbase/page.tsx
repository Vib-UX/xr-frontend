'use client';
import { NavbarComponent } from '@/components/Navbar';
import { useAccount } from 'wagmi';

export default function Page() {
  const { address } = useAccount();

  return (
    <div className="">
      <NavbarComponent />
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">

      </section>
    </div>
  );
}

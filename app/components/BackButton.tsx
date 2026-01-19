"use client";
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="font-bold text-blue-700 text-lg hover:underline bg-transparent border-none cursor-pointer p-0"
    >
      ← Back to Search
    </button>
  );
}

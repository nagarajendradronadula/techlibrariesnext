"use client";
import { useRouter } from "next/navigation";

interface ButtonProps {
    text: string;
    className?: string
}

export default function BackButton({text, className}: ButtonProps){
    const router = useRouter();
    
    return (
        <button
         type="button"
         onClick={() => router.back()}
         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ${className}`}>
            ⬅ {text}
        </button>
    )
}
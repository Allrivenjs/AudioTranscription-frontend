'use client'
import Link from "next/link";
import {useContext} from "react";
import {AudioPlayerContext} from "@/app/ui/AudioProvider";

export function CreateButton() {
    let player = useContext(AudioPlayerContext)
    return (
        <div className={`fixed right-12 ${ player?.playing || player?.transcription !== null ? 'bottom-36' : 'bottom-14'} `}>
            <Link
                className="bg-pink-600 hover:bg-pink-700 active:bg-pink-900 text-white font-bold py-2 px-4 border-b-4 border-pink-700  rounded animate-slide-out-top"
                href={'/dashboard/create'}>
                Nueva Transcripción
            </Link>
        </div>
    )
}
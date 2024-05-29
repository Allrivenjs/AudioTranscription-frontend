'use client'

import {TranscriptionEntry} from "@/app/dashboard/page";
import {getAllTranscription, Transcription} from "@/app/lib/episodes";
import {useEffect, useState} from "react";

export default  function ListTranscription() {
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
    useEffect(() => {
        getAllTranscription().then((transcriptions) => {
            console.log("trans:", transcriptions)
            setTranscriptions(transcriptions)
        })
    }, []);
    return (
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
            {transcriptions.map((transcription) => (
                <TranscriptionEntry key={transcription.ID} transcription={transcription}/>
            ))}
        </div>
    )
}
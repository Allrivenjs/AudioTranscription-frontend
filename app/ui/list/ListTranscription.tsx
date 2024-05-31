'use client'

import {TranscriptionEntry} from "@/app/dashboard/page";
import {getAllTranscription, Transcription} from "@/app/lib/episodes";
import {useEffect, useState} from "react";
import {socket} from "@/socket";
import { toast } from 'react-hot-toast';

export default  function ListTranscription() {
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);

    const fetchTranscriptions = () => {
        getAllTranscription().then((transcriptions) => {
            console.log("transcripciones", transcriptions)
            setTranscriptions(transcriptions)
        })
    }


    useEffect(() => {
        fetchTranscriptions();
    }, []);

    // socket
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    useEffect(() => {
        socket.on("transcription", (refresh: boolean) => {
            console.log("transcription", refresh);
            console.log("refrescando")
            fetchTranscriptions();
            toast.success('La transcripción ha sido actualizada.');
        });

        return () => {
            socket.off("transcription");
        };
    }, []);

    return (
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
            {transcriptions.map((transcription) => (
                <TranscriptionEntry key={transcription.ID} transcription={transcription}/>
            ))}
        </div>
    )
}
import {parse as parseFeed} from 'rss-to-json'
import {array, number, object, parse, string} from 'valibot'
import {ENDPOINT} from "@/app/lib/util";

export interface Transcription {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
    title: string
    user_id: number
    audio_url: string
    transcription: string
    sort_transcription: string
    published: Date
    audio: {
        src: string
    }
}


export async function getAllTranscription() {
    console.log(`endpoint: ${ENDPOINT}/transcription`, process.env)
    const feed = await fetch(`${ENDPOINT}/transcription`).then(res => res.json()) as {
        data: {
            transcriptions: Array<{
                ID: number
                title: string
                transcription: string
                sort_transcription: string
                audio_url: string
                CreatedAt: string
                DeletedAt: string
                UpdatedAt: string
                user_id: number
            }>
        }
    }
    let items = feed.data.transcriptions
    let transcriptions: Array<Transcription> = items.map(({ID, title, transcription, sort_transcription, audio_url, CreatedAt, DeletedAt, user_id, UpdatedAt}) => ({
        ID,
        title: `${ID}: ${title}`,
        published: new Date(CreatedAt),
        sort_transcription,
        transcription,
        audio_url: ENDPOINT + audio_url,
        audio: {
            src: ENDPOINT + audio_url,
        },
        CreatedAt,
        DeletedAt: DeletedAt,
        UpdatedAt,
        user_id,
    }),).sort((a, b) => b.published.getTime() - a.published.getTime())

    return transcriptions
}

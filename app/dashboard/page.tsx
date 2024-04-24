
import Link from 'next/link'

import { Container } from '@/app/ui/Container'
import { EpisodePlayButton } from '@/app/ui/EpisodePlayButton'
import { FormattedDate } from '@/app/ui/FormattedDate'
import { type Transcription, getAllTranscription } from '@/app/lib/episodes'
import {useContext} from "react";
import {AudioPlayerContext} from "@/app/ui/AudioProvider";
import {CreateButton} from "@/app/ui/CreateButton";

function PauseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
      />
    </svg>
  )
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
    </svg>
  )
}

function TranscriptionEntry({ transcription }: { transcription: Transcription }) {
  let date = new Date(transcription.published)
  return (
    <article
      aria-labelledby={`episode-${transcription.ID}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`transcription-${transcription.ID}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link key={transcription.title + transcription.ID} href={`./${transcription.ID}`}>{transcription.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <p className="mt-1 text-base leading-7 text-slate-700">
            {transcription.sort_transcription}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <EpisodePlayButton
                transcription={transcription}
              className="flex items-center gap-x-3 text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">Listen</span>
                </>
              }
            />
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`./${transcription.ID}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${transcription.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default async function Dashboard() {
  let transcriptions = await getAllTranscription()
  return (
    <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Conversaciones
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {transcriptions.map((transcription) => (
          <TranscriptionEntry key={transcription.ID} transcription={transcription} />
        ))}
      </div>
      <CreateButton/>
    </div>
  )
}

export const revalidate = 10
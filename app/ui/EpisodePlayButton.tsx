'use client'

import { useAudioPlayer } from '@/app/ui/AudioProvider'
import { type Transcription } from '@/app/lib/episodes'

export function EpisodePlayButton({
                                    transcription,
  playing,
  paused,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  transcription: Transcription
  playing: React.ReactNode
  paused: React.ReactNode
}) {
  let player = useAudioPlayer(transcription)

  return (
    <button
      type="button"
      onClick={() => player.toggle()}
      aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
          transcription.title
      }`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}

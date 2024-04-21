'use client'

import { useAudioPlayer } from '@/app/ui/AudioProvider'
import { type Episode } from '@/app/lib/episodes'

export function EpisodePlayButton({
  episode,
  playing,
  paused,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  episode: Episode
  playing: React.ReactNode
  paused: React.ReactNode
}) {
  let player = useAudioPlayer(episode)

  return (
    <button
      type="button"
      onClick={() => player.toggle()}
      aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
        episode.title
      }`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}

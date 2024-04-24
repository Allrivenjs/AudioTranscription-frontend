'use client'

import React, { createContext, useContext, useMemo, useReducer, useRef } from 'react'

import { type Transcription } from '@/app/lib/episodes'

interface PlayerState {
  playing: boolean
  muted: boolean
  duration: number
  currentTime: number
  transcription: Transcription | null
}

interface PublicPlayerActions {
  play: (transcription?: Transcription) => void
  pause: () => void
  toggle: (transcription?: Transcription) => void
  seekBy: (amount: number) => void
  seek: (time: number) => void
  playbackRate: (rate: number) => void
  toggleMute: () => void
  isPlaying: (transcription?: Transcription) => boolean
}

export type PlayerAPI = PlayerState & PublicPlayerActions

const enum ActionKind {
  SET_META = 'SET_META',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  TOGGLE_MUTE = 'TOGGLE_MUTE',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_DURATION = 'SET_DURATION',
}

type Action =
  | { type: ActionKind.SET_META; payload: Transcription }
  | { type: ActionKind.PLAY }
  | { type: ActionKind.PAUSE }
  | { type: ActionKind.TOGGLE_MUTE }
  | { type: ActionKind.SET_CURRENT_TIME; payload: number }
  | { type: ActionKind.SET_DURATION; payload: number }

export const AudioPlayerContext = createContext<PlayerAPI | null>(null)

function audioReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case ActionKind.SET_META:
      return { ...state, transcription: action.payload }
    case ActionKind.PLAY:
      return { ...state, playing: true }
    case ActionKind.PAUSE:
      return { ...state, playing: false }
    case ActionKind.TOGGLE_MUTE:
      return { ...state, muted: !state.muted }
    case ActionKind.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload }
    case ActionKind.SET_DURATION:
      return { ...state, duration: action.payload }
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  let [state, dispatch] = useReducer(audioReducer, {
    playing: false,
    muted: false,
    duration: 0,
    currentTime: 0,
    transcription: null,
  })
  let playerRef = useRef<React.ElementRef<'audio'>>(null)

  let actions = useMemo<PublicPlayerActions>(() => {
    return {
      play(transcription) {
        if (transcription) {
          dispatch({ type: ActionKind.SET_META, payload: transcription })
          if (
            playerRef.current &&
            playerRef.current.currentSrc !== transcription.audio.src
          ) {
            let playbackRate = playerRef.current.playbackRate
            playerRef.current.src = transcription.audio.src
            playerRef.current.load()
            playerRef.current.pause()
            playerRef.current.playbackRate = playbackRate
            playerRef.current.currentTime = 0
          }
        }

        playerRef.current?.play()
      },
      pause() {
        playerRef.current?.pause()
      },
      toggle(episode) {
        this.isPlaying(episode) ? actions.pause() : actions.play(episode)
      },
      seekBy(amount) {
        if (playerRef.current) {
          playerRef.current.currentTime += amount
        }
      },
      seek(time) {
        if (playerRef.current) {
          playerRef.current.currentTime = time
        }
      },
      playbackRate(rate) {
        if (playerRef.current) {
          playerRef.current.playbackRate = rate
        }
      },
      toggleMute() {
        dispatch({ type: ActionKind.TOGGLE_MUTE })
      },
      isPlaying(episode) {
        return episode
          ? state.playing && playerRef.current?.currentSrc === episode.audio.src
          : state.playing
      },
    }
  }, [state.playing])

  let api = useMemo<PlayerAPI>(
    () => ({ ...state, ...actions }),
    [state, actions],
  )

  return (
    <>
      <AudioPlayerContext.Provider value={api}>
        {children}
      </AudioPlayerContext.Provider>
      <audio
        ref={playerRef}
        onPlay={() => dispatch({ type: ActionKind.PLAY })}
        onPause={() => dispatch({ type: ActionKind.PAUSE })}
        onTimeUpdate={(event) => {
          dispatch({
            type: ActionKind.SET_CURRENT_TIME,
            payload: Math.floor(event.currentTarget.currentTime),
          })
        }}
        onDurationChange={(event) => {
          dispatch({
            type: ActionKind.SET_DURATION,
            payload: Math.floor(event.currentTarget.duration),
          })
        }}
        muted={state.muted}
      />
    </>
  )
}

export function useAudioPlayer(transcription?: Transcription) {
  let player = useContext(AudioPlayerContext)

  return useMemo<PlayerAPI>(
    () => ({
      ...player!,
      play() {
        player!.play(transcription)
      },
      toggle() {
        player!.toggle(transcription)
      },
      get playing() {
        return player!.isPlaying(transcription)
      },
    }),
    [player, transcription],
  )
}

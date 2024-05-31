import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AboutSection } from '@/app/ui/AboutSection'
import { AudioProvider } from '@/app/ui/AudioProvider'
import { AudioPlayer } from '@/app/ui/player/AudioPlayer'
import { TinyWaveFormIcon } from '@/app/ui/TinyWaveFormIcon'
import { Waveform } from '@/app/ui/Waveform'
import whisper from '@/public/icons/whisper.webp';
import go from '@/public/icons/Go-Logo_Black.svg';
import next from '@/public/icons/nextjs-icon-svgrepo-com.svg';
import cloudflare from '@/public/icons/cloudflare-icon.svg';

import posterImage from '@/public/logos/principal_logo_cp.jpg'
import '@/app/ui/tailwind.css'
import type {Metadata} from "next";

function WhisperLogo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <Image src={whisper} alt='whisper logo'
           width={32} height={32} />

  )
}

function GoLogo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
      <Image src={go} alt='go logo'
             style={{ width: 32, height: 'auto' }}
             width={32} height={32} />

  )
}

function NextLogo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
      <Image src={next} alt='next logo'
             width={32} height={32} />
  )
}

function CloudFlareLogo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
      <Image src={cloudflare} alt='cloudflare logo'
             width={32} height={32} />
  )
}

function PersonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s - Their Side',
    default:
        'Their Side - Conversations with the most tragically misunderstood people of our time',
  },
  description:
      'Conversations with the most tragically misunderstood people of our time.',

}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let hosts = ['Jaime Andres Ruiz']
  return (
    <AudioProvider>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120 pb-4">
        <div
            className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-900">
            {hosts.map((host, hostIndex) => (
                <Fragment key={host}>
                  {hostIndex !== 0 && (
                      <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                  )}
                  {host}
                </Fragment>
            ))}
          </span>
        </div>
        {/* Poster y text explicatorios */}
        <div
            className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:px-8 lg:py-12 xl:px-12">
          <Link
              href="/public"
              className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
              aria-label="Homepage"
          >
            <Image
                className="w-full"
                src={posterImage}
                alt=""
                sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
                priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl"/>
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/public">Las palabras a texto</Link>
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              KONverSAsjoNes ke se koNverTjen en paLaBRas eskritas {/*  La fonética humana convertida a caracteres escritos */}
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block"/>
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <TinyWaveFormIcon
                  colors={['fill-indigo-300', 'fill-blue-300']}
                  className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Basado en:</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden"/>
            <ul
                role="list"
                className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {(
                  [
                    ['Whisper', WhisperLogo],
                    ['Apple Podcast', GoLogo],
                    ['NextJS', NextLogo],
                    ['CloudFlare', CloudFlareLogo],
                  ] as const
              ).map(([label, Icon]) => (
                  <li key={label} className="flex">
                    <Link
                        href="/public"
                        className="group flex items-center"
                        aria-label={label}
                    >
                      <Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600"/>
                      <span className="hidden sm:ml-3 sm:block">{label}</span>
                    </Link>
                  </li>
              ))}
              {/*  Button sign out */}
              {/*<li>*/}
              {/*  <form*/}
              {/*      action={async () => {*/}
              {/*        'use server';*/}
              {/*        await signOut();*/}
              {/*      }}*/}
              {/*  >*/}
              {/*    <button*/}
              {/*        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">*/}
              {/*      <PowerIcon className="w-6"/>*/}
              {/*      <div className="hidden md:block">Sign Out</div>*/}
              {/*    </button>*/}
              {/*  </form>*/}
              {/*</li>*/}
            </ul>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform className="absolute left-0 top-0 h-20 w-full"/>
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection/>
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
            <PersonIcon className="h-3 w-auto fill-slate-300" />
            <span className="ml-2.5">Hosted by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>
    </AudioProvider>
  )
}

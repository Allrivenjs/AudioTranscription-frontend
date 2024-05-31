'use client'

import {MusicalNoteIcon} from '@heroicons/react/24/solid'
import {useEffect, useState} from "react";
import {formCreateAction} from "@/app/lib/actions";
import {verifyExtension} from "@/app/lib/util";
import {useFormState} from "react-dom";

const initialState = {
    errors: {
        title: [],
        audio: []
    },
    message: ''
}


export default function Form( ) {
    const [state, dispatch] = useFormState(formCreateAction, initialState)
    const [audio, setAudio] = useState<File>();
    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(e.target.files!)
        setAudio(files[0])
    }

    return (
        <div className="space-y-10 divide-y divide-gray-900/10 px-10 pt-10 h-full">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Datos requeridos.</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Para poder obtener una transcripción de tu conversación, necesitamos que nos proporciones
                        información básica. <br/>
                        En el siguiente formulario, por favor, llena los campos requeridos.
                        Recuerda que el archivo de audio debe ser de formato .wav, de otro formato no sera posible
                        realizar la transcripción.
                    </p>
                </div>

                <form action={dispatch} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                    Titulo de la conversación *
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Transcripción de la conversacion..."
                                            aria-describedby="title-error"
                                        />
                                    </div>
                                </div>
                                <div id="title-error" aria-live="polite" aria-atomic="true">
                                    {
                                        state.errors?.title && state.errors.title.map((error, index) => (
                                            <p key={index + error} className="mt-2 text-sm text-red-500">{error}</p>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Archivo de audio *
                                </label>
                                <div
                                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <MusicalNoteIcon className="mx-auto h-12 w-12 text-gray-300"
                                                         aria-hidden="true"/>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="audio"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input onChange={handleFileSelected} id="audio" name="audio" type="file"
                                                       className="sr-only"  aria-describedby="audio-error"/>
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">.WAV</p>
                                    </div>
                                </div>
                                <div id="audio-error" aria-live="polite" aria-atomic="true">
                                    {
                                        state.errors?.audio && state.errors.audio.map((error, index) => (
                                            <p key={index + error} className="mt-2 text-sm text-red-500">{error}</p>
                                        ))
                                    }
                                </div>
                                {
                                    audio && !verifyExtension(audio) && (
                                        <div className="mt-2 text-sm leading-6 text-red-600">
                                            El archivo seleccionado no es de formato .wav
                                        </div>
                                    )
                                }

                                {
                                    audio && verifyExtension(audio) && (
                                        <div className="flex flex-col mt-4">
                                            <div>
                                                <label className="text-sm font-semibold">Archivo selecionado: </label>
                                                <span>{audio?.name}</span>
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold">Extension: </label>
                                                <span> .{audio?.name.split('.').pop()}</span>
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold">Tamaño: </label>
                                                <span>{audio?.size} bytes</span>
                                            </div>
                                        </div>
                                    )
                                }


                            </div>

                        </div>
                    </div>
                    <div
                        className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-pink-600 hover:bg-pink-700 active:bg-pink-900 px-3 py-1 text-sm font-semibold text-white shadow-sm  border-b-4 border-pink-700"
                        >
                            Transcribir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
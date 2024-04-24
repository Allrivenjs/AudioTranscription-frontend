import {MusicalNoteIcon} from '@heroicons/react/24/solid'

export default function Form( ) {
    return (
        <div className="space-y-10 divide-y divide-gray-900/10 px-10 pt-10">
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

                <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                    Titulo de la conversación
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="website"
                                            id="website"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Transcripción de la conversacion..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover audio
                                </label>
                                <div
                                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <MusicalNoteIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file"
                                                       className="sr-only"/>
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">.WAV</p>
                                    </div>
                                </div>
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
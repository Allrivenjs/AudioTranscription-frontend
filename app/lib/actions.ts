'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import {z} from "zod";
import {ENDPOINT, verifyExtension} from "@/app/lib/util";
import {revalidate} from "@/app/dashboard/page";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {toast} from "react-hot-toast";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


const CreateTranscriptionSchema = z.object({
    title: z.string().refine((title) => title.length > 0, "Title es requerido"),
    audio: z.instanceof(File, {message: "Audio es requerido"}).refine((audio) => verifyExtension(audio), "Invalid file extension"),
});

export type State = {
    errors?: {
        title?: string[];
        audio?: string[];
    };
    message?: string;
}

export async function formCreateAction(
    prevState: State,
    formData: FormData
) {

    const validateFields = CreateTranscriptionSchema.safeParse({
        title: formData.get('title'),
        audio: formData.get('audio'),
    });

    if (!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Parametros invalidos. Error al crear la transcripción'
        };
    }

    const response = await fetch(`${ENDPOINT}/transcription`, {
        method: 'POST',
        body: formData,
    }).then(res => res.json());


    revalidatePath('/dashboard');
    redirect('/dashboard');

}


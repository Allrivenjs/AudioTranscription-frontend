export const verifyExtension = (file: File): boolean => {
    return file.name.split('.').pop() === 'wav'
}

// create endpoint from env variables
export const ENDPOINT = process.env.ENDPOINT_BACKEND
const defaultErrors: { [key: string]: string } = {
    'P2002': 'A unique constraint violation occurred',
    'P2025': 'The record you are trying to update does not exist',
}

export default function errorHandler(error: any): Error {
    if ((error as any)?.code && defaultErrors[(error as any)?.code]) {
        throw new Error(defaultErrors[(error as any)?.code])
    } else {
        throw new Error('An unexpected error occurred. Please try again.')
    }
}
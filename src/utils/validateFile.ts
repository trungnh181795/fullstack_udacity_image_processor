import { messages } from '../constants'
import { ImageQuery, ProcessResponse, Status } from '../types'
import { getImageNames, isImageValid } from './fileExecutors'

export const validateFile = async ({
    filename,
    width,
    height
}: ImageQuery): Promise<ProcessResponse> => {
    console.log('filename', filename)
    const isValidImage = await isImageValid(filename)

    if (!isValidImage) {
        const validImageNames = await getImageNames()
        return {
            status: Status.FAIL,
            message: `${messages.noValidFile}: ${validImageNames.join(', ')}.`
        }
    }

    if (!width && !height) {
        return {
            status: Status.FAIL,
            message: messages.missingWidthAndHeight
        }
    }

    const inputWidth: number = parseInt(width || '')
    if (Number.isNaN(inputWidth) || inputWidth < 1) {
        return {
            status: Status.FAIL,
            message: messages.invalidWidth
        }
    }

    const inputHeight: number = parseInt(height || '')
    if (Number.isNaN(inputHeight) || inputHeight < 1) {
        return {
            status: Status.FAIL,
            message: messages.invalidHeight
        }
    }

    return {
        status: Status.SUCCESS,
        message: messages.validateSuccess
    }
}

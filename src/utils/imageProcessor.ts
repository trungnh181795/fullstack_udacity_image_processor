import * as sharp from 'sharp'
import { ProcessImageParams, ProcessResponse, Status } from '../types'
import { messages } from '../constants'

export const processImage = async ({
    src,
    width,
    height,
    target
}: ProcessImageParams): Promise<ProcessResponse> => {
    try {
        await sharp(src).resize(width, height).toFormat('png').toFile(target)
        return {
            status: Status.SUCCESS,
            message: messages.processImageSuccess
        }
    } catch (error) {
        return {
            status: Status.FAIL,
            message: messages.processImageError
        }
    }
}

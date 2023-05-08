import * as express from 'express'
import {
    createScaledImage,
    getImagePath,
    isScaledImageAvailable,
    validateFile
} from '../utils'
import { messages } from '../constants'
import { ProcessResponse, Status } from '../types'

const imagesRoutes: express.Router = express.Router()

imagesRoutes.get(
    '/',
    async (
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        const validateRes = await validateFile(request.query)

        if (validateRes.status === Status.FAIL) {
            response.send(validateRes.message)
            return
        }
        
        const hasAvailableScaledImage = await isScaledImageAvailable(
            request.query
        )
        
        if (!hasAvailableScaledImage) {
           await createScaledImage(request.query)
        }

        const path: null | string = await getImagePath(request.query)
        if (path) {
            response.sendFile(path)
        } else {
            response.send(messages.invalidPath)
        }
    }
)

export default imagesRoutes

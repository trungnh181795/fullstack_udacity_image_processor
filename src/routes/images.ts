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
        
        console.log('got here')

        const hasAvailableScaledImage = await isScaledImageAvailable(
            request.query
        )
        let createRes: ProcessResponse
        
        console.log('got here 1')

        if (!hasAvailableScaledImage) {
            createRes = await createScaledImage(request.query)
        }

        if (createRes.status === Status.FAIL) {
            response.send(createRes.message)
            return
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

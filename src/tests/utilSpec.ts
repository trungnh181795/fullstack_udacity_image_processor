import { promises as fs } from 'fs'
import * as path from 'path'
import {
    isImageValid,
    isScaledImageAvailable,
    processImage,
    getImageNames,
    getImagePath,
    createScaledImage,
    createScaledImagePath,
    validateFile,
    fullImagesPath,
    scaledImagesPath
} from '../utils'
import { Status } from '../types'

describe('Test image processing via sharp', (): void => {
    it('raises an error (invalid width value)', async (): Promise<void> => {
        const { status } = await createScaledImage({
            filename: 'foo',
            width: '-100',
            height: '500'
        })
        expect(status).toBe(Status.FAIL)
    })

    it('raises an error (filename does not exist)', async (): Promise<void> => {
        const { status } = await createScaledImage({
            filename: 'foo',
            width: '100',
            height: '500'
        })
        expect(status).toBe(Status.SUCCESS)
    })

    it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
        await createScaledImage({
            filename: 'fjord',
            width: '99',
            height: '99'
        })

        const resizedImagePath: string = path.resolve(
            scaledImagesPath,
            `fjord-99x99.jpg`
        )
        let errorFile: null | string = ''

        try {
            await fs.access(resizedImagePath)
            errorFile = null
        } catch {
            errorFile = 'File was not created'
        }

        expect(errorFile).toBeNull()
    })
})

afterAll(async (): Promise<void> => {
    const resizedImagePath: string = path.resolve(
        scaledImagesPath,
        'fjord-99x99.jpg'
    )

    await fs.access(resizedImagePath)
    fs.unlink(resizedImagePath)
})

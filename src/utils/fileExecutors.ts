import { promises as fs } from 'fs'
import * as path from 'path'
import { processImage } from './imageProcessor'
import { messages } from '../constants'
import { ImageQuery, ProcessResponse, Status } from '../types'

export const fullImagesPath = path.resolve(__dirname, '../assets/full')
export const scaledImagesPath = path.resolve(__dirname, '../assets/scaled')

export const getImageNames = async (): Promise<string[]> => {
    try {
        const imagefilenames = await fs.readdir(fullImagesPath)
        const imageNames = imagefilenames.map(
            filename => filename.split('.')[0]
        )

        return imageNames
    } catch (err) {
        return []
    }
}

export const getImagePath = async ({
    filename,
    width,
    height
}: ImageQuery): Promise<null | string> => {
    if (!filename) {
        return null
    }

    try {
        const filePath: string =
            width && height
                ? path.resolve(
                      scaledImagesPath,
                      `${filename}_${width}x${height}.png`
                  )
                : path.resolve(fullImagesPath, `${filename}.jpg`)

        await fs.access(filePath)
        return filePath
    } catch (err) {
        return null
    }
}

export const isImageValid = async (
    filename: string = ''
): Promise<boolean> => {
    if (!filename) {
        return false
    }

    const imageNames = await getImageNames()

    return imageNames.includes(filename)
}

export const isScaledImageAvailable = async ({
    filename,
    width,
    height
}: ImageQuery): Promise<boolean> => {
    if (!filename || !width || !height) {
        return false
    }

    try {
        const filePath: string = path.resolve(
            scaledImagesPath,
            `${filename}_${width}x${height}.png`
        )

        await fs.access(filePath)
        return true
    } catch (err) {
        return false
    }
}

export const createScaledImagePath = async (): Promise<void> => {
    try {
        await fs.access(scaledImagesPath)
    } catch {
        fs.mkdir(scaledImagesPath)
    }
}

export const createScaledImage = async (
    { filename, width, height }: ImageQuery
): Promise<ProcessResponse> => {
    if (!filename || !width || !height) {
        return {
            status: Status.FAIL,
            message: messages.invalidParams
        }
    }

    const fullImagePath: string = path.resolve(
        fullImagesPath,
        `${filename}.jpg`
    )
    const scaledImagePath: string = path.resolve(
        scaledImagesPath,
        `${filename}_${width}x${height}.png`
    )

    console.log(`${messages.creatingScaledImage}: ${scaledImagePath}`)

    return await processImage({
        src: fullImagePath,
        target: scaledImagePath,
        width: parseInt(width),
        height: parseInt(height)
    })
}

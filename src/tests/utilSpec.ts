import { promises as fs } from 'fs'
import 'jasmine'
import * as path from 'path'
import { createScaledImage, scaledImagesPath } from '../utils'
import { Status } from '../types'

const inputTestFileName = {
    valid: 'fjord',
    invalid: 'test'
}
const testResolution = {
    valid: {
        width: '200',
        height: '199'
    },
    invalid: {
        width: '-200',
        height: '0'
    }
}

const getResultFileName = (testFileName: string, width: string | number, height: string | number) =>
    `${testFileName}_${width}x${height}.png`

describe('Test image processing via sharp', (): void => {
    it('raises an error (invalid width value)', async (): Promise<void> => {
        const { status } = await createScaledImage({
            filename: inputTestFileName.valid,
            ...testResolution.invalid
        })
        expect(status).toBe(Status.FAIL)
    })

    it('raises an error (filename does not exist)', async (): Promise<void> => {
        const { status } = await createScaledImage({
            filename: inputTestFileName.valid,
            ...testResolution.valid
        })
        expect(status).toBe(Status.SUCCESS)
    })

    it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
        await createScaledImage({
            filename: inputTestFileName.valid,
            ...testResolution.valid
        })

        const resultTestFileName = getResultFileName(
            inputTestFileName.valid,
            testResolution.valid.width,
            testResolution.valid.height
        )

        const scaledImagePath: string = path.resolve(
            scaledImagesPath,
            resultTestFileName
        )
        let error: Status

        try {
            await fs.access(scaledImagePath)
            error = Status.SUCCESS
        } catch {
            error = Status.FAIL
        }

        expect(error).toBe(Status.SUCCESS)
    })
})

afterAll(async (): Promise<void> => {
    const resultTestFileName = getResultFileName(
        inputTestFileName.valid,
        testResolution.valid.width,
        testResolution.valid.height
    )
    const scaledImagePath: string = path.resolve(
        scaledImagesPath,
        resultTestFileName
    )

    await fs.access(scaledImagePath)
    fs.unlink(scaledImagePath)
})

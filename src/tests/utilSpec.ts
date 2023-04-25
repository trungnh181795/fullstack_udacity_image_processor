import { promises as fs } from 'fs'
import 'jasmine'
import * as path from 'path'
import {
    createScaledImage,
    scaledImagesPath,
    isScaledImageAvailable
} from '../utils'
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

const getResultFileName = (
    testFileName: string,
    width: string | number,
    height: string | number
) => `${testFileName}_${width}x${height}.png`

describe('Test image processing via sharp', (): void => {
    describe('when input is a valid image', (): void => {
        it('create scaled image successfully', async (): Promise<void> => {
            const { status } = await createScaledImage({
                filename: inputTestFileName.valid,
                ...testResolution.valid
            })
            expect(status).toBe(Status.SUCCESS)
        })

        it('rewrited existing image', async (): Promise<void> => {
            await createScaledImage({
                filename: inputTestFileName.valid,
                ...testResolution.valid
            })

            const isImageExisted = await isScaledImageAvailable({
                filename: inputTestFileName.valid,
                width: testResolution.valid.width,
                height: testResolution.valid.height
            })

            expect(isImageExisted).toBe(true)
        })
    })

    describe('when input is invalid', (): void => {
        it('failed to create scaled image', async (): Promise<void> => {
            const { status } = await createScaledImage({
                filename: inputTestFileName.invalid,
                ...testResolution.invalid
            })
            expect(status).toBe(Status.FAIL)
        })
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

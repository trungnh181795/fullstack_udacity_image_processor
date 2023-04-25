import * as supertest from 'supertest'
import app from '../index'
import 'jasmine'
import { promises as fs } from 'fs'
import * as path from 'path'
import { scaledImagesPath } from '../utils'

const request: supertest.SuperTest<supertest.Test> = supertest(app)
const inputTestFileName = {
    valid: 'fjord',
    invalid: 'test'
}
const testResolution = {
    valid: {
        width: 199,
        height: 199
    },
    invalid: {
        width: -200,
        height: 0
    }
}

const testResizeQueryParameters = {
    valid: `filename=${inputTestFileName}&width=${testResolution.valid.width}&height=${testResolution.valid.height}`,
    invalid: `filename=${inputTestFileName}&width=${testResolution.invalid.width}&height=${testResolution.invalid.height}`
}
const testInvalidEndpoint = 'test'
const getResultFileName = (
    testFileName: string,
    width: string | number,
    height: string | number
) => `${testFileName}_${width}x${height}.png`

describe('Endpoints test reponses: ', (): void => {
    describe('endpoint: /', (): void => {
        it('gets /', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/')

            expect(response.status).toBe(200)
        })
    })

    describe('endpoint: /api/images', (): void => {
        it(`gets /api/images?filename=${inputTestFileName} (valid args)`, async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `/api/images?filename=${inputTestFileName}`
            )

            expect(response.status).toBe(200)
        })

        it(`gets /api/images?${testResizeQueryParameters.valid} (valid args)`, async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `/api/images?${testResizeQueryParameters.valid}`
            )

            expect(response.status).toBe(200)
        })

        it(`gets /api/images?${testResizeQueryParameters.invalid} (invalid args)`, async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `/api/images?${testResizeQueryParameters.invalid}`
            )

            expect(response.status).toBe(200)
        })

        it('gets /api/images (no arguments)', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                '/api/images'
            )

            expect(response.status).toBe(200)
        })
    })

    describe(`endpoint: /${testInvalidEndpoint}`, (): void => {
        it('returns 404 for invalid endpoint', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `/${testInvalidEndpoint}`
            )

            expect(response.status).toBe(404)
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

    try {
        await fs.access(scaledImagePath)
        fs.unlink(scaledImagePath)
    } catch {
        console.log('File cleaned up already!')
    }
})

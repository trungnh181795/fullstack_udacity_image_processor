export interface ImageQuery {
    filename?: string
    width?: string
    height?: string
}

export interface ProcessImageParams {
    src: string
    target: string
    width: number
    height: number
}

export enum Status {
    FAIL = 'false',
    SUCCESS = 'true',
}

export type ProcessResponse = {
    status: Status
    message: string
}

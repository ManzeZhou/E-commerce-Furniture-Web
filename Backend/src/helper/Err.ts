
export enum HttpCode {
    E200 = 200,
    E201 = 201,
    E400 = 400,
    E404 = 404,
}

export enum ErrStr {
    OK = '',

    ErrNoObj = 'Can not find specific record',
    ErrStore = 'Failed to store data',

    ErrMissingParameter = 'Missing parameter'
}

export class Err {
    data: any
    code: number
    msg: string

    constructor(code: HttpCode = HttpCode.E200,
                msg: string = ErrStr.OK,
                data = null) {
        this.data = data
        this.code = code
        this.msg = msg
    }
}
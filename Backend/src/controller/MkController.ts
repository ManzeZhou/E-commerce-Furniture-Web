
export interface IdCheckRes {
    item: any,
}
export class MkController {
    public static async checkIdExits (id: number, repo: any): Promise<IdCheckRes> {
        let item = null
        let res: IdCheckRes = {item}

        try {
            let entity = await repo.findOneOrFail(id)
            res.item = entity
        } catch (e) {
            console.log(e)
            return res
        }

        return res
    }
}
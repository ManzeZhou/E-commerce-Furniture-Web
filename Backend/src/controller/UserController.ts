import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {User} from "../entity/User";


// 任何controller都包括crud，增删改查
export class UserController {

    public static get repo() {
        return getRepository(User)
    }


    static async all(request: Request, response: Response, next: NextFunction) {
        let users = []
        try {
            users = await UserController.repo.find()
        } catch (e) {
            console.log('error, write to db', e)
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, users))
    }


    static async one(request: Request, response: Response, next: NextFunction) {
        const {userId} = request.params
        if (!userId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let user = null
        try {
            user = await UserController.repo.findOneOrFail(userId)
        } catch (e) {
            console.log('error, write to db', e)
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, user))
    }


    static async create(request: Request, response: Response, next: NextFunction) {
        let {fullName, email, phoneNumber, address, city, province, country, postalCode} = request.body
        let user = new User()
        user.email = email
        user.fullName = fullName
        user.phoneNumber = phoneNumber
        user.address = address
        user.city = city
        user.province = province
        user.country = country
        user.postalCode = postalCode

        try {
            const errors = await validate(user)
            if (errors.length > 0) {
                let err = new Err(HttpCode.E400, ErrStr.ErrMissingParameter, errors)
                return response.status(400).send(err)
            }

            // save the data to db
            await UserController.repo.save(user)

        } catch (e) {
            console.log('error, write to db', e)
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, user))


    }


    static async delete(request: Request, response: Response, next: NextFunction) {
    }


    static async update(request: Request, response: Response, next: NextFunction) {

    }

}
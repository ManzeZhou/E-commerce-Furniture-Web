import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {PaymentType} from "../entity/PaymentType";

// 任何controller都包括crud，增删改查
export class PaymentTypeController {
    public static get repo() {
        return getRepository(PaymentType)
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let paymentType = []
        try {
            paymentType = await PaymentTypeController.repo.find()
        } catch (e) {
            console.log('error, write to db', e)
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, paymentType))
    }


    static async one(request: Request, response: Response, next: NextFunction) {
        return response.send('get one PaymentType')
    }


    static async create(request: Request, response: Response, next: NextFunction) {

        let paymentType = new PaymentType()

        try {
            const errors = await validate(paymentType);
            if (errors.length > 0) {
                let err = new Err(HttpCode.E400, ErrStr.ErrMissingParameter)
                return response.status(400).send(err)
            }

            //save data to DB
            await PaymentTypeController.repo.save(paymentType)
        } catch (e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, paymentType))
    }


    static async delete(request: Request, response: Response, next: NextFunction) {
    }


    static async update(request: Request, response: Response, next: NextFunction) {

    }

}
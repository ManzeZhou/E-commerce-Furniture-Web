import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {PaymentStatus} from "../entity/PaymentStatus";

// 任何controller都包括crud，增删改查
export class PaymentStatusController {

    public static get repo() {
        return getRepository(PaymentStatus)
    }


    static async all(request: Request, response: Response, next: NextFunction) {
        let orderStatus = []
        try {
            orderStatus = await PaymentStatusController.repo.find()
        } catch (e) {
            console.log('error, write to db', e)
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, orderStatus))
    }


    static async one(request: Request, response: Response, next: NextFunction) {
        const {paymentId} = request.params
        if(!paymentId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }
        let order = null
        try {
            order = await PaymentStatusController.repo.findOneOrFail(paymentId)
        } catch (e) {
            console.log('error, write to db', e)
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, order))       }


    static async create(request: Request, response: Response, next: NextFunction) {
        let paymentStatus = new PaymentStatus()

        try {
            const errors = await validate(paymentStatus);
            if (errors.length > 0) {
                let err = new Err(HttpCode.E400, ErrStr.ErrMissingParameter)
                return response.status(400).send(err)
            }

            //save data to DB
            await PaymentStatusController.repo.save(paymentStatus)
        } catch (e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, paymentStatus))

    }


    static async delete(request: Request, response: Response, next: NextFunction) {
        const { paymentStatusId } = request.params;
        if (!paymentStatusId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        }


        let paymentStatus = null;
        try {
            paymentStatus = await PaymentStatusController.repo.findOneOrFail(paymentStatusId);
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }

        try {
            await PaymentStatusController.repo.delete(paymentStatusId);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));

    }


    static async update(request: Request, response: Response, next: NextFunction) {

    }

}
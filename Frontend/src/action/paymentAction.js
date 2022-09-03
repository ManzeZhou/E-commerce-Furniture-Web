import {PAYMENT_SUCCESS, ORDER_POST_SUCCESS} from "../helper";

export const PaymentSuccess = () => {
    console.log(`[action] PAYMENT_SUCCESS`, true)
    return {
        type: PAYMENT_SUCCESS,
        payload: true
    }
}

export const CreateOrder = (order) => dispatch => {


}

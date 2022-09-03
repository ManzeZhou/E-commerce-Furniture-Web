import {PAYMENT_SUCCESS} from "../helper";


const initState = {
    paymentSuccess: false
}

export const paymentReducer = (state=initState, action) => {
    switch (action.type) {
        case PAYMENT_SUCCESS:
            return {...state, paymentSuccess: action?.payload}
        default:
            return state
    }
}
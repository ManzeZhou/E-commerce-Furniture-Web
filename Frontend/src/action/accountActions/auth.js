import {
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    SIGN_IN_FAIL, SET_MESSAGE, PAYMENT_SUCCESS,
} from "../../helper";
import authService from "../../services/auth.service";

export const login = (email, password) =>(dispatch) => {
    return authService.login(email,password).then(
        (data) => {
            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: {user:data},
            })
            return Promise.resolve()
    },
    (err) => {
            const message = (err.res && err.res.data && err.res.data.message) ||
                err.message || err.toString()
        dispatch({
            type: SIGN_IN_FAIL,
        })
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        })
        return Promise.reject()
    }
    )
}

export const logout = () => (dispatch) => {
    authService.logout()
    dispatch({
        type : SIGN_OUT
    })
}

const PaymentSuccess = () => {
    console.log(`[action] PAYMENT_SUCCESS`, true)
    return {
        type: PAYMENT_SUCCESS,
        payload: true
    }
}



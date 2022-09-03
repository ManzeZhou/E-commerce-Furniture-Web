import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_OUT
} from "../../helper";

const initialState = {
    isLoggedIn: false,
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state, isLoggedIn: true,
            }
        case SIGN_IN_FAIL:
            return {
                ...state, isLoggedIn: false,
            }
        case SIGN_OUT:
            return {
                ...state, isLoggedIn: false,
            }
        default:
            return state
    }
}

import {FETCH_ALL_PIC, FETCH_ALL_PRODUCT, FETCH_PRO_ID} from "../helper";

const initState = {

    data: [],
    cartList: [],
    productId: 0,
    imgUrl: []
}

export const productReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCT:
            return {...state, data: action?.payload}
        case FETCH_PRO_ID:
            return {...state, productId: action?.payload}
        case FETCH_ALL_PIC:
            return {...state, imgUrl: action?.payload}
        default:
            return state
    }
}
import {FETCH_ITEM_QTY, FETCH_TOTAL_PRICE} from "../helper";

const ItemQtyInitState= {
    productItemQty: '1',
    productTotalPrice: 0,
    productPrice: 0,
    productName: '',

}

export const ItemQtyReducer = (state = ItemQtyInitState, action) => {

    switch(action?.type){
        case FETCH_ITEM_QTY:
            return{...state, productItemQty: action?.payload}
        case FETCH_TOTAL_PRICE:
            return {...state, productTotalPrice: action?.payload}
        default:
            return state
    }
}


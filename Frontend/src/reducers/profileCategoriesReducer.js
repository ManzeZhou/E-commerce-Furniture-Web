import {FETCH_CATEGORIES_ARRAY} from "../helper";


const  profileCategoriesInitState = {
    profileArray:[]

}

export const profileCategoriesReducer = (state = profileCategoriesInitState, action) => {

    switch (action.type) {
        case FETCH_CATEGORIES_ARRAY:
            return{...state, profileArray: action?.payload}
        default:
            return state
    }
}
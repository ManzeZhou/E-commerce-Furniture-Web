import axios from 'axios';
import {SIGN_IN_SUCCESS, SIGN_IN_FAIL} from "../helper";

const API_URL = "http://api-ecommerce.mark2win.com/auth/login"

const login = (email, password) => {

    return axios.post(API_URL, {
            email,
            password,
        })
        .then((res) => {
         if(res.data) {
             localStorage.setItem('TOKEN', res.data.data.token)
         }
         // localStorage.setItem('TOKEN', res.data.data.token)
         return res.data
    })
        .catch((e => ({type: SIGN_IN_FAIL, payload: e.response.data, error: true})))
}

// const logout = () => {
//     localStorage.removeItem("user")
// }

export default {
    login,
    // logout
}
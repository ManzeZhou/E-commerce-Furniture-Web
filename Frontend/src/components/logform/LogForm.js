import React, {useEffect, useState} from 'react';

import {Signup} from "./Signup";
import "./LogForm.scss";
import {Login} from "./Login";

import {useSelector} from "react-redux";
import {TOKEN} from "../../helper";
import {useNavigate} from "react-router-dom";



const LogForm = () => {
    const [token, setToken] = useState(false)
    const tokenStatus = useSelector(state=>state.authReducer.isLoggedIn)

    const logOut = () => {
        localStorage.removeItem(TOKEN)
        setToken(false)
    }

    useEffect(()=>{
        if (localStorage.getItem(TOKEN)) {
            setToken(true)
        }
    },[])

    useEffect(()=>{
        if(tokenStatus && tokenStatus !== ""){
            setToken(true)
        }
    },[tokenStatus])

    const navigate = useNavigate()



    return (
              ! token ? <div className="log-container">
                <div className="log-wrapper">
                    <div className='breadcrumb-nav'>
                        <div className='office-icon'>
                            <a href='/'>Office  </a>
                        </div>
                        <div className='office-icon'>
                            <a href='/account'>Sign in </a>
                        </div>
                    </div>
                    <h1>Sign In or Register</h1>
                    <div className="log-link">
                        <a>Track Your Order</a>
                    </div>
                    <div className="col-container">
                        <Login/>
                        <Signup/>
                    </div>
                </div>
            </div>
            :
            <div className="log-out-wrapper">
                <h2>Thank you for choosing Herman Miller</h2>
                <div className="btn_wrapper">
                    <div className="btn_Return_Home">
                        <button onClick={() => {navigate(-1)}}>go back</button>
                    </div>
                    <div className="btn_Return_Home">
                        <button onClick={logOut}>Sign Out</button>
                    </div>

                </div>

            </div>


    );

}

export default LogForm
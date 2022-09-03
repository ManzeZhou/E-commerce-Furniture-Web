import {useSelector} from "react-redux";
import {useState} from "react";


const CheckOutBtn = () => {
    const isLoggedIn = useSelector(state => state?.authReducer?.isLoggedIn)
    const [checkout, setCheckout] = useState(true)


    return(
        <>
        <div className="checkoutBtn">
            <button></button>
        </div>
        </>
    )
}

import NavBar from "../navBar/NavBar";
import './OrderConfirm.scss'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {useNavigate} from "react-router-dom";
import {TOKEN} from "../../helper";
import React, { useRef } from 'react';

export const OrderConfirm = React.forwardRef((props, ref) => {


    const addressData = JSON.parse(localStorage.getItem('addressInfo'));
    const cartItems = JSON.parse(localStorage.getItem('cartArr'));
    let token = localStorage.getItem(TOKEN)

    let totalQuantity = 0
    for (let i = 0; i < cartItems.length; i++) {
        totalQuantity += parseInt(cartItems[i].currentItemQty)
    }
    let priceArray = []

    // // const navigate = useNavigate()
    // const [checked, setChecked] = useState(true)
    // const [yourCart, setYourCart] = useState(false)

    cartItems.map((s, index) => {
        // priceArray[index] = s.totalPrice
        priceArray.push(s.totalPrice)
    })
    const sumPriceArray = priceArray.reduce(
        (prev, curr) => prev + curr, 0
    )

    let tax = (sumPriceArray * 0.13).toFixed(2)
    const totalPrice = (sumPriceArray * 1.13).toFixed(2)


    let {fullName, email,address, city, province, country, postalCode, phoneNumber} = addressData

    const navigate = useNavigate()
    const ClickToCheck = () => {
        navigate('/orderTrack')
    }

    const d = new Date()
    let date = `${d.getFullYear()} / ${d.getMonth()} / ${d.getDate()}`

    return (
        <>
            <NavBar/>
            <div ref={ref} {...props}>
                <div className='order-confirm'>
                    <CheckCircleOutlineOutlinedIcon style={{fontSize:60, color:"#cc331e"}}/>
                    <div className="confirm-name">Hey {fullName}</div>
                    <h1>You Order is Confirmed!</h1>
                    <p>We'll send you a shipping confirmation email as soon as your order ships.</p>
                </div>
                <div className='view-order-history'>
                    <button onClick={ClickToCheck}>View Order History</button>
                </div>
                <div className='print-out'>
                    <div className='order-info'>
                        <div className="information">
                        <span>
                    <span>Order Date: </span>
                    <span>{date}</span>
                        </span>
                            <span>
                            <span>Payment Method: </span>
                            <span>PayPal</span>
                        </span>
                            <div>
                                <span>Address: </span>
                                <span>{address} {city} {province} {country} {postalCode}</span>
                            </div>
                        </div>
                    </div>
                    <div className='order-confirm-container'>
                        <div className='your-cart'>
                            <div className='cart-content active' >
                                {cartItems?.map((cartItem, id) => {
                                    return (
                                        <div className='your-cart-product' key={id}>
                                            <span>
                                                <img
                                                    className='product-first-img'
                                                    src={cartItem.imgUrl}
                                                    alt='Chair Img'
                                                />
                                                <span className='product-info'>Product: {cartItem.name}</span>
                                                <span className='product-info'>Quantity: {cartItem.currentItemQty}</span>
                                                <span className='product-info'>Price: $ {cartItem.totalPrice}</span>
                                                <span>
                                        </span>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="result">
                            <div className='result-sub'>
                                <span >Subtotal  ${sumPriceArray}</span>
                            </div>
                            <div className='result-sub'>
                                <span >HST  ${tax}</span>
                            </div>
                            <div className='result-sub'>
                                <span>Shipping  $0</span>

                            </div>
                            <div className='result-sub'>
                                <span className='total'>TOTAL ${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
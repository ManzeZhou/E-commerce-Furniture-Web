import './PaymentInfo.scss'
import './OrderSummary.scss'
import NavBar from "../navBar/NavBar";
import {useNavigate} from "react-router-dom";
import {Payment} from "./payment";
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankTwoToneIcon from '@mui/icons-material/CheckBoxOutlineBlankTwoTone';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import {useState} from "react";
import axios from "axios";
import {header, ORDER_URL, TOKEN} from "../../helper";

export const PaymentInfo = () => {

    const addressData = JSON.parse(localStorage.getItem('addressInfo'));
    const cartItems = JSON.parse(localStorage.getItem('cartArr'));
    let token = localStorage.getItem(TOKEN)

    let totalQuantity = 0
    for (let i = 0; i < cartItems.length; i++) {
        totalQuantity += parseInt(cartItems[i].currentItemQty)
    }
    let priceArray = []

    let {fullName, email,address, city, province, country, postalCode, phoneNumber} = addressData

    const navigate = useNavigate()
    const [checked, setChecked] = useState(true)
    const [yourCart, setYourCart] = useState(false)

    cartItems.map((s, index) => {
        // priceArray[index] = s.totalPrice
        priceArray.push(s.totalPrice)
    })
    const sumPriceArray = priceArray.reduce(
        (prev, curr) => prev + curr, 0
    )

    let tax = (sumPriceArray * 0.13).toFixed(2)
    const totalPrice = (sumPriceArray * 1.13).toFixed(2)

    const clickReview = async () => {
        navigate('/orderConfirm')
        let cartArr = JSON.parse(localStorage.getItem('cartArr'))

        const orders = cartArr.map(s => {
            let quantity = parseInt(s.currentItemQty)
            let product = s.id
            let profileItems = s.selectedChecks
            return ({quantity, product, profileItems})
        })

        try {
            let tempOrder = await axios.post(ORDER_URL, {
                    taxRate: 1.13,
                    isActive: true,
                    isDelete: false,
                    orderItems: orders
                },
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }
            )
            let {data: {data}} = tempOrder
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <NavBar/>

            <h1 className="edit-payment">Payment</h1>
            <div className='payment-container'>
                <div className='address'>
                    <div className='billing-address'>
                        <h5>Billing Address</h5>
                        <div>{fullName}</div>
                        <div>{email}</div>
                        <div>{phoneNumber}</div>
                        <div>{address} <span>{  city}</span> </div>
                        <div>
                            <span>{province}</span> <span>{country}</span> <span>{postalCode}</span>
                        </div>
                        <div className="billing-address-same" onClick={() => setChecked(!checked)}>
                            {checked? <CheckBoxRoundedIcon/> : <CheckBoxOutlineBlankTwoToneIcon/>}
                            <span>Billing address is same as shipping</span>
                        </div>
                    </div>
                    <div className='shipping-address'>
                        <h5>Shipping Address</h5>
                        <div>{fullName}</div>
                        <div>{email}</div>
                        <div>{phoneNumber}</div>
                        <div>{address} <span>{  city}</span> </div>
                        <div>
                            <span>{province}</span> <span>{country}</span> <span>{postalCode}</span>
                        </div>
                        <div className="shipping-edit" onClick={() => navigate('/address')}>
                            <EditIcon className='edit-icon'/>
                            Edit
                        </div>
                    </div>
                </div>


                <div className='order-summary-container'>
                    <div className='order-summary'>
                        <div>ORDER SUMMARY</div>
                        <div className="order-edit" onClick={() => navigate('/cart')}>
                            <EditIcon className='edit-icon'/>
                            Edit
                        </div>
                    </div>

                    <div className='your-cart'>
                        <div className='your-cart-word' onClick={() => setYourCart(!yourCart)}>Your Cart</div>
                        <div className={ yourCart ? 'cart-content active' : 'cart-content'}     >
                            {cartItems?.map((cartItem, id) => {
                                return (
                                    <div className='your-cart-product' key={id}>
                                        <div className='product-img'>
                                            <img
                                                className='product-first-img'
                                                src={cartItem.imgUrl}
                                                alt='Chair Img'
                                            />
                                        </div>
                                        <div className='product-info'>
                                            <div className='product-name'>Product: {cartItem.name}</div>
                                            <div>{cartItem.selectedProfile.FrameBase}</div>
                                            <div>{cartItem.selectedProfile.Size}</div>
                                            <div>{cartItem.selectedProfile.BackSupport}</div>
                                            <div>{cartItem.selectedProfile.Tilt}</div>
                                            <div>{cartItem.selectedProfile.Arms}</div>
                                            <div>{cartItem.selectedProfile.Armpad}</div>
                                            <div>{cartItem.selectedProfile.Caster}</div>
                                            <div className='product-name'>Quantity: {cartItem.currentItemQty}</div>
                                            <div className='product-name'>Price: $ {cartItem.totalPrice}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='subtotal'>
                        <span>SUBTOTAL</span>
                        <span>${sumPriceArray}</span>
                    </div>
                    <div className='sales-tax'>
                        <span>SALES TAX</span>
                        <span>${tax}</span>
                    </div>
                    <div className='shipping-fee'>
                        <span>SHIPPING</span>
                        <span>$0</span>
                    </div>
                    <div className='total'>
                        <span>TOTAL</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>


                <div className='payment-method'>
                    <Payment/>
                </div>

            </div>

        </>
    )
}
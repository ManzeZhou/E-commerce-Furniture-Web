import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {PaymentSuccess} from "../../action/paymentAction";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {header, TOKEN} from "../../helper";
// import {PaymentSuccess} from "../../redux/action/paymentAction";

export const Payment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addressData = JSON.parse(localStorage.getItem('addressInfo'));
    const cartItems = JSON.parse(localStorage.getItem('cartArr'));

    let totalQuantity = 0
    for (let i = 0; i < cartItems.length; i++) {
        totalQuantity += parseInt(cartItems[i].currentItemQty)
    }

    let {fullName, email,address, city, province, country, postalCode, phoneNumber} = addressData


    useEffect(() => {
        window.PAYPAL.Button.render(paypalIntegrate(window.PAYPAL, () => {

        }), '#paypal-button');
    }, [])
    const paypalIntegrate = (paypal, PaymentSuccess) => {
        return {
            // Configure environment
            env: 'sandbox',
            client: {
                sandbox: 'AT00CBFees-dWFZkvRZIdRoC-HcSBflw-Bi2e7S1Y1mCGOlY46BUkBEOTElGDUFwfPEuyy9afsitY7xF',
                production: 'AWy7L0BwPpJU1qoh9hNZiR9-sadMHUpnOhlRbTw9ha-4LOhB9y4biARxSpBnk1KjbaXEHCnv1pBhumgI'
            },
            // Customize button (optional)
            locale: 'en_US',
            style: {
                size: 'medium',
                color: 'white',
                shape: 'pill',
                // layout: 'vertical',
                fundingicons: 'true',
            },
            funding: {
                allowed: [paypal.FUNDING.CARD],
                disallowed: [paypal.FUNDING.CREDIT]
            },

            // Enable Pay Now checkout flow (optional)
            commit: true,

            // Set up a payment
            payment: (data, actions) => {
                return actions.payment.create({
                    transactions: [{
                        amount: {
                            total: '0.36',
                            currency: 'USD',
                            details: {
                                subtotal: '0.30',
                                tax: '0.03',
                                shipping: '0.02',
                                handling_fee: '1.00',
                                shipping_discount: '-1.00',
                                insurance: '0.01'
                            }
                        },
                        description: 'Mark2win Full Stack Developer Bootcamp Ultimate version',
                        custom: '90048630024435',
                        //invoice_number: '12345', Insert a unique invoice number
                        payment_options: {
                            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                        },
                        soft_descriptor: 'ECHI5786786',
                        item_list: {
                            items: [
                                {
                                    name: 'React',
                                    description: 'React-from scratch to master',
                                    quantity: '2',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: '1',
                                    currency: 'USD'
                                },
                                {
                                    name: '',
                                    description: 'Front end developer.',
                                    quantity: '1',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: 'product34',
                                    currency: 'USD'
                                }],
                            shipping_address: {
                                recipient_name: 'Mark Xu',
                                line1: '50 Acadia Ave, Markham, ON L3R 0B3',
                                line2: 'Unit #200',
                                city: 'Toronto',
                                country_code: 'CA',
                                postal_code: 'L3R 0B3',
                                phone: '6474017219',
                                state: 'Ontario'
                            }
                        }
                    }],
                    note_to_payer: 'Contact us markxu@mark2win.com for any questions on your order.'
                });
            },
            // Execute the payment
            onAuthorize: async (data, actions) => {

                let priceArray = []

                cartItems.map((s, index) => {
                    // priceArray[index] = s.totalPrice
                    priceArray.push(s.totalPrice)
                })
                const sumPriceArray = priceArray.reduce(
                    (prev, curr) => prev + curr, 0
                )

                let tax = (sumPriceArray * 0.13).toFixed(2)
                const totalPrice = (sumPriceArray * 1.13).toFixed(2)


                let invoice = Date.now()


                try {
                    const res = await axios.post('http://localhost:3000/user/', {
                        email: `${email}`,
                        fullName: `${fullName}`,
                        phoneNumber: `${phoneNumber}`,
                        address: `${address}`,
                        city: `${city}`,
                        province: `${province}`,
                        country: `${country}`,
                        postalCode: `${postalCode}`
                    })
                    console.log('user---->',res)
                } catch (err) {
                    console.log(err)
                }

                try {
                    for(let i = 0; i < cartItems.length; i++) {
                        const paymentStatusList = await axios.get('http://localhost:3000/payment_status', {
                            header: header
                        })
                        let paymentId = paymentStatusList.data.data[0].id

                        const orderStatusList = await axios.get('http://localhost:3000/status', {
                            header: header
                        })
                        let orderStatusId = orderStatusList.data.data[1].id

                        const paymentTypeList = await axios.get('http://localhost:3000/payment_type', {
                            header: header
                        })
                        let paymentTypeId = paymentTypeList.data.data[0].id

                        const userList = await axios.get('http://localhost:3000/user', {
                            header: header
                        })
                        let userId = userList.data.data[userList.data.data.length-1]


                        const res = await axios.post('http://localhost:3000/order/', {
                            invoice: invoice,
                            taxRate: 1.13,
                            totalQuantity: `${totalQuantity}`,
                            totalPrice: `${totalPrice}`,
                            price: `${cartItems[i].price}`,
                            productName: `${cartItems[i].name}`,
                            media: `${cartItems[i].imgUrl}`,
                            arms: `${cartItems[i].selectedProfile.Arms}`,
                            armPad: `${cartItems[i].selectedProfile.Armpad}`,
                            backSupport: `${cartItems[i].selectedProfile.BackSupport}`,
                            caster: `${cartItems[i].selectedProfile.Caster}`,
                            frameBase: `${cartItems[i].selectedProfile.FrameBase}`,
                            size: `${cartItems[i].selectedProfile.Size}`,
                            tilt: `${cartItems[i].selectedProfile.Tilt}`,
                            categoryPrice: `${cartItems[i].selectedPrice}`,
                            orderStatus: paymentId,
                            paymentStatus: orderStatusId,
                            paymentType: paymentTypeId,
                            user: userId

                        })
                        console.log('order---->',res)
                    }
                } catch (err) {
                    console.log(err)
                }

                return actions.payment.execute().then(function (res) {
                    // Show a confirmation message to the buyer
                    // call your action to tackle after payment process

                    console.log('payment returned results', res)
                    navigate('./orderConfirm')
                    dispatch(PaymentSuccess())  // call my PaymentSuccess action
                });
            }
        }
    }

    return (
        <div id="paypal-button"></div>
    )

}
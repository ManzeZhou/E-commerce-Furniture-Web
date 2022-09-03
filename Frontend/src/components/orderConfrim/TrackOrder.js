import NavBar from "../navBar/NavBar";
import "./TrackOrder.scss"
import {useEffect, useState} from "react";
import axios from "axios";


export const TrackOrder = () => {


    const [orderArr, setOrderArr] = useState([])


    useEffect(  () => {
        async function fetchData() {
            try {
                const orderInfo = await axios.get('http://localhost:3000/order/')
                console.log(orderInfo)
                const orderData = await orderInfo?.data
                console.log('orderData',orderData)
                const orderArr = await orderData?.data
                console.log('this is orderArr', orderArr)
                setOrderArr(orderArr)
            }catch (e) {
                console.log(e)
            }
        }
        fetchData()
    } , [])

    console.log(orderArr)

    const LastedOrder = orderArr[orderArr.length-1]

    console.log(LastedOrder)
    const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    




    return (
        <>
            <NavBar/>
            <div className="track-order">
                <div className="order-history">
                    <h1>Order History</h1>
                </div>
                <div className="order-container">
                    {orderArr.length !== 0 && <span className="result">{orderArr.length} {orderArr.length > 1 ? 'results' : 'result'}</span>}
                {orderArr.length !== 0 && <div className="order-block">
                    {orderArr.map((item, index) => {
                        return (
                            <ul key={index} className="order-content">
                                <li className="order-list">
                                    <a href="" className="order-detail">
                                        <div className="order-head">
                                            <div className="order-date">
                                            <span>{Month[new Date(item.invoice).getMonth()]} {new Date(item.invoice).getDay()} , {new Date(item.invoice).getFullYear()}
                                        </span>
                                            </div>
                                            <div className="item-price">
                                                <div className="order-quantity">
                                                    <span>({JSON.stringify(item.totalQuantity)} {JSON.stringify(item.totalQuantity).valueOf() > 1 ? 'items' : 'item'})

                                                    </span>
                                                </div>
                                                <div className="order-price">
                                                    <span>Total Price: ${JSON.stringify(item.totalPrice)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <div className="order-number">Order Number:  <a href="">{item.invoice}</a>
                                            </div>
                                            <div className="line"></div>
                                            <div className="order-img">
                                                <span>
                                                    <img src={(item.media)} alt="order-img" className="order-pic"/>
                                                    <span className="order-name">
                                                    {(item.productName)}
                                                    </span>
                                                    <ul className="order-selection">
                                                        <li>{(item.categories.armPad)}</li>
                                                        <li>{(item.categories.arms)}</li>
                                                        <li>{(item.categories.backSupport)}</li>
                                                        <li>{(item.categories.caster)}</li>
                                                        <li>{(item.categories.frameBase)}</li>
                                                        <li>{(item.categories.size)}</li>
                                                        <li>{(item.categories.tilt)}</li>

                                                    </ul>
                                                </span>
                                            </div>
                                            <div className="detail">
                                                <span className="details">See Details ></span>
                                            </div>

                                        </div>








                                    </a>

                                </li>

                            </ul>

                        )
                    })}


                </div>}






            </div>
            </div>

        </>
    )
}
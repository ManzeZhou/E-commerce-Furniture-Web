import React, {useRef} from "react";
import {OrderConfirm} from "./OrderConfirm";
import { useReactToPrint } from 'react-to-print';
import './OrderConfirm.scss'



export const PDF = () => {

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Order Confirmation'
    })

    return (
        <>
            <div>
                <OrderConfirm ref={componentRef} />
                <div className='print-button'>
                    <button onClick={handlePrint}>Print this out!</button>
                </div>
            </div>
        </>
    )
}


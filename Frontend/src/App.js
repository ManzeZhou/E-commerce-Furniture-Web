import { Routes, Route } from 'react-router-dom';

import Nav from "./components/header/Nav";
import Footer from "./components/footer/Footer";
import ProductPage from "./components/productpage/ProductPage";
import CartBody from "./components/cartPage/cartBody"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProductAPI} from "./action/database.util";
import Loading from "./components/loading/loading"
import ScrollButton from "./components/ProductProfile/ScrollButton";
import NoMatch from "./routes/noMatch/NoMatch";
import LogMain from "./components/logform/LogMain";
import {AddressInfo} from "./components/paymenInfo/AddressInfo";
import {PaymentInfo} from "./components/paymenInfo/PaymentInfo";
import {TrackOrder} from "./components/orderConfrim/TrackOrder";
import {PDF} from "./components/orderConfrim/PDF";


const App = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {dispatch(fetchProductAPI())}, [])
    const productId = useSelector(state => state?.productReducer?.productId)


    useEffect( () => {
        setTimeout(() => {
            setLoading(false)
        },300)
    },[])

    return (
      <div>
          {loading ? (<Loading/>) :
              (
                  <>
                  <Routes>
                      <Route path='/' element={<Nav/>}/>
                      <Route path='/account' element={<LogMain/>}/>
                      <Route path='/cart' element={<CartBody/>}/>
                      <Route path='/product/:id' element={<ProductPage id={productId}/>}/>
                      <Route path="*" element={<NoMatch />} />
                      <Route path="/address" element={<AddressInfo />} />
                      <Route path="/payment" element={<PaymentInfo />} />
                      <Route path="/payment/orderConfirm" element={<PDF />} />
                      <Route path="/orderTrack" element={<TrackOrder />} />
                  </Routes>
              <Footer/>
               <ScrollButton/>
                  </>
              )
          }
      </div>
  );
};

export default App;

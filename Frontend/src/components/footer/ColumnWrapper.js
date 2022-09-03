import "./Footer.scss";
import React, {useState} from "react";


const ColumnWrapper = () => {

    const customerServiceList = ['Contact Us', 'FAQ', 'Returns and Exchanges', 'Shipping and Delivery', 'Warranty and Service',
        'Assembly Instructions', 'Care and Maintenance', 'Site Feedback', 'Track Your Order',
        'Nelson Product Recall', 'Our Responses to COVID-19']
    const locationsList = ['Find a Retailer','Our New York Store']
    const aboutList = ['About Us', 'HermanMiller.com', 'Our Designers', 'Our Designers', 'Request A Catalog', 'Careers',
        'Accessibility Statement', 'Terms of Sale', 'Privacy Notice', 'Cookie Notice',
        'Do Not Sell My Information', 'Site Map']



const [activated1, setActivated1] = useState(false)
const handleClick1 = () => {
    setActivated1(!activated1)
}

    const [activated2, setActivated2] = useState(false)
    const handleClick2 = () => {
        setActivated2(!activated2)
    }


    const [activated3, setActivated3] = useState(false)
    const handleClick3 = () => {
        setActivated3(!activated3)
    }

    const [activated4, setActivated4] = useState(false)
    const handleClick4 = () => {
        setActivated4(!activated4)
    }


    return (
        <div className="column-wrapper">
            <div className="column customer-service">
                <div className="service-inner">
                    <ul className={activated1 ? "service-list active" : "service-list"} onClick={handleClick1}>
                        <li className="service-list-title">Customer Service</li>
                        {customerServiceList.map((s, index) => <li key={index}><a href="/">{s}</a></li>)}
                    </ul>
                </div>
            </div>
          <div className="column-middle">
              <div className="column resource">
                  <div className="service-inner">
                      <ul  className={activated2 ? "service-list active" : "service-list"} onClick={handleClick2}>
                          <li className="service-list-title">Resources</li>
                          <li id="showResources"><a href="/">For Business</a></li>
                      </ul>
                  </div>
              </div>
              <div className="column location">
                  <div className="service-inner">
                      <ul  className={activated3 ? "service-list active" : "service-list"} onClick={handleClick3}>
                          <li className="service-list-title">Locations</li>
                          {locationsList.map((s, index) => <li key={index}><a href="/">{s}</a></li>)}
                      </ul>
                  </div>
              </div>
          </div>
          <div className="column aboutUs">
              <div className="service-inner">
                  <ul  className={activated4 ? "service-list active" : "service-list"} onClick={handleClick4}>
                      <li className="service-list-title">About Herman Miller</li>
                      {aboutList.map((s, index) => <li key={index}><a href="/">{s}</a></li>)}

                  </ul>
              </div>
          </div>
      </div>
  )
}

export default ColumnWrapper;
import './ProductProfile.scss';
import ProfileItem from './ProfileItem';
import ProductCart from './ProductCart';
import { useParams } from 'react-router-dom';
import { fetchProductAPI } from '../../action/database.util';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductProfile = ({
  nameFromProductPage,
  priceFromProductPage,
  idFromProductPage,
  firstImgUrl,
  productID,
}) => {
  const rating = [4.0, 5.0, 0.0, 1.7, 3.0, 4.5, 5.0, 3.0, 2.1, 4.9];

  const showRating = rating => {
    let arrStar = [];
    let ratingInteger = Math.trunc(rating);
    let ratingDiff = rating - ratingInteger;
    let ratingNum = undefined;
    for (let i = 0; i < ratingInteger; i++) {
      arrStar.push(1);
    }
    if (ratingDiff >= 0.5) {
      arrStar.push(0.5);
      ratingNum = 5 - Math.ceil(rating);
    } else {
      ratingNum = 5 - Math.floor(rating);
    }
    if (ratingNum > 0) {
      for (let t = 0; t < ratingNum; t++) {
        arrStar.push(0);
      }
    }

    let ratingStar = arrStar.map((num, index) => {
      if (num === 1) {
        return (
          <i
            className='fas fa-star'
            style={{ color: '#e22d00' }}
            key={index}
          ></i>
        );
      } else if (num === 0.5) {
        return (
          <i
            className='fas fa-star-half-alt'
            style={{ color: '#e22d00' }}
            key={index}
          ></i>
        );
      } else {
        return (
          <i
            className='far fa-star'
            style={{ color: '#e22d00' }}
            key={index}
          ></i>
        );
      }
    });

    return ratingStar;
  };

  const designer = [
    'Don Chadwick and Bill Stumpf',
    'Studio 5.0',
    'Studio 5.00',
    'Jeff Weber and Bill Stumpf',
    'Studio 5.0',
    'Sam Hecht and Kim Colin',
    'Yves Béhar',
    'Studio 5.0',
    'Charles and Ray Eames',
    'Charles and Ray Eames',
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductAPI);
  }, [dispatch]);
  const { id } = useParams();
  const productList = useSelector(state => state?.productReducer?.data);
  const media = productList[id - 1]?.media;
  const url = media?.split('|')[0];

  const [showPic, setShowPic] = useState(false);
  const showBigPic = () => {
    setShowPic(!showPic);
  };

  const [price, setPrice] = useState(null);
  const changePriceFromCart = priceInCart => {
    setPrice(priceInCart);
  };

  return (
    <>
      <div className='product-profile'>
        <h1 className='product-name'>{nameFromProductPage}</h1>
        <div className='product-content'>
          <p className='product-designer'>
            Designed by {designer[idFromProductPage - 1]}
          </p>
          <p className='product-current-price'>$ {price}.00</p>
          <div className='img-container'>
            <img
              className='product-img'
              src={url}
              alt='img'
              style={
                showPic
                  ? { transform: 'scale(1.3)', cursor: 'zoom-out' }
                  : { transform: 'none', cursor: 'zoom-in' }
              }
              onClick={showBigPic}
            />
          </div>
          <div className='img-big-bottom'>
            <a href=''>
              <i className='fas fa-info-circle'></i>
              <p>Dimensions</p>
            </a>
          </div>
          <div className='product-content-review'>
            <div className='review-rating'>{showRating(rating[id - 1])}</div>
          </div>
          <div className='product-content-price'> CS$ {price}</div>
          <ul className='product-content-warranty'>
            <li className='warranty-list'>
              <i className='fa fa-check'></i>
              <a href='' className='li-a'>
                12-Year Warranty
              </a>
            </li>
            <li>
              <i className='fas fa-check'></i>
              <a href='' className='li-a'>
                Free Standard Shipping
              </a>
            </li>
            <a href=''></a>
            <li>
              <i className='fas fa-check'></i>
              <a href='' className='li-a'>
                30-Day No Hassle Return
              </a>
            </li>
          </ul>
          <div className='promo-msg'>
            <a href='#' data-testid='test' style={{ color: '#cc331e' }}>
              Free Shipping
            </a>
          </div>
          <div></div>
          <ProfileItem />
          <div className='product-content-number'>
            Item No.
            <span>99999 99999</span>
          </div>
          <div className='product-content-action'>
            <a href=''>Save to Wish List</a>
            <a href='' className='action-print'>
              Print
            </a>
          </div>
          <ProductCart
            cartName={nameFromProductPage}
            standardPrice={priceFromProductPage}
            firstImgUrl={firstImgUrl}
            productID={productID}
            showPrice={changePriceFromCart}
          />
        </div>
      </div>
    </>
  );
};

export default ProductProfile;

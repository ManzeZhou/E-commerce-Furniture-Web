import './ImgMask.scss';
import './ProductImg.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProfileCategories } from '../../action/database.util';
import ProductProfile from '../ProductProfile/ProductProfile';
import Nav from '../header/Nav';
import NavBar from '../navBar/NavBar';

const ProductPage = () => {
  const { id } = useParams();
  const productList = useSelector(state => state?.productReducer?.data);

  const currProduct = productList?.[parseInt(id) - 1];
  const name = currProduct?.name;
  const price = currProduct?.price;
  const description = currProduct?.description;
  const media = currProduct?.media;
  const profileCategories = currProduct?.profileCategories;
  const productID = currProduct?.id;

  const dispatchCategories = useDispatch();
  useEffect(() => {
    dispatchCategories(fetchProfileCategories(profileCategories));
  }, [dispatchCategories, profileCategories]);

  const mediaArray = media?.split('|');
  let galleryArray = mediaArray ? mediaArray : [];

  const firstImgUrl = galleryArray[0];

  const [bigImgIndex, setBigImgIndex] = useState(0);

  const [showPic, setShowPic] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const showBigPic = () => {
    setShowPic(!showPic);
  };

  return (
    <>
      <NavBar />
      <div className='main-body'>
        <div className='breadcrumb-nav'>
          <div className='office-icon'>
            <a href='/'>Office </a>
          </div>
          <div className='office-icon'>
            <a href='/'>Office Chairs </a>
          </div>
          <div>
            <a href='/'>{name}</a>
          </div>
        </div>

        <div className={showImg ? 'img-mask active' : 'img-mask'}>
          <div className='img-list-wrapper'>
            <div className='img-list'>
              {galleryArray &&
                galleryArray.map((url, index) => {
                  return (
                    <img
                      className='imgContainer'
                      key={index}
                      src={url}
                      onClick={() => setBigImgIndex(index)}
                    ></img>
                  );
                })}
            </div>
          </div>
          <div className='img-zoom'>
            <div className='arrow'></div>
            <img src={galleryArray[bigImgIndex]} alt='' className='bigPic' />
            <div className='arrow'></div>
          </div>
          <div className='close-icon' onClick={() => setShowImg(false)}>
            
          </div>
        </div>

        <div className='main-section'>
          <div className='product-img'>
            <div className='img-inner'>
              <div className='gallery-wrap'>
                <div className='img-gallery'>
                  {galleryArray &&
                    galleryArray.map((url, index) => {
                      return (
                        <img
                          className='imgContainer'
                          key={index}
                          src={url}
                          onClick={() => setBigImgIndex(index)}
                        ></img>
                      );
                    })}
                  <div className='img-more' onClick={() => setShowImg(true)}>
                    +2More
                  </div>
                </div>
              </div>

              <div className='img-big'>
                <div className='bigPic-container'>
                  <img
                    src={galleryArray[bigImgIndex]}
                    alt=''
                    className='bigPic'
                    style={
                      showPic
                        ? { transform: 'scale(1.3)', cursor: 'zoom-out' }
                        : { transform: 'none', cursor: 'zoom-in' }
                    }
                    onClick={showBigPic}
                  />
                </div>

                <div
                  className='dimensions'
                  onClick={() => {
                    window.scrollTo(0, 2700);
                  }}
                >
                   Dimensions
                </div>
              </div>
            </div>
          </div>
          <ProductProfile
            nameFromProductPage={name}
            priceFromProductPage={price}
            idFromProductPage={id}
            firstImgUrl={firstImgUrl}
            productID={productID}
          />
        </div>

        <div className='description'>
          <h2>Description</h2>
          <div className='description-box'>
            <div className='brief-wrap'>
              <div className='brief-des'>
                <p>{description}</p>
              </div>
            </div>
            <div className='feature'>
              <h6>Key Feature</h6>
              <ul>
                <li>12-Year Warranty</li>
                <li>Named 100 Best Inventions By Time Magazine In 2019</li>
                <li>Auto-Harmonic™ Tilt Mechanism Automatically Adjusts</li>
                <li>Flexible Frame</li>
                <li>Continuous And Breathable Seat And Back</li>
                <li>One Adjustment For Height</li>
                <li>Wrap-Top Facilitates Casual Collaboration</li>
                <li>
                  Available In Three Arm Styles: Fixed, Fully Adjustable, And
                  Leaf
                </li>
                <li>Dipped-In-Color Option</li>
                <li>Made In Michigan At A 100% Green-Energy Facility</li>
                <li>
                  For Questions About Lead Times, In-Stock Options Or Delivery
                  Please Give Usa Call At 888.798.0202.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

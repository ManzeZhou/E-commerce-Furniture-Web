import './NavBar.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './cartHover.scss';
import {useNavigate} from "react-router-dom";

const NavBar = () => {
  const [displayStatus, setDisplayStatus] = useState('block');
  const [searchClicked, setSearchClicked] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [levelOneClicked, setLevelOneClicked] = useState(false);
  const [levelTwoClicked, setLevelTwoClicked] = useState(false);
  const [menuBottomClicked, setMenuBottomClicked] = useState(false);
  const [myAccountClicked, setMyAccountClicked] = useState(false);
  const [cart, setCart] = useState(false);

  const handlerMenu = () => {
    setMenuClicked(true);
    setLevelOneClicked(true);
    setLevelTwoClicked(false);
    setMenuBottomClicked(true);
    setMyAccountClicked(false);
  };

  const handlerLevelOne = () => {
    setLevelOneClicked(false);
    setLevelTwoClicked(true);
    setMenuBottomClicked(false);
  };

  const handlerOffice = () => {
    setLevelTwoClicked(false);
    setLevelOneClicked(true);
    setMenuBottomClicked(true);
  };

  const handlerAccount = () => {
    setLevelOneClicked(false);
    setMenuBottomClicked(false);
    setMyAccountClicked(true);
  };

  const handlerMyAccount = () => {
    setMyAccountClicked(false);
    setLevelOneClicked(true);
    setMenuBottomClicked(true);
  };

  const handlerSearchClose = () => {
    setSearchClicked(false);
  };

  // const cartItems = useSelector(state => state?.cartReducer?.cartItems);
  const cartItems = JSON.parse(localStorage.getItem('cartArr'));

  const handlerCart = () => {
    if (cartItems.length !== 0) {
      setCart(!cart);
    } else {
      setCart(false);
    }
  };
  let navigate = useNavigate()

  return (
    <>
      <div
        className={
          menuClicked ? 'mobile-header-menu active' : 'mobile-header-menu'
        }
      >
        <ul className={levelOneClicked ? 'level-1 active' : 'level-1'}>
          <li>
            <div>
              Office
              <span onClick={handlerLevelOne}></span>
            </div>
          </li>
          <li>Living</li>
          <li>Dining</li>
          <li>Bedroom</li>
          <li>Outdoor</li>
          <li>Lighting</li>
          <li>Accessories</li>
          <li>Gaming</li>
        </ul>
        <div
          className={menuBottomClicked ? 'menu-bottom active' : 'menu-bottom'}
        >
          Account
          <span onClick={handlerAccount}></span>
        </div>
        <div className={levelTwoClicked ? 'level-2 active' : 'level-2'}>
          <ul>
            <li>
              <span onClick={handlerOffice}></span>
              Office
            </li>
            <li>Office Chairs</li>
            <li>Side Chairs</li>
            <li>Stool Chairs</li>
            <li>Desk|Sit-to-Stand|tables</li>
            <li>Storage</li>
            <li>Desk Accessories</li>
            <li>Lighting</li>
            <li>Replacement Parts</li>
            <li>View All</li>
          </ul>
        </div>
        <ul
          className={
            myAccountClicked
              ? 'menu-bottom-account active'
              : 'menu-bottom-account'
          }
        >
          <li>
            <span onClick={handlerMyAccount}></span>
            My Account
          </li>
          <li className='account2'>
            <a href='./account'>Login / Register</a>
          </li>
        </ul>
      </div>
      <div
        className={menuClicked ? 'mask active' : 'mask'}
        onClick={() => setMenuClicked(false)}
      ></div>
      <header>
        <div className='promo-bar' style={{ display: displayStatus }}>
          <a href='/'>
            Enjoy Free Shopping on Office Chairs + 0% Financing Available
          </a>
          <span onClick={() => setDisplayStatus('none')}></span>
        </div>
        <div className='action-wrapper'>
          <div className='action-bar'>
            <ul className='action-left'>
              <li className='active'>
                <a href='/'>Store</a>
              </li>
              <li>
                <a href='/'>Contact</a>
              </li>
            </ul>
            <ul className='action-center'>
              <li>
                <a href='/'>Customer Service</a>
              </li>
              <li>
                <a href='/'>888 798 0202</a>
              </li>
            </ul>
            <ul className='action-right'>
              <li className='action-right-account'>
                <a href='/account'>My Account</a>
                <span></span>
                <div className='user-panel'>
                  <a href='/account'>Login</a>
                  <a href='/account'>Register</a>
                </div>
              </li>
              <li className='action-right-cart'>
                <span className='cart-border' onMouseOver={handlerCart}>
                  <a href='/cart'>Cart</a>
                  <span></span>
                </span>
                <div className={cart ? 'cart-hover active' : 'cart-hover'}>
                  <h1>Cart Contents</h1>
                  {cartItems?.map((cartItem, id) => {
                    return (
                      <div className='product' key={id}>
                        <div className='product-img'>
                          <img
                            className='product-first-img'
                            src={cartItem.imgUrl}
                            alt='Chair Img'
                          />
                        </div>
                        <div className='product-info'>
                          <div>Product: {cartItem.name}</div>
                          <div>Price: $ {cartItem.totalPrice}</div>
                          <div>Quantity: {cartItem.currentItemQty}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
          <ul className='action-mobile'>
            <li>Store</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='nav-bar'>
          <div className='nav-wrapper'>
            <div className='nav-bar-inner'>
              <div className='nav-logo'>
                <a href='/'>
                  <img
                    className='pic-1'
                    src='http://mfs.mark2win.com/static/media/logo.a567ab07.svg'
                    alt='logo-img'
                  />
                  <img
                    className='pic-2'
                    src='http://mfs.mark2win.com/static/media/logo-small.a87100bc.svg'
                    alt='logo-img'
                  />
                </a>
              </div>
              <ul>
                <li className='current'>
                  <a href='/'>Office</a>
                </li>
                <li>
                  <a href='/'>Living</a>
                </li>
                <li>
                  <a href='/'>Dining</a>
                </li>
                <li>
                  <a href='/'>Bedroom</a>
                </li>
                <li>
                  <a href='/'>Outdoor</a>
                </li>
                <li>
                  <a href='/'>Lighting</a>
                </li>
                <li>
                  <a href='/'>Accessories</a>
                </li>
                <li>
                  <a href='/'>Gaming</a>
                </li>
              </ul>
              <div className='header-search'>
                <input type='text' placeholder='Search' />
                <span className='icon-search'></span>
              </div>
              <span
                className='icon-search-b'
                onClick={() => setSearchClicked(!searchClicked)}
              >
                
              </span>
              <div
                className={
                  searchClicked ? 'search-active active' : 'search-active'
                }
              >
                <span className='search-active-icon'></span>
                Search
                <span
                  className='search-active-close'
                  onClick={handlerSearchClose}
                >
                  
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='mobile-header'>
          <div className='mobile-nav'>
            <span onClick={handlerMenu}></span>
            <h2>
              <a href='/'>
                <img src='http://mfs.mark2win.com/static/media/logo.a567ab07.svg' />
              </a>
            </h2>
            <ul>
              <li></li>
              <li onClick={() => navigate('/cart')}></li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;

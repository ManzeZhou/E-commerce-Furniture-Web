import './ProductProfile.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCartItems,
  fetchProductItemQty,
  fetchProductTotalPrice,
  fetchSelection,
  fetchSelectionChecked,
  fetchSelectionPrice,
} from '../../action/database.util';
import { useNavigate } from 'react-router-dom';

const ProductCart = ({
  id,
  cartName,
  standardPrice,
  firstImgUrl,
  productID,
  showPrice,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductItemQty('1'));
  }, []);

  const [timer, setTimer] = useState(null);
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const changeColor = ele => {
    let container = document.getElementsByClassName(ele);
    container[0].style.background = 'beige';
    console.log('this is ', typeof container);

    setTimer(
      setTimeout(() => {
        container[0].style.background = '';
      }, 100)
    );
  };

  const [value, setValue] = useState('1');

  const [noSame, setNoSame] = useState(true);

  const changeItemQty = event => {
    let qty = event.target.value;
    setValue(qty);
    dispatch(fetchProductItemQty(qty));
  };

  const currentItemQty = useSelector(
    state => state?.ItemQtyReducer?.productItemQty
  );

  console.log(currentItemQty);

  const selectedProfile = useSelector(
    state => state?.selectionReducer?.selection
  );

  console.log(selectedProfile);

  const selectedPrice = useSelector(
    state => state?.selectionReducer?.selectionPrice
  );
  console.log(selectedPrice);

  const selectedChecks = useSelector(
    state => state?.selectionReducer?.selectionChecked
  );

  console.log(selectedChecks);

  const selectionObj = {
    FrameBase: '',
    Size: '',
    BackSupport: '',
    Tilt: '',
    Arms: '',
    Armpad: '',
    Caster: '',
  };

  //['FrameBase', 'Size', ...]

  const initialChecks = new Array(Object.keys(selectionObj).length).fill(0);

  const cartArr = localStorage.getItem('cartArr');

  const cartItems = JSON.parse(cartArr);

  let ifAppend;

  const checkProductTotalPrice = () => {
    // To make sure you put in a non-zero positive integer
    if (parseInt(currentItemQty) > 0 && !currentItemQty.includes('.')) {
      const objValues = Object.values(selectedProfile);
      console.log(objValues);

      // To make sure all the selections are made
      if (!objValues.includes('') && objValues.length !== 0) {
        if (!cartArr || cartItems.length === 0) {
          let totalPrice =
            (parseInt(standardPrice) + selectedPrice) *
            parseInt(currentItemQty);
          dispatch(fetchProductTotalPrice(totalPrice));
          let itemTotalInfo = {
            id: productID,
            name: cartName,
            imgUrl: firstImgUrl,
            price: standardPrice,
            currentItemQty: currentItemQty,
            totalPrice: totalPrice,
            selectedPrice: selectedPrice,
            selectedProfile: selectedProfile,
            selectedChecks: selectedChecks,
            ifSame: [false, false, false, false, false, false, false],
          };

          localStorage.setItem(
            'cartArr',
            JSON.stringify(addToCart(itemTotalInfo))
          );
          // To make sure that every time you click on add to cart, the selectedProfile will reset. Other wise the alert for not making all the selections won't show
          dispatch(fetchSelection(selectionObj));
          dispatch(fetchSelectionPrice(0));
          dispatch(fetchProductItemQty('1'));
          dispatch(fetchSelectionChecked(initialChecks));
          setValue('1');
        } else {
          // First make sure the cartItems.length is not 1
          cartItems.forEach(cartItem =>
            cartItem.selectedChecks.forEach((item, index) => {
              for (let i = 0; i < selectedChecks.length; i++) {
                if (
                  selectedChecks[i] === item &&
                  i === index &&
                  cartName === cartItem.name
                ) {
                  cartItem.ifSame[i] = true;
                  // console.log(cartItem.ifSame);
                } else {
                  continue;
                }
              }
            })
          );

          // now we've changed all the value in cartItem.ifSame

          for (let i = 0; i < cartItems.length; i++) {
            if (!cartItems[i].ifSame.includes(false)) {
              ifAppend = false;
              setNoSame(ifAppend);
              cartItems[i].currentItemQty =
                parseFloat(cartItems[i].currentItemQty) +
                parseFloat(currentItemQty);
              cartItems[i].totalPrice =
                parseFloat(cartItems[i].currentItemQty) *
                (parseFloat(cartItems[i].price) +
                  parseFloat(cartItems[i].selectedPrice));
              cartItems[i].ifSame.forEach((item, index) => {
                cartItems[i].ifSame[index] = false;
              });
              dispatch(fetchSelection(selectionObj));
              dispatch(fetchSelectionPrice(0));
              dispatch(fetchProductItemQty('1'));
              dispatch(fetchSelectionChecked(initialChecks));
              setValue('1');
              localStorage.setItem('cartArr', JSON.stringify(cartItems));
              break;
            } else {
              ifAppend = true;
              setNoSame(ifAppend);
            }
          }

          if (ifAppend) {
            let totalPrice =
              (parseInt(standardPrice) + selectedPrice) *
              parseInt(currentItemQty);
            dispatch(fetchProductTotalPrice(totalPrice));
            let itemTotalInfo = {
              id: productID,
              name: cartName,
              imgUrl: firstImgUrl,
              price: standardPrice,
              currentItemQty: currentItemQty,
              totalPrice: totalPrice,
              selectedPrice: selectedPrice,
              selectedProfile: selectedProfile,
              selectedChecks: selectedChecks,
              ifSame: [false, false, false, false, false, false, false],
            };

            localStorage.setItem(
              'cartArr',
              JSON.stringify(addToCart(itemTotalInfo))
            );
            // To make sure that every time you click on add to cart, the selectedProfile will reset. Other wise the alert for not making all the selections won't show
            dispatch(fetchSelection(selectionObj));
            dispatch(fetchSelectionPrice(0));
            dispatch(fetchProductItemQty('1'));
            dispatch(fetchSelectionChecked(initialChecks));
            setValue('1');
          }
        }
      } else {
        alert(`You haven't made all the selections`);
      }

      // To make sure they put in a non-zero interger
    } else {
      alert('Please input a non-zero number to purchase this item');
      dispatch(fetchProductTotalPrice('0'));
    }
  };

  const addToCart = productsToAdd => {
    if (!localStorage.getItem('cartArr')) {
      localStorage.setItem('cartArr', '[]');
      const cartLocal = JSON.parse(localStorage.getItem('cartArr'));
      let newCarItems = [...cartLocal, { ...productsToAdd }];

      localStorage.setItem('cartArr', JSON.stringify(newCarItems));

      return newCarItems;
    } else {
      const cartLocal = JSON.parse(localStorage.getItem('cartArr'));

      let newCarItems = [...cartLocal, { ...productsToAdd }];

      localStorage.setItem('cartArr', JSON.stringify(newCarItems));

      return newCarItems;
    }
  };

  const Navigate = useNavigate();

  const checkToken = () => {
    if (!localStorage.getItem('TOKEN')) {
      Navigate('/account');
    }
  };

  const price = parseFloat(standardPrice) + selectedPrice;
  showPrice(price);

  return (
    <div className='cart-container'>
      <div className='cart-container-wrapper'>
        <div className='cart-container-detail'>
          <div className='cart-image'>
            <img
              height='58px'
              width='77px'
              src='https://s7d2.scene7.com/is/image/HermanMillerStore/b2c_3x4crop?$image_src=HermanMillerStore/Cosm_LowBack_defaultfront&$b2c_907x680_jpeg$'
              alt=''
            />
          </div>
          <div className='cart-name'>
            <h4 className='cart-text'>{cartName}</h4>
          </div>
        </div>
        <div className='cart-action'>
          <div className='cart-info'>
            <div className='cart-info-price'>
              <span>
                <div
                  className='standard-price'
                  style={{ textDecoration: 'none' }}
                  data-testid='test-pc'
                >
                  CS$ {parseFloat(standardPrice) + selectedPrice}
                </div>
              </span>
            </div>
            <div className='cart-info-avail'>
              <p className='avail-msg'>
                <i className='fas fa-truck fa-flip-horizontal'></i>
                In Stock
              </p>
            </div>
          </div>
          <div className='cart-add'>
            <div className='cart-add-qty'>
              <input
                className='cart-input'
                id='input-qty'
                type='text'
                min='1'
                maxLength='3'
                value={value}
                onChange={changeItemQty}
              />
              <button
                className='cart-add-btn'
                onClick={() => {
                  checkProductTotalPrice();
                  changeColor('cart-container');
                  checkToken();
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;

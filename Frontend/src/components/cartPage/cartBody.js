/*
- create Actions
- add reducer
- combine reducer in store
- create action function and dispatch reducer within it
- add onClick handleAddToCart to 'Add to Cart' in product
- add handleAddToCart method to product
*/

import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {
  fetchCartItems,
  fetchProductItemQty,
  fetchProductTotalPrice,
} from '../../action/database.util';

import { useEffect, useState } from 'react';

import NavBar from '../navBar/NavBar';
import './cartBody.scss';
import { value } from 'lodash/seq';
import { BreadcrumbNav } from '../../routes/home/home.styles';
import {TOKEN} from "../../helper";
import profileItem from "../ProductProfile/ProfileItem";

export const Empty = () => {
  return (
    <div className='cart-empty'>
      <div className='cart-empty-msg'>
        <h2>Your cart is empty, but it doesn't have to be.</h2>
        <a href='/'>Continue shopping</a>
      </div>
    </div>
  );
};

const CartBody = () => {
  const dispatch = useDispatch();

  // const cartItems = useSelector(state => state?.cartReducer?.cartItems);
  const cartItems = JSON.parse(localStorage.getItem('cartArr'));
  const [cartArrItems, setCartArrItems] = useState(cartItems);

  const currentItemQty = useSelector(
    state => state?.ItemQtyReducer?.productItemQty
  );
  // console.log(currentItemQty);

  const removeItem = evt => {
    const targetClass = evt.target.className.split(' ');

    const newCartItems = cartArrItems.filter(
      cartItem => parseFloat(cartItem.totalPrice) !== parseFloat(targetClass[0])
    );

    setCartArrItems(newCartItems);

    localStorage.setItem('cartArr', JSON.stringify(newCartItems));
    window.location.reload();
  };

  const changeItemQuantity = evt => {
    let targetItemValue = evt.target.value;
    let targetItemArr = targetItemValue.split(' ');
    let cartItemID = targetItemArr[1];
    let targetItemQty = targetItemArr[0];
    let targetItemTotalPrice = targetItemArr[2];
    let newCartItems = [...cartArrItems];

    for (let i = 0; i < newCartItems.length; i++) {
      // if item id is equal to cartItem id
      if (
        parseFloat(cartItemID) === parseFloat(newCartItems[i].id) &&
        parseFloat(targetItemTotalPrice) ===
          parseFloat(newCartItems[i].totalPrice)
      ) {
        newCartItems[i].currentItemQty = targetItemQty;
        let newTotalPrice =
          parseFloat(targetItemQty) *
          (parseFloat(newCartItems[i].price) +
            parseFloat(newCartItems[i].selectedPrice));
        newCartItems[i].totalPrice = newTotalPrice;

        setCartArrItems(newCartItems);
        localStorage.setItem('cartArr', JSON.stringify(newCartItems));
        // evt.target.value = newCartItems[i].currentItemQty;

        // make sure the select element default value would change at this point
        const selectEle = document.getElementsByClassName(
          'product-quantity-select'
        );

        selectEle[0].defaultValue =
          newCartItems[i].currentItemQty +
          ' ' +
          newCartItems[i].id +
          ' ' +
          newCartItems[i].totalPrice;
      }
    }
  };

  const tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [checkout, setCheckout] = useState(false);

  const navigate = useNavigate()

  // const createOrder = (order) => {
  //   let items = {}
  //   items.taxRate = 1.13
  //   items.isActive = true
  //   items.isDelete = false
  //   items.orderItems = []
  //   order.map((newCartItems, index) => {
  //     items.orderItems.push({
  //       quantity: newCartItems.currentItemQty,
  //       product: newCartItems.id,
  //       profileItems: [],
  //     })
  //     profileItem.map((chair, index1) => {
  //       chair.profileItems.map((profileItem, index2) => {
  //         items.orderItems[index].profileItems.push(profileItem.id)
  //       })
  //     })
  //   })
  // }

  const clickCheckout = evt => {
    evt.target.style.display = 'none';
    setCheckout(true);
    localStorage.getItem(TOKEN) ? navigate('/address') : navigate('/account')

  };

  return (
    <>
      <NavBar />
      <div className='cart-main'>
        <div className='cart-container'>
          <BreadcrumbNav>
            <div className='breadcrumb-nav_ele'>
              <a href='/'>
                Office
                <i className='fa-solid fa-angle-right'></i>
              </a>
            </div>
            <div className='breadcrumb-nav_ele'>
              <a href='/cart'>
                Cart
                <i className='fa-solid fa-angle-right'></i>
              </a>
            </div>
          </BreadcrumbNav>
          <div className='cart-header'>
            <h1>My Cart</h1>
            <div className='header-content'>
              <p className='sub-1'>For orders, questions or concerns:</p>
              <p className='sub-2'>
                please call
                <span className='sub-3'>888 798 0202</span>
              </p>
            </div>
          </div>
          {cartArrItems === null || cartArrItems.length === 0 ? (
            <Empty />
          ) : (
            <table className='cart-table'>
              <thead>
                <tr>
                  <th className='cart-table-header'>Product Information</th>
                  <th className='cart-table-header'></th>
                  <th className='cart-table-header'>Availability</th>
                  <th className='cart-table-header'>Price</th>
                  <th className='cart-table-header'>Quantity</th>
                  <th className='cart-table-header'>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartArrItems?.map((cartItem, id) => {
                  return (
                    <tr key={id}>
                      <td className='resize-img'>
                        <img src={cartItem.imgUrl} alt='Chair Img' />
                      </td>
                      <td>
                        <div className='product-info-container'>
                          <div className='product-name'>{cartItem.name}</div>
                          <div className='product-selected-profile'>
                            <p>{cartItem.selectedProfile.FrameBase}</p>
                            <p>{cartItem.selectedProfile.Size}</p>
                            <p>{cartItem.selectedProfile.BackSupport}</p>
                            <p>{cartItem.selectedProfile.Tilt}</p>
                            <p>{cartItem.selectedProfile.Arms}</p>
                            <p>{cartItem.selectedProfile.ArmPad}</p>
                            <p>{cartItem.selectedProfile.Caster}</p>
                          </div>
                          <div className='edit-item'>Edit Item</div>
                          <div
                            className={
                              cartItem.totalPrice +
                              ' remove-item ' +
                              cartItem.id
                            }
                            onClick={removeItem}
                            value='0'
                          >
                            Remove Item
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='product-availability'>In Stock</div>
                      </td>
                      <td>
                        <div className='product-per-price'>
                          $
                          {parseFloat(cartItem.price) +
                            parseFloat(cartItem.selectedPrice)}
                        </div>
                      </td>
                      <td>
                        <div className='product-quantity'>
                          <select
                            className='product-quantity-select'
                            defaultValue={
                              cartItem.currentItemQty +
                              ' ' +
                              cartItem.id +
                              ' ' +
                              cartItem.totalPrice
                            }
                            onChange={changeItemQuantity}
                          >
                            {tempArray.map((ele, idx) => {
                              return (
                                <option
                                  value={
                                    ele +
                                    ' ' +
                                    cartItem.id +
                                    ' ' +
                                    cartItem.totalPrice
                                  }
                                  key={idx}
                                  className='selected-qty'
                                >
                                  {ele}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className='product-total-price'>
                          ${cartItem.totalPrice}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className='checkoutBtn'>
            <button onClick={clickCheckout}>Checkout</button>
            <div className={checkout ? 'checkout-box active' : 'checkout-box'}>
              <div className='paypal'>
                <img
                  src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICAgIDxwYXRoIGZpbGw9IiMwMDljZGUiIGQ9Ik0gMjAuOTA1IDkuNSBDIDIxLjE4NSA3LjQgMjAuOTA1IDYgMTkuNzgyIDQuNyBDIDE4LjU2NCAzLjMgMTYuNDExIDIuNiAxMy42OTcgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMy4xIDQuNjE1IDMuNiBMIDEuMzM5IDI1LjggQyAxLjMzOSAyNi4yIDEuNjIgMjYuNyAyLjA4OCAyNi43IEwgNi45NTYgMjYuNyBMIDYuNjc1IDI4LjkgQyA2LjU4MSAyOS4zIDYuODYyIDI5LjYgNy4yMzYgMjkuNiBMIDExLjM1NiAyOS42IEMgMTEuODI1IDI5LjYgMTIuMjkyIDI5LjMgMTIuMzg2IDI4LjggTCAxMi4zODYgMjguNSBMIDEzLjIyOCAyMy4zIEwgMTMuMjI4IDIzLjEgQyAxMy4zMjIgMjIuNiAxMy43OSAyMi4yIDE0LjI1OCAyMi4yIEwgMTQuODIxIDIyLjIgQyAxOC44NDUgMjIuMiAyMS45MzUgMjAuNSAyMi44NzEgMTUuNSBDIDIzLjMzOSAxMy40IDIzLjE1MyAxMS43IDIyLjAyOSAxMC41IEMgMjEuNzQ4IDEwLjEgMjEuMjc5IDkuOCAyMC45MDUgOS41IEwgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTSAyMC45MDUgOS41IEMgMjEuMTg1IDcuNCAyMC45MDUgNiAxOS43ODIgNC43IEMgMTguNTY0IDMuMyAxNi40MTEgMi42IDEzLjY5NyAyLjYgTCA1LjczOSAyLjYgQyA1LjI3MSAyLjYgNC43MSAzLjEgNC42MTUgMy42IEwgMS4zMzkgMjUuOCBDIDEuMzM5IDI2LjIgMS42MiAyNi43IDIuMDg4IDI2LjcgTCA2Ljk1NiAyNi43IEwgOC4yNjcgMTguNCBMIDguMTczIDE4LjcgQyA4LjI2NyAxOC4xIDguNzM1IDE3LjcgOS4yOTYgMTcuNyBMIDExLjYzNiAxNy43IEMgMTYuMjI0IDE3LjcgMTkuNzgyIDE1LjcgMjAuOTA1IDEwLjEgQyAyMC44MTIgOS44IDIwLjkwNSA5LjcgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA5LjQ4NSA5LjUgQyA5LjU3NyA5LjIgOS43NjUgOC45IDEwLjA0NiA4LjcgQyAxMC4yMzIgOC43IDEwLjMyNiA4LjYgMTAuNTEzIDguNiBMIDE2LjY5MiA4LjYgQyAxNy40NDIgOC42IDE4LjE4OSA4LjcgMTguNzUzIDguOCBDIDE4LjkzOSA4LjggMTkuMTI3IDguOCAxOS4zMTQgOC45IEMgMTkuNTAxIDkgMTkuNjg4IDkgMTkuNzgyIDkuMSBDIDE5Ljg3NSA5LjEgMTkuOTY4IDkuMSAyMC4wNjMgOS4xIEMgMjAuMzQzIDkuMiAyMC42MjQgOS40IDIwLjkwNSA5LjUgQyAyMS4xODUgNy40IDIwLjkwNSA2IDE5Ljc4MiA0LjYgQyAxOC42NTggMy4yIDE2LjUwNiAyLjYgMTMuNzkgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMyA0LjYxNSAzLjYgTCAxLjMzOSAyNS44IEMgMS4zMzkgMjYuMiAxLjYyIDI2LjcgMi4wODggMjYuNyBMIDYuOTU2IDI2LjcgTCA4LjI2NyAxOC40IEwgOS40ODUgOS41IFoiPjwvcGF0aD4KPC9zdmc+Cg'
                  alt=''
                />
                <img
                  src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiB4bWxucz0iaHR0cDomI3gyRjsmI3gyRjt3d3cudzMub3JnJiN4MkY7MjAwMCYjeDJGO3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCI+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAxMiA0LjkxNyBMIDQuMiA0LjkxNyBDIDMuNyA0LjkxNyAzLjIgNS4zMTcgMy4xIDUuODE3IEwgMCAyNS44MTcgQyAtMC4xIDI2LjIxNyAwLjIgMjYuNTE3IDAuNiAyNi41MTcgTCA0LjMgMjYuNTE3IEMgNC44IDI2LjUxNyA1LjMgMjYuMTE3IDUuNCAyNS42MTcgTCA2LjIgMjAuMjE3IEMgNi4zIDE5LjcxNyA2LjcgMTkuMzE3IDcuMyAxOS4zMTcgTCA5LjggMTkuMzE3IEMgMTQuOSAxOS4zMTcgMTcuOSAxNi44MTcgMTguNyAxMS45MTcgQyAxOSA5LjgxNyAxOC43IDguMTE3IDE3LjcgNi45MTcgQyAxNi42IDUuNjE3IDE0LjYgNC45MTcgMTIgNC45MTcgWiBNIDEyLjkgMTIuMjE3IEMgMTIuNSAxNS4wMTcgMTAuMyAxNS4wMTcgOC4zIDE1LjAxNyBMIDcuMSAxNS4wMTcgTCA3LjkgOS44MTcgQyA3LjkgOS41MTcgOC4yIDkuMzE3IDguNSA5LjMxNyBMIDkgOS4zMTcgQyAxMC40IDkuMzE3IDExLjcgOS4zMTcgMTIuNCAxMC4xMTcgQyAxMi45IDEwLjUxNyAxMy4xIDExLjIxNyAxMi45IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAzNS4yIDEyLjExNyBMIDMxLjUgMTIuMTE3IEMgMzEuMiAxMi4xMTcgMzAuOSAxMi4zMTcgMzAuOSAxMi42MTcgTCAzMC43IDEzLjYxNyBMIDMwLjQgMTMuMjE3IEMgMjkuNiAxMi4wMTcgMjcuOCAxMS42MTcgMjYgMTEuNjE3IEMgMjEuOSAxMS42MTcgMTguNCAxNC43MTcgMTcuNyAxOS4xMTcgQyAxNy4zIDIxLjMxNyAxNy44IDIzLjQxNyAxOS4xIDI0LjgxNyBDIDIwLjIgMjYuMTE3IDIxLjkgMjYuNzE3IDIzLjggMjYuNzE3IEMgMjcuMSAyNi43MTcgMjkgMjQuNjE3IDI5IDI0LjYxNyBMIDI4LjggMjUuNjE3IEMgMjguNyAyNi4wMTcgMjkgMjYuNDE3IDI5LjQgMjYuNDE3IEwgMzIuOCAyNi40MTcgQyAzMy4zIDI2LjQxNyAzMy44IDI2LjAxNyAzMy45IDI1LjUxNyBMIDM1LjkgMTIuNzE3IEMgMzYgMTIuNTE3IDM1LjYgMTIuMTE3IDM1LjIgMTIuMTE3IFogTSAzMC4xIDE5LjMxNyBDIDI5LjcgMjEuNDE3IDI4LjEgMjIuOTE3IDI1LjkgMjIuOTE3IEMgMjQuOCAyMi45MTcgMjQgMjIuNjE3IDIzLjQgMjEuOTE3IEMgMjIuOCAyMS4yMTcgMjIuNiAyMC4zMTcgMjIuOCAxOS4zMTcgQyAyMy4xIDE3LjIxNyAyNC45IDE1LjcxNyAyNyAxNS43MTcgQyAyOC4xIDE1LjcxNyAyOC45IDE2LjExNyAyOS41IDE2LjcxNyBDIDMwIDE3LjQxNyAzMC4yIDE4LjMxNyAzMC4xIDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA1NS4xIDEyLjExNyBMIDUxLjQgMTIuMTE3IEMgNTEgMTIuMTE3IDUwLjcgMTIuMzE3IDUwLjUgMTIuNjE3IEwgNDUuMyAyMC4yMTcgTCA0My4xIDEyLjkxNyBDIDQzIDEyLjQxNyA0Mi41IDEyLjExNyA0Mi4xIDEyLjExNyBMIDM4LjQgMTIuMTE3IEMgMzggMTIuMTE3IDM3LjYgMTIuNTE3IDM3LjggMTMuMDE3IEwgNDEuOSAyNS4xMTcgTCAzOCAzMC41MTcgQyAzNy43IDMwLjkxNyAzOCAzMS41MTcgMzguNSAzMS41MTcgTCA0Mi4yIDMxLjUxNyBDIDQyLjYgMzEuNTE3IDQyLjkgMzEuMzE3IDQzLjEgMzEuMDE3IEwgNTUuNiAxMy4wMTcgQyA1NS45IDEyLjcxNyA1NS42IDEyLjExNyA1NS4xIDEyLjExNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny41IDQuOTE3IEwgNTkuNyA0LjkxNyBDIDU5LjIgNC45MTcgNTguNyA1LjMxNyA1OC42IDUuODE3IEwgNTUuNSAyNS43MTcgQyA1NS40IDI2LjExNyA1NS43IDI2LjQxNyA1Ni4xIDI2LjQxNyBMIDYwLjEgMjYuNDE3IEMgNjAuNSAyNi40MTcgNjAuOCAyNi4xMTcgNjAuOCAyNS44MTcgTCA2MS43IDIwLjExNyBDIDYxLjggMTkuNjE3IDYyLjIgMTkuMjE3IDYyLjggMTkuMjE3IEwgNjUuMyAxOS4yMTcgQyA3MC40IDE5LjIxNyA3My40IDE2LjcxNyA3NC4yIDExLjgxNyBDIDc0LjUgOS43MTcgNzQuMiA4LjAxNyA3My4yIDYuODE3IEMgNzIgNS42MTcgNzAuMSA0LjkxNyA2Ny41IDQuOTE3IFogTSA2OC40IDEyLjIxNyBDIDY4IDE1LjAxNyA2NS44IDE1LjAxNyA2My44IDE1LjAxNyBMIDYyLjYgMTUuMDE3IEwgNjMuNCA5LjgxNyBDIDYzLjQgOS41MTcgNjMuNyA5LjMxNyA2NCA5LjMxNyBMIDY0LjUgOS4zMTcgQyA2NS45IDkuMzE3IDY3LjIgOS4zMTcgNjcuOSAxMC4xMTcgQyA2OC40IDEwLjUxNyA2OC41IDExLjIxNyA2OC40IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC43IDEyLjExNyBMIDg3IDEyLjExNyBDIDg2LjcgMTIuMTE3IDg2LjQgMTIuMzE3IDg2LjQgMTIuNjE3IEwgODYuMiAxMy42MTcgTCA4NS45IDEzLjIxNyBDIDg1LjEgMTIuMDE3IDgzLjMgMTEuNjE3IDgxLjUgMTEuNjE3IEMgNzcuNCAxMS42MTcgNzMuOSAxNC43MTcgNzMuMiAxOS4xMTcgQyA3Mi44IDIxLjMxNyA3My4zIDIzLjQxNyA3NC42IDI0LjgxNyBDIDc1LjcgMjYuMTE3IDc3LjQgMjYuNzE3IDc5LjMgMjYuNzE3IEMgODIuNiAyNi43MTcgODQuNSAyNC42MTcgODQuNSAyNC42MTcgTCA4NC4zIDI1LjYxNyBDIDg0LjIgMjYuMDE3IDg0LjUgMjYuNDE3IDg0LjkgMjYuNDE3IEwgODguMyAyNi40MTcgQyA4OC44IDI2LjQxNyA4OS4zIDI2LjAxNyA4OS40IDI1LjUxNyBMIDkxLjQgMTIuNzE3IEMgOTEuNCAxMi41MTcgOTEuMSAxMi4xMTcgOTAuNyAxMi4xMTcgWiBNIDg1LjUgMTkuMzE3IEMgODUuMSAyMS40MTcgODMuNSAyMi45MTcgODEuMyAyMi45MTcgQyA4MC4yIDIyLjkxNyA3OS40IDIyLjYxNyA3OC44IDIxLjkxNyBDIDc4LjIgMjEuMjE3IDc4IDIwLjMxNyA3OC4yIDE5LjMxNyBDIDc4LjUgMTcuMjE3IDgwLjMgMTUuNzE3IDgyLjQgMTUuNzE3IEMgODMuNSAxNS43MTcgODQuMyAxNi4xMTcgODQuOSAxNi43MTcgQyA4NS41IDE3LjQxNyA4NS43IDE4LjMxNyA4NS41IDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5NS4xIDUuNDE3IEwgOTEuOSAyNS43MTcgQyA5MS44IDI2LjExNyA5Mi4xIDI2LjQxNyA5Mi41IDI2LjQxNyBMIDk1LjcgMjYuNDE3IEMgOTYuMiAyNi40MTcgOTYuNyAyNi4wMTcgOTYuOCAyNS41MTcgTCAxMDAgNS42MTcgQyAxMDAuMSA1LjIxNyA5OS44IDQuOTE3IDk5LjQgNC45MTcgTCA5NS44IDQuOTE3IEMgOTUuNCA0LjkxNyA5NS4yIDUuMTE3IDk1LjEgNS40MTcgWiI+PC9wYXRoPjwvc3ZnPg'
                  alt=''
                />
                <span>Checkout</span>
              </div>
              <div className='paypal-button'>
                <img
                  src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMCAxLjkyN0MwIC44NjMuODkyIDAgMS45OTIgMGgzNi4wMTZDMzkuMTA4IDAgNDAgLjg2MyA0MCAxLjkyN3YyMC4xNDZDNDAgMjMuMTM3IDM5LjEwOCAyNCAzOC4wMDggMjRIMS45OTJDLjg5MiAyNCAwIDIzLjEzNyAwIDIyLjA3M1YxLjkyN3oiIHN0eWxlPSJmaWxsOiByZ2IoMzMsIDg2LCAxNTQpOyIvPgogIDxwYXRoIGQ9Ik0xOS41OTYgNy44ODVsLTIuMTEgOS40NzhIMTQuOTNsMi4xMS05LjQ3OGgyLjU1NHptMTAuNzQzIDYuMTJsMS4zNDMtMy41Ni43NzMgMy41NkgzMC4zNHptMi44NSAzLjM1OGgyLjM2bC0yLjA2My05LjQ3OEgzMS4zMWMtLjQ5MiAwLS45MDUuMjc0LTEuMDg4LjY5NWwtMy44MzIgOC43ODNoMi42ODJsLjUzMi0xLjQxNWgzLjI3NmwuMzEgMS40MTV6bS02LjY2Ny0zLjA5NGMuMDEtMi41MDItMy42LTIuNjQtMy41NzctMy43Ni4wMDgtLjMzOC4zNDUtLjcgMS4wODMtLjc5My4zNjUtLjA0NSAxLjM3My0uMDggMi41MTcuNDI1bC40NDgtMi4wMWMtLjYxNS0uMjE0LTEuNDA1LS40Mi0yLjM5LS40Mi0yLjUyMyAwLTQuMyAxLjI4OC00LjMxMyAzLjEzMy0uMDE2IDEuMzY0IDEuMjY4IDIuMTI1IDIuMjM0IDIuNTguOTk2LjQ2NCAxLjMzLjc2MiAxLjMyNSAxLjE3Ny0uMDA2LjYzNi0uNzkzLjkxOC0xLjUyNi45MjgtMS4yODUuMDItMi4wMy0uMzMzLTIuNjIzLS42bC0uNDYyIDIuMDhjLjU5OC4yNjIgMS43LjQ5IDIuODQuNTAyIDIuNjgyIDAgNC40MzctMS4yNzMgNC40NDUtMy4yNDN6TTE1Ljk0OCA3Ljg4NGwtNC4xMzggOS40NzhoLTIuN0w3LjA3NiA5LjhjLS4xMjMtLjQ2Ni0uMjMtLjYzNy0uNjA2LS44MzQtLjYxNS0uMzItMS42My0uNjItMi41Mi0uODA2bC4wNi0uMjc1aDQuMzQ1Yy41NTQgMCAxLjA1Mi4zNTQgMS4xNzguOTY2bDEuMDc2IDUuNDg2IDIuNjU1LTYuNDVoMi42ODN6IiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyIvPgo8L3N2Zz4'
                  alt=''
                />
                <img
                  src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMCAxLjkyN0MwIC44NjMuODkyIDAgMS45OTIgMGgzNi4wMTZDMzkuMTA4IDAgNDAgLjg2MyA0MCAxLjkyN3YyMC4xNDZDNDAgMjMuMTM3IDM5LjEwOCAyNCAzOC4wMDggMjRIMS45OTJDLjg5MiAyNCAwIDIzLjEzNyAwIDIyLjA3M1YxLjkyN3oiIHN0eWxlPSJmaWxsOiByZ2IoNjIsIDU3LCA1Nyk7Ii8+CiAgPHBhdGggc3R5bGU9ImZpbGw6IHJnYigyNTUsIDk1LCAwKTsiIGQ9Ik0gMjIuMjA1IDMuOTAxIEwgMTUuNjg4IDMuOTAxIEwgMTUuNjg4IDE1LjU4OSBMIDIyLjIwNSAxNS41ODkiLz4KICA8cGF0aCBkPSJNIDE2LjEgOS43NDcgQyAxNi4xIDcuMzcxIDE3LjIxOCA1LjI2NSAxOC45MzUgMy45MDEgQyAxNy42NyAyLjkxMiAxNi4wNzggMi4zMTIgMTQuMzQyIDIuMzEyIEMgMTAuMjIzIDIuMzEyIDYuODkyIDUuNjM2IDYuODkyIDkuNzQ2IEMgNi44OTIgMTMuODUzIDEwLjIyMyAxNy4xNzggMTQuMzQyIDE3LjE3OCBDIDE2LjA3OCAxNy4xNzggMTcuNjcgMTYuNTggMTguOTM1IDE1LjU4OCBDIDE3LjIxNiAxNC4yNDYgMTYuMDk5IDEyLjExOSAxNi4wOTkgOS43NDUgWiIgc3R5bGU9ImZpbGw6IHJnYigyMzUsIDAsIDI3KTsiLz4KICA8cGF0aCBkPSJNIDMwLjk5NiA5Ljc0NyBDIDMwLjk5NiAxMy44NTQgMjcuNjYzIDE3LjE3OSAyMy41NDcgMTcuMTc5IEMgMjEuODEgMTcuMTc5IDIwLjIxNiAxNi41ODEgMTguOTU0IDE1LjU4OSBDIDIwLjY5MSAxNC4yMjcgMjEuNzg4IDEyLjEyIDIxLjc4OCA5Ljc0NiBDIDIxLjc4OCA3LjM3IDIwLjY3MSA1LjI2NCAxOC45NTQgMy45IEMgMjAuMjE2IDIuOTExIDIxLjgxIDIuMzExIDIzLjU0NyAyLjMxMSBDIDI3LjY2MyAyLjMxMSAzMC45OTYgNS42NTcgMzAuOTk2IDkuNzQ1IFoiIHN0eWxlPSJmaWxsOiByZ2IoMjQ3LCAxNTgsIDI3KTsiLz4KICA8cGF0aCBkPSJNIDcuMTY3IDIyLjQ4MSBMIDcuMTY3IDIwLjQzIEMgNy4xNjcgMTkuNjQxIDYuNjg1IDE5LjEyNyA1Ljg1NyAxOS4xMjcgQyA1LjQ0MyAxOS4xMjcgNC45OTMgMTkuMjYyIDQuNjgzIDE5LjcxIEMgNC40NCAxOS4zMzIgNC4wOTYgMTkuMTI3IDMuNTc5IDE5LjEyNyBDIDMuMjMzIDE5LjEyNyAyLjg4OCAxOS4yMyAyLjYxMiAxOS42MDcgTCAyLjYxMiAxOS4xOTcgTCAxLjg4NiAxOS4xOTcgTCAxLjg4NiAyMi40ODEgTCAyLjYxMiAyMi40ODEgTCAyLjYxMiAyMC42NjggQyAyLjYxMiAyMC4wODYgMi45MjEgMTkuODEyIDMuNDA2IDE5LjgxMiBDIDMuODg4IDE5LjgxMiA0LjEzMSAyMC4xMjEgNC4xMzEgMjAuNjY5IEwgNC4xMzEgMjIuNDgxIEwgNC44NTYgMjIuNDgxIEwgNC44NTYgMjAuNjY4IEMgNC44NTYgMjAuMDg2IDUuMjA0IDE5LjgxMiA1LjY1MSAxOS44MTIgQyA2LjEzNyAxOS44MTIgNi4zNzcgMjAuMTIxIDYuMzc3IDIwLjY2OSBMIDYuMzc3IDIyLjQ4MSBMIDcuMTcxIDIyLjQ4MSBaIE0gMTcuOTA5IDE5LjE5NyBMIDE2LjczNCAxOS4xOTcgTCAxNi43MzQgMTguMjA0IEwgMTYuMDA3IDE4LjIwNCBMIDE2LjAwNyAxOS4xOTcgTCAxNS4zNTIgMTkuMTk3IEwgMTUuMzUyIDE5Ljg0NSBMIDE2LjAwNyAxOS44NDUgTCAxNi4wMDcgMjEuMzUxIEMgMTYuMDA3IDIyLjEwNiAxNi4zMTkgMjIuNTUxIDE3LjE0NiAyMi41NTEgQyAxNy40NTkgMjIuNTUxIDE3LjgwNCAyMi40NDkgMTguMDQ0IDIyLjMwOSBMIDE3LjgzOSAyMS42OTUgQyAxNy42MzIgMjEuODMxIDE3LjM4OSAyMS44NjcgMTcuMjE2IDIxLjg2NyBDIDE2Ljg3MiAyMS44NjcgMTYuNzM0IDIxLjY2IDE2LjczNCAyMS4zMTkgTCAxNi43MzQgMTkuODQ3IEwgMTcuOTA5IDE5Ljg0NyBMIDE3LjkwOSAxOS4xOTggWiBNIDI0LjA1MyAxOS4xMjcgQyAyMy42MzkgMTkuMTI3IDIzLjM2NCAxOS4zMzIgMjMuMTkxIDE5LjYwNyBMIDIzLjE5MSAxOS4xOTcgTCAyMi40NjUgMTkuMTk3IEwgMjIuNDY1IDIyLjQ4MSBMIDIzLjE5MSAyMi40ODEgTCAyMy4xOTEgMjAuNjMzIEMgMjMuMTkxIDIwLjA4NiAyMy40MzQgMTkuNzc3IDIzLjg4MiAxOS43NzcgQyAyNC4wMTggMTkuNzc3IDI0LjE5MiAxOS44MTIgMjQuMzMgMTkuODQ3IEwgMjQuNTM4IDE5LjE2MiBDIDI0LjQwMSAxOS4xMjcgMjQuMTkyIDE5LjEyNyAyNC4wNTIgMTkuMTI3IFogTSAxNC43NjUgMTkuNDY5IEMgMTQuNDIgMTkuMjI5IDEzLjkzNyAxOS4xMjcgMTMuNDE4IDE5LjEyNyBDIDEyLjU4OCAxOS4xMjcgMTIuMDM2IDE5LjUzOCAxMi4wMzYgMjAuMTg4IEMgMTIuMDM2IDIwLjczNiAxMi40NTMgMjEuMDQ0IDEzLjE3NSAyMS4xNDYgTCAxMy41MjQgMjEuMTgxIEMgMTMuOTAzIDIxLjI0OSAxNC4xMDggMjEuMzUxIDE0LjEwOCAyMS41MjMgQyAxNC4xMDggMjEuNzY1IDEzLjgzMiAyMS45MzQgMTMuMzUgMjEuOTM0IEMgMTIuODY0IDIxLjkzNCAxMi40ODQgMjEuNzY0IDEyLjI0NCAyMS41OTIgTCAxMS44OTggMjIuMTM5IEMgMTIuMjc4IDIyLjQxMSAxMi43OTQgMjIuNTQ5IDEzLjMxMyAyMi41NDkgQyAxNC4yOCAyMi41NDkgMTQuODMxIDIyLjEwNSAxNC44MzEgMjEuNDg4IEMgMTQuODMxIDIwLjkwOCAxNC4zODMgMjAuNTk5IDEzLjY5MiAyMC40OTYgTCAxMy4zNDggMjAuNDYyIEMgMTMuMDM3IDIwLjQyOCAxMi43OTUgMjAuMzYgMTIuNzk1IDIwLjE1NSBDIDEyLjc5NSAxOS45MTQgMTMuMDM4IDE5Ljc3NyAxMy40MTggMTkuNzc3IEMgMTMuODMgMTkuNzc3IDE0LjI0NSAxOS45NDkgMTQuNDUzIDIwLjA1MiBMIDE0Ljc2NCAxOS40NjkgWiBNIDM0LjAzMyAxOS4xMjcgQyAzMy42MTggMTkuMTI3IDMzLjM0MiAxOS4zMzIgMzMuMTcxIDE5LjYwNyBMIDMzLjE3MSAxOS4xOTcgTCAzMi40NDUgMTkuMTk3IEwgMzIuNDQ1IDIyLjQ4MSBMIDMzLjE3MSAyMi40ODEgTCAzMy4xNzEgMjAuNjMzIEMgMzMuMTcxIDIwLjA4NiAzMy40MTQgMTkuNzc3IDMzLjg2MiAxOS43NzcgQyAzMy45OTggMTkuNzc3IDM0LjE3IDE5LjgxMiAzNC4zMDcgMTkuODQ3IEwgMzQuNTE1IDE5LjE2MiBDIDM0LjM4IDE5LjEyNyAzNC4xNzIgMTkuMTI3IDM0LjAzMyAxOS4xMjcgWiBNIDI0Ljc3OSAyMC44MzggQyAyNC43NzkgMjEuODM0IDI1LjQ3IDIyLjU1MSAyNi41NCAyMi41NTEgQyAyNy4wMjUgMjIuNTUxIDI3LjM2OSAyMi40NDkgMjcuNzE1IDIyLjE3MyBMIDI3LjM2OSAyMS41OTMgQyAyNy4wOTIgMjEuNzk4IDI2LjgxNiAyMS45MDEgMjYuNTA0IDIxLjkwMSBDIDI1LjkxOSAyMS45MDEgMjUuNTA1IDIxLjQ5IDI1LjUwNSAyMC44NCBDIDI1LjUwNSAyMC4yMjYgMjUuOTE5IDE5LjgxMyAyNi41MDcgMTkuNzggQyAyNi44MTYgMTkuNzggMjcuMDkyIDE5Ljg4MyAyNy4zNjkgMjAuMDg5IEwgMjcuNzE1IDE5LjUwNyBDIDI3LjM2OSAxOS4yMzMgMjcuMDI0IDE5LjEzIDI2LjU0IDE5LjEzIEMgMjUuNDcgMTkuMTMgMjQuNzc5IDE5Ljg1IDI0Ljc3OSAyMC44NDEgWiBNIDMxLjQ3OCAyMC44MzggTCAzMS40NzggMTkuMTk4IEwgMzAuNzUgMTkuMTk4IEwgMzAuNzUgMTkuNjA4IEMgMzAuNTEgMTkuMyAzMC4xNjUgMTkuMTI4IDI5LjcxNyAxOS4xMjggQyAyOC43ODQgMTkuMTI4IDI4LjA1OCAxOS44NDggMjguMDU4IDIwLjg0IEMgMjguMDU4IDIxLjgzNSAyOC43ODQgMjIuNTUyIDI5LjcxNiAyMi41NTIgQyAzMC4xOTcgMjIuNTUyIDMwLjU0MyAyMi4zODIgMzAuNzQ4IDIyLjA3NCBMIDMwLjc0OCAyMi40ODQgTCAzMS40NzcgMjIuNDg0IEwgMzEuNDc3IDIwLjg0IFogTSAyOC44MTggMjAuODM4IEMgMjguODE4IDIwLjI1OSAyOS4xOTYgMTkuNzc5IDI5LjgxOSAxOS43NzkgQyAzMC40MDYgMTkuNzc5IDMwLjgyMSAyMC4yMjQgMzAuODIxIDIwLjg0IEMgMzAuODIxIDIxLjQyNCAzMC40MDYgMjEuOTAyIDI5LjgxOSAyMS45MDIgQyAyOS4xOTYgMjEuODY5IDI4LjgxOCAyMS40MjQgMjguODE4IDIwLjg0MSBaIE0gMjAuMTQ4IDE5LjEyOCBDIDE5LjE4MyAxOS4xMjggMTguNDk0IDE5LjgxMyAxOC40OTQgMjAuODQgQyAxOC40OTQgMjEuODY5IDE5LjE4MyAyMi41NTIgMjAuMTg1IDIyLjU1MiBDIDIwLjY3MSAyMi41NTIgMjEuMTU0IDIyLjQxNyAyMS41MzMgMjIuMTA4IEwgMjEuMTg4IDIxLjU5NSBDIDIwLjkxNCAyMS43OTkgMjAuNTY1IDIxLjkzNyAyMC4yMjIgMjEuOTM3IEMgMTkuNzcyIDIxLjkzNyAxOS4zMjMgMjEuNzMyIDE5LjIxOSAyMS4xNDkgTCAyMS42NzEgMjEuMTQ5IEwgMjEuNjcxIDIwLjg3OCBDIDIxLjcwNSAxOS44MTUgMjEuMDgzIDE5LjEzIDIwLjE1IDE5LjEzIFogTSAyMC4xNDggMTkuNzQ4IEMgMjAuNiAxOS43NDggMjAuOTExIDIwLjAxOSAyMC45OCAyMC41MzIgTCAxOS4yNTMgMjAuNTMyIEMgMTkuMzIxIDIwLjA4NyAxOS42MzMgMTkuNzQ4IDIwLjE0OCAxOS43NDggWiBNIDM4LjE0MSAyMC44NCBMIDM4LjE0MSAxNy44OTggTCAzNy40MTIgMTcuODk4IEwgMzcuNDEyIDE5LjYxIEMgMzcuMTczIDE5LjMwMiAzNi44MjggMTkuMTMgMzYuMzggMTkuMTMgQyAzNS40NDYgMTkuMTMgMzQuNzIxIDE5Ljg1IDM0LjcyMSAyMC44NDEgQyAzNC43MjEgMjEuODM3IDM1LjQ0NiAyMi41NTQgMzYuMzc5IDIyLjU1NCBDIDM2Ljg2MSAyMi41NTQgMzcuMjA2IDIyLjM4MyAzNy40MSAyMi4wNzYgTCAzNy40MSAyMi40ODYgTCAzOC4xNCAyMi40ODYgTCAzOC4xNCAyMC44NDEgWiBNIDM1LjQ4MSAyMC44NCBDIDM1LjQ4MSAyMC4yNjEgMzUuODYxIDE5Ljc4IDM2LjQ4NCAxOS43OCBDIDM3LjA2OSAxOS43OCAzNy40ODYgMjAuMjI2IDM3LjQ4NiAyMC44NDEgQyAzNy40ODYgMjEuNDI2IDM3LjA2OSAyMS45MDQgMzYuNDg0IDIxLjkwNCBDIDM1Ljg2MSAyMS44NyAzNS40ODEgMjEuNDI2IDM1LjQ4MSAyMC44NDMgWiBNIDExLjIzNyAyMC44NCBMIDExLjIzNyAxOS4yIEwgMTAuNTE1IDE5LjIgTCAxMC41MTUgMTkuNjEgQyAxMC4yNzIgMTkuMzAyIDkuOTI4IDE5LjEzIDkuNDc4IDE5LjEzIEMgOC41NDUgMTkuMTMgNy44MiAxOS44NSA3LjgyIDIwLjg0MSBDIDcuODIgMjEuODM3IDguNTQ1IDIyLjU1NCA5LjQ3NyAyMi41NTQgQyA5Ljk2IDIyLjU1NCAxMC4zMDQgMjIuMzgzIDEwLjUxMiAyMi4wNzYgTCAxMC41MTIgMjIuNDg2IEwgMTEuMjM2IDIyLjQ4NiBMIDExLjIzNiAyMC44NDEgWiBNIDguNTQ2IDIwLjg0IEMgOC41NDYgMjAuMjYxIDguOTI2IDE5Ljc4IDkuNTQ4IDE5Ljc4IEMgMTAuMTM0IDE5Ljc4IDEwLjU1IDIwLjIyNiAxMC41NSAyMC44NDEgQyAxMC41NSAyMS40MjYgMTAuMTM0IDIxLjkwNCA5LjU0OCAyMS45MDQgQyA4LjkyNiAyMS44NyA4LjU0NiAyMS40MjYgOC41NDYgMjAuODQzIFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+Cjwvc3ZnPg'
                  alt=''
                />
                <img
                  src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMzguMzMzIDI0SDEuNjY3Qy43NSAyNCAwIDIzLjI4IDAgMjIuNFYxLjZDMCAuNzIuNzUgMCAxLjY2NyAwaDM2LjY2NkMzOS4yNSAwIDQwIC43MiA0MCAxLjZ2MjAuOGMwIC44OC0uNzUgMS42LTEuNjY3IDEuNnoiIHN0eWxlPSJmaWxsOiByZ2IoMjAsIDExOSwgMTkwKTsiLz4KICA8cGF0aCBkPSJNNi4yNiAxMi4zMmgyLjMxM0w3LjQxNSA5LjY2TTI3LjM1MyA5Ljk3N2gtMy43Mzh2MS4yM2gzLjY2NnYxLjM4NGgtMy42NzV2MS4zODVoMy44MjF2MS4wMDVjLjYyMy0uNzcgMS4zMy0xLjQ2NiAyLjAyNS0yLjIzNWwuNzA3LS43N2MtLjkzNC0xLjAwNC0xLjg3LTIuMDgtMi44MDQtMy4wNzV2MS4wNzd6IiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyIvPgogIDxwYXRoIGQ9Ik0zOC4yNSA3aC01LjYwNWwtMS4zMjggMS40TDMwLjA3MiA3SDE2Ljk4NGwtMS4wMTcgMi40MTZMMTQuODc3IDdoLTkuNThMMS4yNSAxNi41aDQuODI2bC42MjMtMS41NTZoMS40bC42MjMgMS41NTZIMjkuOTlsMS4zMjctMS40ODMgMS4zMjggMS40ODNoNS42MDVsLTQuMzYtNC42NjdMMzguMjUgN3ptLTE3LjY4NSA4LjFoLTEuNTU3VjkuODgzTDE2LjY3MyAxNS4xaC0xLjMzTDEzLjAxIDkuODgzbC0uMDg0IDUuMjE3SDkuNzNsLS42MjMtMS41NTZoLTMuMjdMNS4xMzIgMTUuMUgzLjQybDIuODg0LTYuNzcyaDIuNDJsMi42NDUgNi4yMzNWOC4zM2gyLjY0NmwyLjEwNyA0LjUxIDEuODY4LTQuNTFoMi41NzVWMTUuMXptMTQuNzI3IDBoLTIuMDI0bC0yLjAyNC0yLjI2LTIuMDIzIDIuMjZIMjIuMDZWOC4zMjhIMjkuNTNsMS43OTUgMi4xNzcgMi4wMjQtMi4xNzdoMi4wMjVMMzIuMjYgMTEuNzVsMy4wMzIgMy4zNXoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+Cjwvc3ZnPg'
                  alt=''
                />
                <img
                  src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMzguMzMzIDI0SDEuNjY3Qy43NSAyNCAwIDIzLjI4IDAgMjIuNFYxLjZDMCAuNzIuNzUgMCAxLjY2NyAwaDM2LjY2NkMzOS4yNSAwIDQwIC43MiA0MCAxLjZ2MjAuOGMwIC44OC0uNzUgMS42LTEuNjY3IDEuNnoiIHN0eWxlPSJmaWxsOiByZ2IoMTcsIDQ5LCA4Mik7Ii8+CiAgPHBhdGggZD0iTSA1LjQ5OCAxMy4zNDkgQyA1LjE2IDEzLjY1NCA0LjcyMiAxMy43ODcgNC4wMjggMTMuNzg3IEwgMy43MzggMTMuNzg3IEwgMy43MzggMTAuMTQxIEwgNC4wMjggMTAuMTQxIEMgNC43MjIgMTAuMTQxIDUuMTQzIDEwLjI2NSA1LjQ5OCAxMC41ODcgQyA1Ljg2OCAxMC45MTcgNi4wOTMgMTEuNDMxIDYuMDkzIDExLjk1OSBDIDYuMDkzIDEyLjQ4OSA1Ljg2OSAxMy4wMTkgNS40OTggMTMuMzQ5IFogTSA0LjI0MyA5LjIwNiBMIDIuNjY2IDkuMjA2IEwgMi42NjYgMTQuNzIxIEwgNC4yMzYgMTQuNzIxIEMgNS4wNjkgMTQuNzIxIDUuNjcxIDE0LjUyNCA2LjE5OSAxNC4wODQgQyA2LjgyOSAxMy41NjQgNy4xOTkgMTIuNzc5IDcuMTk5IDExLjk2OCBDIDcuMTk5IDEwLjM0IDUuOTg1IDkuMjA2IDQuMjQzIDkuMjA2IFogTSA3LjY5NiAxNC43MjEgTCA4Ljc3IDE0LjcyMSBMIDguNzcgOS4yMDcgTCA3LjY5NiA5LjIwNyBNIDExLjM5MyAxMS4zMjMgQyAxMC43NDggMTEuMDgzIDEwLjU1OSAxMC45MjYgMTAuNTU5IDEwLjYyOCBDIDEwLjU1OSAxMC4yODEgMTAuODk3IDEwLjAxOCAxMS4zNTkgMTAuMDE4IEMgMTEuNjgxIDEwLjAxOCAxMS45NDYgMTAuMTUgMTIuMjI2IDEwLjQ2NCBMIDEyLjc4OCA5LjcyNyBDIDEyLjMyNiA5LjMyMiAxMS43NzMgOS4xMTUgMTEuMTcgOS4xMTUgQyAxMC4xOTUgOS4xMTUgOS40NTIgOS43OTMgOS40NTIgMTAuNjk1IEMgOS40NTIgMTEuNDU1IDkuNzk4IDExLjg0NSAxMC44MDcgMTIuMjA4IEMgMTEuMjI3IDEyLjM1NiAxMS40NDIgMTIuNDU1IDExLjU1IDEyLjUyMiBDIDExLjc2NSAxMi42NjIgMTEuODcyIDEyLjg2MiAxMS44NzIgMTMuMDkyIEMgMTEuODcyIDEzLjU0IDExLjUxOCAxMy44NzIgMTEuMDM4IDEzLjg3MiBDIDEwLjUyOCAxMy44NzIgMTAuMTE0IDEzLjYxNCA5Ljg2OCAxMy4xMzYgTCA5LjE3MyAxMy44MDYgQyA5LjY2OCAxNC41MzIgMTAuMjYzIDE0Ljg1NiAxMS4wOCAxNC44NTYgQyAxMi4xOTYgMTQuODU2IDEyLjk4IDE0LjExMSAxMi45OCAxMy4wNDQgQyAxMi45OCAxMi4xNjggMTIuNjE3IDExLjc3MSAxMS4zOTUgMTEuMzI0IFogTSAxMy4zMTYgMTEuOTY4IEMgMTMuMzE2IDEzLjU4OCAxNC41ODYgMTQuODQ1IDE2LjIyMyAxNC44NDUgQyAxNi42ODUgMTQuODQ1IDE3LjA4MSAxNC43NTUgMTcuNTcgMTQuNTI1IEwgMTcuNTcgMTMuMjU4IEMgMTcuMTQgMTMuNjg4IDE2Ljc2IDEzLjg2MiAxNi4yNzMgMTMuODYyIEMgMTUuMTkxIDEzLjg2MiAxNC40MjMgMTMuMDc3IDE0LjQyMyAxMS45NjIgQyAxNC40MjMgMTAuOTAyIDE1LjIxNSAxMC4wNjcgMTYuMjIzIDEwLjA2NyBDIDE2LjczNSAxMC4wNjcgMTcuMTIzIDEwLjI1IDE3LjU3IDEwLjY4NyBMIDE3LjU3IDkuNDIxIEMgMTcuMDk4IDkuMTgxIDE2LjcxIDkuMDgxIDE2LjI0OCA5LjA4MSBDIDE0LjYyMSA5LjA4MSAxMy4zMTYgMTAuMzY0IDEzLjMxNiAxMS45NjggWiBNIDI2LjA4OCAxMi45MTEgTCAyNC42MiA5LjIwNiBMIDIzLjQ0NiA5LjIwNiBMIDI1Ljc4MyAxNC44NjIgTCAyNi4zNjEgMTQuODYyIEwgMjguNzQxIDkuMjA3IEwgMjcuNTc2IDkuMjA3IE0gMjkuMjI2IDE0LjcyMSBMIDMyLjI3MiAxNC43MjEgTCAzMi4yNzIgMTMuNzg3IEwgMzAuMjk5IDEzLjc4NyBMIDMwLjI5OSAxMi4yOTkgTCAzMi4xOTkgMTIuMjk5IEwgMzIuMTk5IDExLjM2NSBMIDMwLjI5OSAxMS4zNjUgTCAzMC4yOTkgMTAuMTQxIEwgMzIuMjcyIDEwLjE0MSBMIDMyLjI3MiA5LjIwNiBMIDI5LjIyNiA5LjIwNiBNIDM0LjM3MyAxMS43NDUgTCAzNC4wNTkgMTEuNzQ1IEwgMzQuMDU5IDEwLjA3NSBMIDM0LjM4OSAxMC4wNzUgQyAzNS4wNTkgMTAuMDc1IDM1LjQyMyAxMC4zNTUgMzUuNDIzIDEwLjg5MyBDIDM1LjQyMyAxMS40NDcgMzUuMDU5IDExLjc0NSAzNC4zNzMgMTEuNzQ1IFogTSAzNi41MjggMTAuODM1IEMgMzYuNTI4IDkuODAyIDM1LjgxOCA5LjIwNyAzNC41NzggOS4yMDcgTCAzMi45ODYgOS4yMDcgTCAzMi45ODYgMTQuNzIxIEwgMzQuMDU5IDE0LjcyMSBMIDM0LjA1OSAxMi41MDYgTCAzNC4xOTkgMTIuNTA2IEwgMzUuNjg2IDE0LjcyMSBMIDM3LjAwNiAxNC43MjEgTCAzNS4yNzMgMTIuMzk4IEMgMzYuMDgzIDEyLjIzMyAzNi41MjggMTEuNjc4IDM2LjUyOCAxMC44MzUgWiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz4KICA8ZyBpZD0iTWFya2luZ0Jhc2VfMV8iIHRyYW5zZm9ybT0ibWF0cml4KDAuMDg5Nzc2LCAwLCAwLCAwLjA4OTc3NiwgMi4xOTIyOTYsIDUuNzI0OTgpIj4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjI0LjM5MTciIHkxPSI0NC4xNzMxIiB4Mj0iMjAxLjMzIiB5Mj0iODAuMjgwNyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDE0MS43MzIzKSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0Y4OUYyMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuMjUwMiIgc3R5bGU9InN0b3AtY29sb3I6I0Y3OUEyMyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuNTMzMSIgc3R5bGU9InN0b3AtY29sb3I6I0Y3OEUyMiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuNjE5NiIgc3R5bGU9InN0b3AtY29sb3I6I0Y2ODcyMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuNzIzMiIgc3R5bGU9InN0b3AtY29sb3I6I0Y0ODIyMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMjc2MjMiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8Y2lyY2xlIGZpbGw9InVybCgjU1ZHSURfMV8pIiBjeD0iMjA3LjM0MyIgY3k9IjcwLjg2NiIgcj0iMzMuMzA3Ii8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIyMC43NDg3IiB5MT0iNDQuNjY0IiB4Mj0iMTg3LjA0MzYiIHkyPSIxMTAuNTQyNiIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDE0MS43MzIzKSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0Y2ODcyMTtzdG9wLW9wYWNpdHk6MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuMzU4NyIgc3R5bGU9InN0b3AtY29sb3I6I0UyNzAyNztzdG9wLW9wYWNpdHk6MC4yNzA0Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC43MDMiIHN0eWxlPSJzdG9wLWNvbG9yOiNENDYxMkM7c3RvcC1vcGFjaXR5OjAuNTI5OSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuOTgxNiIgc3R5bGU9InN0b3AtY29sb3I6I0QxNUQyRDtzdG9wLW9wYWNpdHk6MC43NCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxjaXJjbGUgb3BhY2l0eT0iMC42NSIgZmlsbD0idXJsKCNTVkdJRF8yXykiIGN4PSIyMDcuMzQzIiBjeT0iNzAuODY2IiByPSIzMy4zMDciLz4KICA8L2c+CiAgPGcgaWQ9Ik9yYW5nZV8xXyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAgICAiIHRyYW5zZm9ybT0ibWF0cml4KDAuNDY5MjI0LCAwLCAwLCAwLjQ2OTIyNCwgMTMuNzg1MDg1LCA2LjE5OTE0OSkiPgogICAgPGcgaWQ9Ik9yYW5nZSI+CiAgICAgIDxnPgogICAgICAgIDxwYXRoIGQ9Ik0xMywzOGMyMC4xLDAsNDAsMCw0MCwwYzEuNywwLDMtMS4zLDMtM1YxOEM1NiwxOCw1MS4yLDMxLjgsMTMsMzh6IiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMTI5LCAzOCk7Ii8+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPg'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartBody;

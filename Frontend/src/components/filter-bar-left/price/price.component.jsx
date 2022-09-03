import { useState } from 'react';
import { CloseBtn, FilterEle, SelectBoxContainer } from './price.styles';

const Price = ({ onChangeHandler }) => {
  const [active, setActive] = useState(false);

  return (
    <FilterEle>
      <h3
        onClick={() => {
          setActive(!active);
        }}
      >
        <span>Price</span>
        <i className='fas fa-sort-down'></i>
      </h3>
      {!active ? (
        <SelectBoxContainer style={{ display: 'none' }}>
          <ul className='select-box'>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='200'
                onChange={onChangeHandler}
              />
              <div>$0-$500</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='1000'
                onChange={onChangeHandler}
              />
              <div>$500-$1000</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='1500'
                onChange={onChangeHandler}
              />
              <div>$1000-$1500</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='2000'
                onChange={onChangeHandler}
              />
              <div>$1500-$2000</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='2500'
                onChange={onChangeHandler}
              />
              <div>$2000-$2500</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='3000'
                onChange={onChangeHandler}
              />
              <div>Above$2500</div>
            </li>
            <CloseBtn
              onClick={() => {
                setActive(false);
              }}
            >
              Close
            </CloseBtn>
          </ul>
        </SelectBoxContainer>
      ) : (
        <SelectBoxContainer style={{ display: 'block' }}>
          <ul className='select-box'>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='500 1'
                onChange={onChangeHandler}
              />
              <div>$0-$500</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='1000 2'
                onChange={onChangeHandler}
              />
              <div>$500-$1000</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='1500 3'
                onChange={onChangeHandler}
              />
              <div>$1000-$1500</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='2000 4'
                onChange={onChangeHandler}
              />
              <div>$1500-$2000</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='2500 5'
                onChange={onChangeHandler}
              />
              <div>$2000-$2500</div>
            </li>
            <li className='display-horizontal'>
              <input
                type='checkbox'
                className='select-checkbox'
                value='3000 6'
                onChange={onChangeHandler}
              />
              <div>Above$2500</div>
            </li>
            <CloseBtn
              onClick={() => {
                setActive(false);
              }}
            >
              Close
            </CloseBtn>
          </ul>
        </SelectBoxContainer>
      )}
    </FilterEle>
  );
};

export default Price;

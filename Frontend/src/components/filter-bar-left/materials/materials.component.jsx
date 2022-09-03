import { useState } from 'react';
import { CloseBtn, FilterEle, SelectBoxContainer } from './materials.styles';

const Materials = () => {
  const [active, setActive] = useState(false);

  return (
    <FilterEle>
      <h3
        onClick={() => {
          setActive(!active);
        }}
      >
        <span>Material</span>
        <i className='fas fa-sort-down'></i>
      </h3>
      {!active ? (
        <SelectBoxContainer style={{ display: 'none' }}>
          <ul className='select-box'>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Fabric(8)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Leather(9)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Plastic(2)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Combination(1)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Epic(1)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>MCL Leather(1)</div>
            </li>
            <CloseBtn>Closed</CloseBtn>
          </ul>
        </SelectBoxContainer>
      ) : (
        <SelectBoxContainer style={{ display: 'block' }}>
          <ul className='select-box'>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Fabric(8)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Leather(9)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Plastic(2)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Combination(1)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>Epic(1)</div>
            </li>
            <li>
              <input type='checkbox' className='select-checkbox' disabled />
              <div>MCL Leather(1)</div>
            </li>
            <CloseBtn
              onClick={() => {
                setActive(false);
              }}
            >
              Closed
            </CloseBtn>
          </ul>
        </SelectBoxContainer>
      )}
    </FilterEle>
  );
};

export default Materials;

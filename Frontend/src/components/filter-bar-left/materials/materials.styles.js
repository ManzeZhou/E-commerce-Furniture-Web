import styled from 'styled-components';

export const FilterEle = styled.div`
  position: relative;

  h3 {
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    cursor: pointer;

    span {
      margin-right: 10px;
    }

    i {
      font-size: 18px;
    }
  }
`;

export const SelectBoxContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 40px;
  min-width: 215px;
  max-height: 470px;
  margin: 0;
  overflow: auto;
  padding: 16px 0;
  border: 1px solid #ebebeb;
  background: #fff;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 10%);

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      flex-direction: row;

      input {
        cursor: pointer;
        content: '';
        background-color: #fff;
        border: 2px solid #818181;
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border-radius: 5px;
      }

      div {
        color: #252525;
        font-weight: 300;
      }
    }
  }
`;

export const CloseBtn = styled.li`
  color: #252525;
  font-weight: 300;
  text-align: center;

  justify-content: center;

  cursor: pointer;
`;

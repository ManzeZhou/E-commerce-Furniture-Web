import styled from 'styled-components';

export const SortHeader = styled.h3`
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  cursor: pointer;
  margin-right: 10px;

  label {
    font-weight: 500;
  }
`;

export const SelectStyle = styled.div`
  display: inline-block;

  select {
    width: inherit;
    height: 26px;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    border: 0;
    cursor: pointer;
    background: transparent;
    outline: none;
    -webkit-appearance: none;
    margin-right: 10px;
  }

  span {
    cursor: pointer;
  }
`;

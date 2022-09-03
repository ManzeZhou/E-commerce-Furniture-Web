import styled from 'styled-components';

export const FilterBarLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 70px;

  @media screen and (max-width: 991px) {
    display: none !important;
  }
`;

import styled from 'styled-components';

export const ProductsContainer = styled.div`
  padding: 0 50px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 5px;

  @media screen and (max-width: 991px) {
    grid-template-columns: 1fr !important;
    /* width: 100vw !important; */
  }
`;

export const ProductPreviewContainer = styled.div`
  padding: 0 15px;
  width: 100%;
  margin-bottom: 72px;
`;

export const ProductImg = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

export const ImgLink = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
`;

export const ProductCover = styled.img`
  width: 100%;
  vertical-align: top;
  transition: opacity 0.4s ease-in-out;
`;

export const ProductBack = styled.img`
  width: 100%;
  vertical-align: top;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;

  :hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export const ProductName = styled.div`
  h3 {
    color: #252525;
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: inherit;
    display: inline-block;

    :hover {
      cursor: pointer;
      text-decoration: underline;
    }

    :active {
      background-color: #252525;
      color: #fff;
    }
  }
`;

export const ProductPrice = styled.div`
  div {
    font-size: 14px;
    font-weight: lighter;
    line-height: 18px;
  }
`;

export const ProductSwatch = styled.div`
  margin-top: 6px;

  @media screen and (max-width: 991px) {
    display: none !important;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;

      .active {
        border-color: #3f99bd !important;
      }

      .focus-border {
        display: block;
        width: 25px;
        height: 25px;
        margin: 2px;
        padding: 1px;
        border: 1px solid transparent;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          vertical-align: top;
        }
      }
    }
  }
`;

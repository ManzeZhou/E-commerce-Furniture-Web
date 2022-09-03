import styled from 'styled-components';

export const MainBody = styled.div`
  padding-left: 40px;
  padding-right: 40px;

  position: relative;
  min-width: 1450px;
  max-width: 100vw;
  margin: 0 auto;

  @media screen and (max-width: 991px) {
    margin-top: 75px;
    padding: 0 15px;
    max-width: 100vw !important;
    min-width: 100vw !important;
  }
`;

export const BreadcrumbNav = styled.div`
  display: flex;
  margin: 16px 0;
  opacity: 0.6;

  @media screen and (max-width: 991px) {
    display: none !important;
  }

  .breadcrumb-nav_ele {
    position: relative;
    text-decoration: none;
    font-size: 12px;
    line-height: 24px;
    font-weight: 700;
    color: #252525;
    margin-right: 5px;

    a {
      color: #252525;
      vertical-align: baseline;
      letter-spacing: -0.2px;

      i {
        font-size: 10px;
        width: 16px;
        height: 16px;
        text-align: center;
      }
    }
  }
`;

export const CategoryHead = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 991px) {
    width: 100vw !important;
  }

  h1 {
    text-align: center;
    margin: 20px 0;
    font-size: 60px;
    line-height: 72px;
    letter-spacing: -1px;

    display: block;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;

    @media screen and (max-width: 991px) {
      font-size: 35px;
    }
  }
`;

export const FilterBars = styled.div`
  margin-bottom: 27px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 991px) {
    display: block !important;
  }
`;

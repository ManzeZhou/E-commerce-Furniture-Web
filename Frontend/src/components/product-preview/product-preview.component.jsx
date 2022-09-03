import { useState } from 'react';

import {
  ProductsContainer,
  ProductPreviewContainer,
  ProductImg,
  ImgLink,
  ProductCover,
  ProductBack,
  ProductName,
  ProductPrice,
  ProductSwatch,
} from './product-preview.styles';
import { fetchProductId } from '../../action/database.util';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductPreview = ({ products, swatchColors }) => {
  const [activate, setActivate] = useState(false);
  const [activeID, setActiveID] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const currentDisplay = useSelector(
    state => state?.displayReducer?.gridDisplay
  );


  return (
    <ProductsContainer
      style={
        currentDisplay === 3
          ? { gridTemplateColumns: 'repeat(3, 1fr)' }
          : { gridTemplateColumns: 'repeat(4, 1fr)' }
      }
    >
      {products.map(product => {
        const productImagesList = product.media.split('|');
        return (
          <ProductPreviewContainer key={product.id}>
            <ProductImg
              onClick={() => {
                dispatch(fetchProductId(product.id));
                navigate(`/product/${product.id}`);
              }}
            >
              <ImgLink>
                <ProductCover src={productImagesList[0]} alt='img' />
                <ProductBack src={productImagesList[1]} alt='img' />
              </ImgLink>
            </ProductImg>
            <div className='product-content'>
              <ProductName>
                <h3>{product.name}</h3>
              </ProductName>
            </div>
            <ProductPrice>
              <div>CAD${product.price}</div>
            </ProductPrice>
            <ProductSwatch>
              <ul className='product-colors'>
                {swatchColors.map(swatchColor => (
                  <li key={swatchColor.id}>
                    {activeID !== swatchColor.id + ' ' + product.name ? (
                      <div
                        className='focus-border'
                        onClick={() => {
                          setActivate(!activate);
                          setActiveID(swatchColor.id + ' ' + product.name);
                        }}
                      >
                        <img src={swatchColor.imgUrl} alt={swatchColor.alt} />
                      </div>
                    ) : (
                      <div
                        className='focus-border active'
                        onClick={() => {
                          setActivate(!activate);
                          setActiveID(null);
                        }}
                      >
                        <img src={swatchColor.imgUrl} alt={swatchColor.alt} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </ProductSwatch>
          </ProductPreviewContainer>
        );
      })}
    </ProductsContainer>
  );
};

export default ProductPreview;

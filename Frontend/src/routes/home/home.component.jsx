import { useEffect, useState } from 'react';

import {fetchProductAPI, swatchColors} from '../../action/database.util';

import BarLeft from '../../components/filter-bar-left/filter-bar-left.component';
import ProductPreview from '../../components/product-preview/product-preview.component';
import BarRight from '../../components/filter-bar-right/filter-bar-right.component';
import { useDispatch} from 'react-redux';
import axios from 'axios';



import './home.styles';
import {
  BreadcrumbNav,
  CategoryHead,
  FilterBars,
  MainBody,
} from './home.styles';
import { useSelector } from 'react-redux';
import {productReducer} from "../../reducers/productReducer";

const priceRange = [
  { name: '$0-$500', index: 0, value: 500 },
  { name: '$500-$1000', index: 1, value: 1000 },
  { name: '$1000-$1500', index: 2, value: 1500 },
  { name: '$1500-$2000', index: 3, value: 2000 },
  { name: '$2000-$2500', index: 4, value: 2500 },
  { name: 'Above $2500', index: 5, value: 3000 },
];

const Home = () => {
  const products = useSelector(state => state?.productReducer?.data);

  const [range, setRange] = useState(new Array(priceRange.length).fill(0));
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sort, setSort] = useState('');

  const onSelectChange = event => {
    const targetValue = event.target.value.split(' ');
    const targetRange = targetValue[0];
    const targetID = targetValue[1];
    if (event.target.value && event.target.checked) {
      let newRange = [...range];
      newRange[parseInt(targetID) - 1] = parseFloat(targetRange);
      setRange(newRange);
    } else {
      let newRange = [...range];
      newRange[parseInt(targetID) - 1] = 0;
      setRange(newRange);
    }
  };

  const onSortChange = event => {
    if (event.target.value) {
      const selectedOpt = event.target.value;
      setSort(selectedOpt);
    } else {
      setSort('');
    }
  };

  useEffect(() => {
    let newSelectedProducts = [];
    let rangeSum = range.reduce((pValue, cValue) => pValue + cValue, 0);
    if (rangeSum !== 0) {
      for (let i = 0; i < range.length; i++) {
        if (range[i] !== 0) {
          const newProducts = products.filter(
            product =>
              parseFloat(product.price) > priceRange[i].value - 500 &&
              parseFloat(product.price) <= priceRange[i].value
          );

          newSelectedProducts = [...newSelectedProducts, ...newProducts];
        } else {
          continue;
        }
      }
    } else {
      newSelectedProducts = products;
    }

    let newFilteredProducts = [...newSelectedProducts];
    switch (sort) {
      case 'HtL':
        newFilteredProducts.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        break;
      case 'LtH':
        newFilteredProducts.sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
        break;
      case 'AtZ':
        newFilteredProducts.sort((a, b) => {
          let fa = a.name.toLowerCase();
          let fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        break;
      case 'ZtA':
        newFilteredProducts.sort((a, b) => {
          let fa = a.name.toLowerCase();
          let fb = b.name.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        newFilteredProducts = [...newSelectedProducts];
    }
    setFilteredProducts(newFilteredProducts);
  }, [sort, range, products]);

  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchProductAPI), [])
  const dataFromAPI = useSelector(state => state?.productReducer.data)
  console.log(typeof dataFromAPI)

  return ( dataFromAPI !== [] ?
    <MainBody>
      <BreadcrumbNav>
        <div className='breadcrumb-nav_ele'>
          <a href='/'>
            Home
            <i className='fa-solid fa-angle-right'></i>
          </a>
        </div>
        <div className='breadcrumb-nav_ele'>
          <a href='/'>
            Office
            <i className='fa-solid fa-angle-right'></i>
          </a>
        </div>
        <div className='breadcrumb-nav_ele'>
          <a href='/'>
            Office Chairs
            <i className='fa-solid fa-angle-right'></i>
          </a>
        </div>
      </BreadcrumbNav>
      <CategoryHead>
        <h1>Office Chairs</h1>
      </CategoryHead>
      <FilterBars>
        <BarLeft
          priceRange={priceRange}
          onChangeHandler={onSelectChange}
          onSortChangeHandler={onSortChange}
        />
        <BarRight />
      </FilterBars>
      <ProductPreview products={filteredProducts} swatchColors={swatchColors} />
    </MainBody> : <div>Network Error, Please Try Again Later </div>
  );
};

export default Home;

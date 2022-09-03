import FilterBarMobile from '../filter-bar-mobile/filter-bar-mobile.component';
import { FilterBarLeft } from './filter-bar-left.styles';
import Materials from './materials/materials.component';
import Price from './price/price.component';
import SortBy from './sort-by/sort-by.component';

const BarLeft = ({ onChangeHandler, onSortChangeHandler }) => {
  return (
    <div className='filter-bar_left'>
      <FilterBarLeft>
        <Price onChangeHandler={onChangeHandler} />
        <Materials />
        <SortBy onSortChangeHandler={onSortChangeHandler} />
      </FilterBarLeft>
      <FilterBarMobile />
    </div>
  );
};

export default BarLeft;

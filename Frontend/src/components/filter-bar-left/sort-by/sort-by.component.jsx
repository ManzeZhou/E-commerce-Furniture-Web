import { SelectStyle, SortHeader } from './sort-by.styles';

const SortBy = ({ onSortChangeHandler }) => {
  return (
    <div className='filterbar-sort'>
      <SortHeader>
        <label htmlFor='sort-opt'>Sort By:</label>
      </SortHeader>
      <SelectStyle>
        <select name='sort-opt' id='sort-opt' onChange={onSortChangeHandler}>
          <option>Featured Products</option>
          <option value='HtL'>Price: Low to High</option>
          <option value='LtH'>Price: High to Low</option>
          <option value='AtZ'>Name: A to Z</option>
          <option value='ZtA'>Name: Z to A</option>
          <option>Average Rating</option>
        </select>
        <span>
          <i className='fas fa-sort-down'></i>
        </span>
      </SelectStyle>
    </div>
  );
};

export default SortBy;

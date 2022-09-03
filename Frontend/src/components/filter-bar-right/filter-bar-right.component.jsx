import { useDispatch, useSelector } from 'react-redux';
import { fetchToggleDisplay } from '../../action/database.util';
import './filter-bar-right.styles.scss';

const BarRight = () => {
  const dispatch = useDispatch();

  const currentDisplay = useSelector(
    state => state?.displayReducer?.gridDisplay
  );

  return (
    <div className='filter-bar-right'>
      <div className='filter-text'>
        <span> Showing 10 out of 10 items</span>
      </div>
      <span
        className='sorting-icon'
        onClick={() => {
          const sortingIconBefore = document.getElementsByClassName(
            'sorting-icon-before'
          );
          const sortingIconAfter =
            document.getElementsByClassName('sorting-icon-after');

          if (currentDisplay === 4) {
            sortingIconBefore[0].style.opacity = 1;
            sortingIconAfter[0].style.opacity = 0.2;

            dispatch(fetchToggleDisplay(3));
          } else {
            sortingIconBefore[0].style.opacity = 0.2;
            sortingIconAfter[0].style.opacity = 1;
            dispatch(fetchToggleDisplay(4));
          }
        }}
      >
        <span className='sorting-icon-before'></span>
        <span className='sorting-icon-after'></span>
      </span>
    </div>
  );
};

export default BarRight;

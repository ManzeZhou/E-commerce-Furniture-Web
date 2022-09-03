import './filter-bar-mobile.styles.scss';

const FilterBarMobile = () => {
  return (
    <div className='filter-bar_mobile'>
      <div className='filter-mobile-container'>
        <div className='filter-mobile-text'>Filtered By</div>
        <div className='filter-mobile-icon'>
          <i className='fa-solid fa-angle-up'></i>
        </div>
      </div>
      <div className='all-refines'>
        <div className='filter-ele-mobile'>
          <h3 className='h3-price'>
            <span>Price</span>
            <i className='fa-solid fa-chevron-right'></i>
          </h3>
          <ul className='mobile-select-box'>
            <li>
              <a href='/'>$100 or less (1)</a>
            </li>
            <li>
              <a href='/'>$500 - 1000 (14)</a>
            </li>
            <li>
              <a href='/'>$1000 - $2000 (11)</a>
            </li>
            <li>
              <a href='/'>$2000 - $3000 (8)</a>
            </li>
            <li>
              <a href='/'>$3000 - $5000 (5)</a>
            </li>
            <li>
              <a href='/'>Above $5000 (1)</a>
            </li>
            <li className='mobile-select-close-btn'>Close</li>
          </ul>
        </div>
        <div className='filter-ele-mobile'>
          <h3 className='h3-material'>
            <span>Material</span>
            <i className='fa-solid fa-chevron-right'></i>
          </h3>
          <ul className='mobile-select-box'>
            <li>
              <a href='/'>Fabric (8)</a>
            </li>
            <li>
              <a href='/'>Leather (9)</a>
            </li>
            <li>
              <a href='/'>Plastic (2)</a>
            </li>
            <li>
              <a href='/'>Combination (1)</a>
            </li>
            <li>
              <a href='/'>MCL Leather (1)</a>
            </li>
            <li className='mobile-select-close-btn'>Close</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterBarMobile;

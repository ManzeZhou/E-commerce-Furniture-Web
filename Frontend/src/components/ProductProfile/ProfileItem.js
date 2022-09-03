import './ProductProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  fetchSelection,
  fetchSelectionChecked,
  fetchSelectionPrice,
} from '../../action/database.util';

const ProfileItem = () => {
  const [selectionObj, setSelectionObj] = useState({
    FrameBase: '',
    Size: '',
    BackSupport: '',
    Tilt: '',
    Arms: '',
    Armpad: '',
    Caster: '',
  });

  const [checkedIdx, setCheckedIdx] = useState(
    new Array(Object.keys(selectionObj).length).fill(0)
  );

  const [selectPrices, setSelectPrices] = useState(
    new Array(Object.keys(selectionObj).length).fill(0)
  );

  const dispatch = useDispatch();

  const changeHandler = evt => {
    const allIdx = evt.target.id.split(' ');
    const profileItemID = parseInt(allIdx[0]);
    const profileCategoryID = parseInt(allIdx[1]);

    if (evt.target.value && evt.target.checked) {
      let targetValue = evt.target.value;
      let newSelectPrices = [...selectPrices];
      newSelectPrices[profileCategoryID - 1] = parseFloat(targetValue);
      setSelectPrices(newSelectPrices);

      let newSelectedIdx = [...checkedIdx];
      newSelectedIdx[profileCategoryID - 1] = parseFloat(profileItemID);
      setCheckedIdx(newSelectedIdx);
    } else {
      setCheckedIdx(new Array(Object.keys(selectionObj).length).fill(0));
      setSelectPrices(new Array(Object.keys(selectionObj).length).fill(0));
    }
  };

  // fetch priceValue to get the total selection items price

  const totalSelectedPrices = selectPrices.reduce(
    (pValue, cValue) => pValue + cValue,
    0
  );

  dispatch(fetchSelectionPrice(totalSelectedPrices));
  dispatch(fetchSelectionChecked(checkedIdx));

  const addSelection = (selected, selectedCategory, selectedName) => {
    const keys = Object.keys(selectionObj);

    for (let i = 0; i < keys.length; i++) {
      if (i === selected.id - 1) {
        let newSelectionObj = { ...selectionObj };
        let keyValue = keys[i];
        newSelectionObj[keyValue] = `${selectedCategory}: ${selectedName}`;
        setSelectionObj(newSelectionObj);
        dispatch(fetchSelection(newSelectionObj));
      }
    }
  };

  // const selectedProfile = useSelector(state => state?.selectionReducer?.selection);
  // const selectedChecks = useSelector(
  //   state => state?.selectionReducer?.selectionChecked
  // );

  const profileCategories = useSelector(
    state => state.profileCategoriesReducer?.profileArray
  );
  return (
    <div className='product-content-profile'>
      <ul>
        {profileCategories &&
          profileCategories.map((profileCategory, index) => {
            return (
              <li key={profileCategory.id} className='profiles'>
                <div className='profile-label'>{profileCategory.name}</div>
                <div>
                  {profileCategory.profileItems.map((s, id) => {
                    return (
                      <div key={id} className='profile-items'>
                        <ul className='swatch'>
                          <li className='selection'>
                            <input
                              type='radio'
                              value={s.price}
                              name={profileCategory.name}
                              id={`${s.id} ${profileCategory.id}`}
                              onChange={evt => {
                                changeHandler(evt);
                                addSelection(
                                  profileCategory,
                                  profileCategory.name,
                                  s.name
                                );
                              }}
                            />
                            <label htmlFor={s.id}>{s.name}</label>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ProfileItem;

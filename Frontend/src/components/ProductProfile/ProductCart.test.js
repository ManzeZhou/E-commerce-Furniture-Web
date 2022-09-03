import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../reducers';
import thunk from 'redux-thunk';
import ProductCart from './ProductCart';
import ProductProfile from './ProductProfile';
import { BrowserRouter } from 'react-router-dom';

test('test trial pc', () => {
  render(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      <BrowserRouter>
        <ProductProfile>
          <ProductCart />
        </ProductProfile>
      </BrowserRouter>
    </Provider>
  );

  const stdp = screen.getByTestId('test-pc');
  const style = getComputedStyle(stdp);
  expect(style.textDecoration).toBe('none');
});

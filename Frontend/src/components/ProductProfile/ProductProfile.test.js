import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../reducers';
import thunk from 'redux-thunk';
import ProductProfile from './ProductProfile';
import { BrowserRouter } from 'react-router-dom';
import './ProductProfile.scss';

test('product profile test trial', () => {
  render(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      <BrowserRouter>
        <ProductProfile />
      </BrowserRouter>
    </Provider>
  );

  const link = screen.getByTestId('test');
  expect(link).toHaveAttribute('href', '#');
  const style = getComputedStyle(link);
  expect(style.color).toBe('rgb(204, 51, 30)');
});

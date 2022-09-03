import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../reducers';
import thunk from 'redux-thunk';
import Nav from './Nav';
import { BrowserRouter } from 'react-router-dom';

test('navi bar relinquish', () => {
  render(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </Provider>
  );

  const btn = screen.getByTestId('forfeit');
  const block = screen.getByTestId('nav-block-display');
  const style = getComputedStyle(block);
  expect(style.display).toBe('block');
  fireEvent.click(btn);
  const blockAfter = screen.getByTestId('nav-block-display');
  const styleAfter = getComputedStyle(blockAfter);
  expect(styleAfter.display).toBe('none');
});

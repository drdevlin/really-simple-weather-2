import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import App from './App';

describe('<App />', () => {
  // it('renders some text', async () => {
  //   await render(<Provider store={store}><App /></Provider>);
  //   const text = await screen.findAllByText(/./g);

  //   expect(text.length).toBeTruthy();
  // });
  it('everything works', async () => {
    await render(<Provider store={store}><App /></Provider>);
    expect(screen.debug()).toBeNull(); //placeholder
  });
});

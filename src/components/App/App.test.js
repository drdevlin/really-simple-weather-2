import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import App from './App';

describe('<App />', () => {
  it('renders some text', async () => {
    await render(<Provider store={store}><App /></Provider>);
    const text = screen.queryAllByText(/./g);

    expect(text.length).toBeTruthy();
  });
});

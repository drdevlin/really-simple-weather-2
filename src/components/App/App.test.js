import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import App from './App';

describe('<App />', () => {
  it('renders some elements', async () => {
    await render(<Provider store={store}><App /></Provider>);
    const component = screen.getByRole('main');
    const { children } = component;

    expect(children.length).toBeTruthy();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Wind from './Wind';

describe('<Wind />', () => {
  it('renders some elements', async () => {
    await render(<Provider store={store}><Wind /></Provider>);
    const component = screen.getByRole('region');
    const { children } = component;

    expect(children.length).toBeTruthy();
  });
});

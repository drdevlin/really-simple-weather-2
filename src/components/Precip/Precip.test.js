import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Precip from './Precip';

describe('<Precip />', () => {
  it('renders some elements', async () => {
    await render(<Provider store={store}><Precip /></Provider>);
    const component = screen.getByRole('region');
    const { children } = component;

    expect(children.length).toBeTruthy();
  });
});

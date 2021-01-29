import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Tomorrow from './Tomorrow';

describe('<Tomorrow />', () => {
  it('shows high and conditions for tomorrow', async () => {
    await render(<Provider store={store}><Tomorrow /></Provider>);
    expect(screen.debug()).toBeNull(); //placeholder
  });
});

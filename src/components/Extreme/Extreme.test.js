import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Extreme from './Extreme';

describe('<Extreme />', () => {
  it('displays the time of the high/low tempurature', async () => {
    await render(<Provider store={store}><Extreme /></Provider>);
    const tempurature = screen.queryByText(/:/);

    expect(tempurature).not.toBeNull();
  });
  it('displays the high or low tempurature', async () => {
    await render(<Provider store={store}><Extreme /></Provider>);
    const tempurature = screen.queryByText(/°/);

    expect(tempurature).not.toBeNull();
  });
  it('indicates windchill/humidex by degree symbol color', async () => {
    await render(<Provider store={store}><Extreme /></Provider>);
    expect(screen.debug()).toBeNull(); //placeholder
  });
});

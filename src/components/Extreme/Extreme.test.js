import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Extreme from './Extreme';
import { updateExtreme } from '../../store/actions';

describe('<Extreme />', () => {
  beforeEach(() => {
    store.dispatch(updateExtreme({
      temp: 30,
      type: 'humidex',
      time: new Date('January 1, 2020 12:00:00').valueOf()
    }));
  })
  it('displays the time of the high/low tempurature', async () => {
    await render(<Provider store={store}><Extreme /></Provider>);
    const time = screen.queryByText(/12:00/);

    expect(time).not.toBeNull();
  });
  it('displays the high or low tempurature', async () => {
    await render(<Provider store={store}><Extreme /></Provider>);
    const temp = screen.queryByText(/30/);

    expect(temp).not.toBeNull();
  });
  it('indicates windchill/humidex by degree symbol color', async () => {
    const { container } = await render(<Provider store={store}><Extreme /></Provider>);
    const type = container.querySelector('.humidex');

    expect(type).not.toBeNull();
  });
});

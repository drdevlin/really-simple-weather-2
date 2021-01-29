import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Now from './Now';

describe('<Now />', () => {
  it('displays the tempurature', async () => {
    await render(<Provider store={store}><Now /></Provider>);
    const tempurature = screen.queryByText(/\d/);

    expect(tempurature).not.toBeNull();
  });
  it('indicates windchill/humidex by degree symbol color', async () => {
    await render(<Provider store={store}><Now /></Provider>);
    expect(screen.debug()).toBeNull(); //placeholder
  });
});

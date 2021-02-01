import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Now from './Now';
import { updateNow } from '../../store/actions';

describe('<Now />', () => {
  it('displays the tempurature', async () => {
    store.dispatch(updateNow({ temp: 30, type: 'humidex' }));
    await render(<Provider store={store}><Now /></Provider>);
    const temp = screen.queryByText(/30/);

    expect(temp).not.toBeNull();
  });
  it('indicates windchill/humidex by degree symbol colour', async () => {
    store.dispatch(updateNow({ temp: 30, type: 'humidex' }));
    const { container } = await render(<Provider store={store}><Now /></Provider>);
    const type = container.querySelector('.humidex');

    expect(type).not.toBeNull();
  });
});

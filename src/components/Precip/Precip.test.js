import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Precip from './Precip';
import { updatePrecip } from '../../store/actions';

describe('<Precip />', () => {
  it('shows the precipitation over 24 hours', async () => {
    store.dispatch(updatePrecip({ time: null, pops: [ 10, 20, 30, 40 ]}));
    await render(<Provider store={store}><Precip /></Provider>);
    expect(screen.debug()).toBeNull(); //placeholder
  });
});

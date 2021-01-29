import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Wind from '../Wind/Wind';
import { updateWind } from '../../store/actions';

describe('<Wind />', () => {
  it('shows wind speeds over 24 hours', async () => {
    store.dispatch(updateWind({ speeds: [ 10, 20, 30, 40 ]}));
    await render(<Provider store={store}><Wind /></Provider>);
    expect(screen.debug()).toBeNull(); //placeholder
  });
});

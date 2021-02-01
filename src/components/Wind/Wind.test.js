import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Wind from '../Wind/Wind';
import { updateWind } from '../../store/actions';

describe('<Wind />', () => {
  it('shows wind speeds over 24 hours', async () => {
    store.dispatch(updateWind({ speeds: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ]}));
    const { container } = await render(<Provider store={store}><Wind /></Provider>);
    const firstSpeedWidth = container.querySelector('.wind-speed').attributes.style.nodeValue;
    const numSpeedElements = container.querySelectorAll('.wind-speed').length;

    expect(firstSpeedWidth).toStrictEqual('width: 1%;');
    expect(numSpeedElements).toStrictEqual(24);
  });
});

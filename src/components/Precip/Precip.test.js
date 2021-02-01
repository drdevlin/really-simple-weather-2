import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Precip from './Precip';
import { updatePrecip } from '../../store/actions';

describe('<Precip />', () => {
  it('show start time and precipitation over 24 hours', async () => {
    store.dispatch(updatePrecip({ time: new Date('January 1, 2020 12:00:00').valueOf(), pops: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ]}));
    const { container } = await render(<Provider store={store}><Precip /></Provider>);
    const time = screen.queryByText(/12:00/);
    const firstPopHeight = container.querySelector('.pop').attributes.style.nodeValue;
    const numPopElements = container.querySelectorAll('.pop').length;

    expect(time).not.toBeNull();
    expect(firstPopHeight).toStrictEqual('height: 1%;');
    expect(numPopElements).toStrictEqual(24);
  });
});

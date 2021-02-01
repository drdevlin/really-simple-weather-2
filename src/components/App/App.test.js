import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import App from './App';

describe('<App />', () => {
  it('everything should be rendering', async () => {
    const { container } = await render(<Provider store={store}><App /></Provider>);
    const temps = await screen.findAllByText(/°/);
    const times = await screen.findAllByText(/:/);
    const pops = container.querySelectorAll('.pop').length
    const speeds = container.querySelectorAll('.wind-speed').length

    expect(temps.length).toBe(3);
    expect(times.length).toBeGreaterThan(0);
    expect(pops || speeds).toBeTruthy();
  });
});

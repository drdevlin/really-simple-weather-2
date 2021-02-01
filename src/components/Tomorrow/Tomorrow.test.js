import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Tomorrow from './Tomorrow';
import { updateTomorrow } from '../../store/actions';

describe('<Tomorrow />', () => {
  it('shows high temp and conditions for tomorrow', async () => {
    store.dispatch(updateTomorrow({ temp: 10, condition: 'nice' }));
    const { container } = await render(<Provider store={store}><Tomorrow /></Provider>);
    const temp = screen.queryByText(/10/);
    const condition = container.querySelector('.nice');
    
    expect(temp).not.toBeNull();
    expect(condition).not.toBeNull();
  });
});

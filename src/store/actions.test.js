import store from './store';
import * as action from './actions';

describe('actions', () => {
  describe('fetchWeather()', () => {
    it('updates the store with fetched results', async () => {
      const stateBefore = store.getState();
      await store.dispatch(action.fetchWeather());
      const stateAfter = store.getState();

      expect(stateBefore).not.toMatchObject(stateAfter);
    })
  })
})
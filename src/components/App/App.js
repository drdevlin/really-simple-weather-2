import React from 'react';
import './App.css';

import Now from '../Now/Now';
import Extreme from '../Extreme/Extreme';
import Precip from '../Precip/Precip';
import Wind from '../Wind/Wind';
import Tomorrow from '../Tomorrow/Tomorrow';

function App() {
  return (
    <main className="App">
      <Now />
      <Extreme />
      <Precip />
      <Wind />
      <Tomorrow />
    </main>
  );
}

export default App;

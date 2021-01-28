import React from 'react';
import { connect } from 'react-redux';
import './Extreme.css';

function Extreme({ extreme }) {
  return (
    <section className='Extreme' aria-label='High or low temperature'>
      
    </section>
  );
}

const mapState = state => state.extreme;
export default connect(mapState)(Extreme);

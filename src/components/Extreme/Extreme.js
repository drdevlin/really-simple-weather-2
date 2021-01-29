import React from 'react';
import { connect } from 'react-redux';
import './Extreme.css';

function Extreme({ temp, type, time }) {
  return (
    <section className='Extreme' aria-label='High or low temperature'>
      
    </section>
  );
}

const mapState = ({ extreme }) => extreme;
export default connect(mapState)(Extreme);

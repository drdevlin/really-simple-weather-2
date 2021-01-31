import React from 'react';
import { connect } from 'react-redux';
import './Wind.css';

function Wind({ speeds }) {
  return (
    <section className='Wind' aria-label='Wind'>
      {speeds.map((speed, i) => <div key={`speeds${i}`} className='wind-speed' style={{ width: `${speed}%` }}></div>)}
    </section>
  );
}

const mapState = ({ wind }) => wind;
export default connect(mapState)(Wind);

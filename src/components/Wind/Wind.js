import React from 'react';
import { connect } from 'react-redux';
import './Wind.css';

function Wind({ wind }) {
  return (
    <section className='Wind' aria-label='Wind'>
      
    </section>
  );
}

const mapState = state => state.wind;
export default connect(mapState)(Wind);

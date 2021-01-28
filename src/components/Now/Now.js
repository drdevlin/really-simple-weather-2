import React from 'react';
import { connect } from 'react-redux';
import './Now.css';

function Now({ temp, type }) {
  return (
    <section className='Now' aria-label='Current tempurature'>
      <p>{temp}</p>
    </section>
  );
}

const mapState = state => state.now;
export default connect(mapState)(Now);

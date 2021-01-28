import React from 'react';
import { connect } from 'react-redux';
import './Now.css';

function Now({ now }) {
  return (
    <section className='Now' aria-label='Current tempurature'>
      
    </section>
  );
}

const mapState = state => state.now;
export default connect(mapState)(Now);

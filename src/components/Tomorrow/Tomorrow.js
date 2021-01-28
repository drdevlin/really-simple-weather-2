import React from 'react';
import { connect } from 'react-redux';
import './Tomorrow.css';

function Tomorrow({ tomorrow }) {
  return (
    <section className='Tomorrow' aria-label='Tomorrow High'>
      
    </section>
  );
}

const mapState = state => state.tomorrow;
export default connect(mapState)(Tomorrow);

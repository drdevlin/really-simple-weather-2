import React from 'react';
import { connect } from 'react-redux';
import './Tomorrow.css';

function Tomorrow({ condition, temp }) {
  return (
    <section className='Tomorrow' aria-label='Tomorrow High'>
      
    </section>
  );
}

const mapState = ({ tomorrow }) => tomorrow;
export default connect(mapState)(Tomorrow);

import React from 'react';
import { connect } from 'react-redux';
import './Now.css';

function Now({ temp, type, conditionToday }) {
  const lightness = (conditionToday === 'nice' || conditionToday === 'bad') ? 'light' : 'dark';
  return (
    <section className='Now' aria-label='Current tempurature'>
      <p>{temp}<span className={`${type} ${lightness}`}>°</span></p>
    </section>
  );
}

const mapState = ({ app, now }) => ({ ...now, conditionToday: app.condition });
export default connect(mapState)(Now);

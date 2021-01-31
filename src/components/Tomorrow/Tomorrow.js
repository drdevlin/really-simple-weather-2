import React from 'react';
import { connect } from 'react-redux';
import './Tomorrow.css';

function Tomorrow({ condition, temp, conditionToday }) {
  const conditionJsx = (condition === conditionToday) ? null : <div className={`tomorrow-condition ${condition}`} ></div>;

  return (
    <section className='Tomorrow' aria-label='Tomorrow High'>
      <p>{temp}°</p>
      {conditionJsx}
    </section>
  );
}

const mapState = ({ app, tomorrow }) => ({ ...tomorrow, conditionToday: app.condition });
export default connect(mapState)(Tomorrow);

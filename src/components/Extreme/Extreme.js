import React from 'react';
import { connect } from 'react-redux';
import './Extreme.css';

function Extreme({ temp, type, time }) {
  const hour = new Date(time).getHours();
  const timeText = `${hour}:00`;

  return (
    <section className='Extreme' aria-label='High or low temperature'>
      <p>{timeText}</p>
      <p>{temp}<span className={type}>°</span></p>
    </section>
  );
}

const mapState = ({ extreme }) => extreme;
export default connect(mapState)(Extreme);

import React from 'react';
import { connect } from 'react-redux';
import './Extreme.css';

function Extreme({ temp, type, time, conditionToday }) {
  const hour = new Date(time).getHours();
  const timeText = `${hour}:00`;

  const lightness = (conditionToday === 'nice' || conditionToday === 'bad') ? 'light' : 'dark';

  return (
    <section className='Extreme' aria-label='High or low temperature'>
      <p>{timeText}</p>
      <p>{temp}<span className={`${type} ${lightness}`}>°</span></p>
    </section>
  );
}

const mapState = ({ app, extreme }) => ({ ...extreme, conditionToday: app.condition });
export default connect(mapState)(Extreme);

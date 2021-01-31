import React from 'react';
import { connect } from 'react-redux';
import './Precip.css';

function Precip({ time, pops }) {
  const isTime = Boolean(time);
  let timeJsx;
  if (isTime) {
    const hour = new Date(time).getHours();
    const timeText = `${hour}:00`;
    timeJsx = <p>{timeText}</p>;
  }
  
  return (
    <section className='Precip' aria-label='Precipitation'>
      {timeJsx}
      <div className='precip-chart'>
        {pops.map((pop, i) => <div key={`pops${i}`} className='pop' style={{height: `${pop}%`}}></div>)}
      </div>
    </section>
  );
}

const mapState = ({ precip }) => precip;
export default connect(mapState)(Precip);

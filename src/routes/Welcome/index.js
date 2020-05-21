import React, { Component } from 'react';

import Button from '../../components/Button';
import { ReactComponent as Icon } from '../../assets/icon.svg';

const styles = {
  background: {
    backgroundColor: '#F9F9F9'
  },
  text: {
    margin: '0px 50px',
  },
}

class Welcome extends Component {
  render() {
    return (
      <div className='container evenly column' style={styles.background}>
        <div>
          <Icon />
        </div>
        <div style={styles.text}>
          <p className='title'>Welcome to Counters</p>
          <p>Capture cups of lattes, frapuccinos, or anything else that can be counted.</p>
        </div>
        <Button>Get Started</Button>
      </div>
    )
  }
}

export default Welcome;

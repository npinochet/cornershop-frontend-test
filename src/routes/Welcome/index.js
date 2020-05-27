import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
        <Link to='/main'>
          <Button>Get Started</Button>
        </Link>
      </div>
    )
  }
}

export default Welcome;

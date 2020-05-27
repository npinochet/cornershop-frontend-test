import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Badge extends Component {
  render() {
    const { children, onClick } = this.props

    return (
      <div onClick={() => onClick(children)} className='badge-container'>
        <p className='badge-text bold'>{children}</p>
      </div>
    );
  }
}

Badge.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
}

export default Badge;

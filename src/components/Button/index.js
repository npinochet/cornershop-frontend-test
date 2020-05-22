import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Button extends Component {
  onClick = e => {
    if (e) e.stopPropagation()
    if (this.props.onClick) this.props.onClick(e)
  }

  render() {
    const { disabled, children, white, loading, type, textProps,  ...rest } = this.props

    let buttonClass = "button" + (white ? " button-white" : "")
    let spanClass = "button-span" + (white ? " button-span-white" : "")

    return (
      <button
        {...rest}
        className={buttonClass}
        disabled={disabled}
        onClick={this.onClick}
        type={type}
      >
        <span {...textProps} className={spanClass}>
          {children}
        </span>
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  textProps: PropTypes.object,
  white: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Button;

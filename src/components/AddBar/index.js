import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import Button from '../Button';

import './style.css';

class AddBar extends Component {
  render() {
    const { show } = this.props
    if (!show) return <Fragment />

    return (
      <div>
        <hr />
        <div className='bar-container'>
          <Button><Plus /></Button>
        </div>
      </div>
    );
  }
}

AddBar.propTypes = {
  show: PropTypes.bool,
}

const mapStateToProps = state => ({
  show: state.addBar.show,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(AddBar);

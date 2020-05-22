import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setAddModal } from '../AddModal/actions';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import Button from '../Button';

import './style.css';

class AddBar extends Component {
  handleClick = () => {
    this.props.setAddModal(true)
  }

  render() {
    const { isFetching, show } = this.props
    if (!show) return <Fragment />

    return (
      <div>
        <hr />
        <div className='bar-container'>
          <Button
            disabled={isFetching}
            onClick={this.handleClick}
          >
            <Plus />
          </Button>
        </div>
      </div>
    );
  }
}

AddBar.propTypes = {
  isFetching: PropTypes.bool,
  show: PropTypes.bool,
  setAddModal: PropTypes.func,
}

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  show: state.addBar.show,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  setAddModal,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(AddBar);

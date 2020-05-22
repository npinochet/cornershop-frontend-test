import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { setAddModal } from './actions';

import Button from '../Button';
import { ReactComponent as Plus } from '../../assets/plus.svg';

import './style.css';

Modal.setAppElement('#root');

class AddModal extends Component {
  handleClose = () => {
    this.props.setAddModal(false)
  }
  render() {
    const { show } = this.props
    return (
      <Modal
        className='addmodal-content'
        overlayClassName='addmodal-overlay container center'
        onRequestClose={this.handleClose}
        shouldCloseOnOverlayClick
        closeTimeoutMS={500}
        isOpen={show}
      >
        <div>
          <div style={{padding: '16px', alignItems: 'center'}} className='container between'>
            <div onClick={this.handleClose} className='icon center'><Plus /></div>
            <p className='title' style={{margin: '0px 16px'}}>Create Counter</p>
            <div className='container' />
            <Button disabled>Save</Button>
          </div>
        </div>
        <hr className='dividor' />
      </Modal>
    );
  }
}

AddModal.propTypes = {
  show: PropTypes.bool,
  setAddModal: PropTypes.func,
}

const mapStateToProps = state => ({
  show: state.addModal.show,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  setAddModal,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);

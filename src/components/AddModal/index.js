import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

import { setAddModal, fetchAddCounter } from './actions';
import { addCounter } from '../../routes/Main/actions';
import { setAlertModal } from '../AlertModal/actions';

import Button from '../Button';
import Loading from '../Loading';
import { ReactComponent as Plus } from '../../assets/plus.svg';

import './style.css';

Modal.setAppElement('#root');

const styles = {
  text: {
    margin: '0px 16px',
  },
}

class AddModal extends Component {
  constructor(props) {
    super(props)
    this.state = { name: '' }
  }

  handleInputOnChange = e => {
    const value = e.target.value
    this.setState(state => ({
      ...state,
      name: value,
    }))
  }

  handleClose = () => {
    this.props.setAddModal(false)
  }

  handleInputClick = () => {
    this.input.focus()
  }

  handleSaveClick = async e => {
    e.preventDefault()
    if (!this.state.name) return
    const res = await this.props.fetchAddCounter(this.state.name)
    if (res.ok) {
      this.props.addCounter(res.body)
      this.handleClose()
    } else {
      const title = 'Couldn’t create counter'
      const message = 'The Internet connection appears to be offline.'
      const content = [
        {
          text: 'Dismiss',
          action: setAlertModal(false),
        }
      ]
      this.props.setAlertModal(true, title, message, content)
    }
  }

  render() {
    const { isFetching, show } = this.props

    return (
      <Modal
        className='addmodal-content container column'
        overlayClassName='addmodal-overlay container center'
        onRequestClose={this.handleClose}
        shouldCloseOnOverlayClick
        closeTimeoutMS={500}
        isOpen={show}
      >
        <div className='addmodal-container'>
          <div>
            <div className='container center'>
              <div onClick={this.handleClose} className='addmodal-icon center'><Plus /></div>
              <p className='title' style={styles.text}>Create Counter</p>
              <div className='container' />
              <Button
                disabled={isFetching || !this.state.name}
                onClick={this.handleSaveClick}
              >
                Save
              </Button>
            </div>
          </div>
          <hr className='addmodal-dividor' />
          {isFetching ? <Loading /> : (
            <form onSubmit={this.handleSaveClick}>
              <p className='name-label'>Name</p>
              <div className='input-content name-input' onClick={this.handleInputClick}>
                <input
                  autoFocus
                  ref={inp => this.input = inp}
                  placeholder='Cups of coffee'
                  onChange={this.handleInputOnChange}
                />
              </div>
              <p className='small'>
                Give it a name. Creative block? See <Link to='/example'>examples</Link>.
              </p>
            </form>
          )}
        </div>
      </Modal>
    );
  }
}

AddModal.propTypes = {
  isFetching: PropTypes.bool,
  show: PropTypes.bool,
  setAddModal: PropTypes.func,
  fetchAddCounter: PropTypes.func,
  addCounter: PropTypes.func,
  setAlertModal: PropTypes.func,
}

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  show: state.addModal.show,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  setAddModal,
  fetchAddCounter,
  addCounter,
  setAlertModal,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

import { setAddModal, fetchAddCounter } from './actions';
import { addCounter } from '../../routes/Main/actions';

import Button from '../Button';
import Loading from '../../components/Loading';
import { ReactComponent as Plus } from '../../assets/plus.svg';

import './style.css';

Modal.setAppElement('#root');

const styles = {
  container: {
    padding: '16px',
    alignItems: 'center',
  },
  text: {
    margin: '0px 16px',
  },
  content: {
    padding: '0px 18px',
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

  handleSaveClick = async () => {
    if (!this.state.name) return
    const res = await this.props.fetchAddCounter(this.state.name)
    if (res.ok) {
      this.props.addCounter(res.body)
      this.handleClose()
    } else {
      // show modal with error
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
        <div>
          <div style={styles.container} className='container between'>
            <div onClick={this.handleClose} className='icon center'><Plus /></div>
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
        <hr className='dividor' />
        {isFetching ? <Loading /> : (
          <div style={styles.content}>
            <p className='name-text'>Name</p>
            <div className='input-content name-input' onClick={this.handleInputClick}>
              <input
                ref={inp => this.input = inp}
                placeholder='Cups of coffee'
                onChange={this.handleInputOnChange}
              />
            </div>
            <p className='small'>
              Give it a name. Creative block? See <Link to='/example'>examples</Link>.
            </p>
          </div>
        )}
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
}

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  show: state.addModal.show,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  setAddModal,
  fetchAddCounter,
  addCounter,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);

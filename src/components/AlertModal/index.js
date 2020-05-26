import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { setAlertModal } from './actions';

import Button from '../Button';

import './style.css';

Modal.setAppElement('#root');

const styles = {
  title: {
    margin: '0px',
  },
  message: {
    textAlign: 'center',
    color: '#4A4A4A',
  },
}

class AlertModal extends Component {
  handleClose = () => {
    this.props.setAlertModal(false)
  }

  handleDispatchAction = async content => {
    this.handleClose()
    const { action, fetch, backup } = content
    const res = await this.props.dispatch(action)
    if (fetch && backup && !res.ok) this.props.dispatch(content.backup)
  }

  render() {
    const { isFetching, show, title, message, content } = this.props

    return (
      <Modal
        className='alertmodal-content container column'
        overlayClassName='alertmodal-overlay container center'
        onRequestClose={this.handleClose}
        shouldCloseOnOverlayClick
        closeTimeoutMS={500}
        isOpen={show}
      >
        <div>
          <div className='container column addmodal-container'>
            <p className='title' style={styles.title}>{title}</p>
            <p className='small' style={styles.message}>{message}</p>
            <div className='container' />
            <div className='container evenly'>
              {content.map(c => (
                <Button
                  key={c.text}
                  disabled={!show || isFetching}
                  {...c.props}
                  onClick={() => {if (c.action) this.handleDispatchAction(c)}}
                >
                  {c.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

AlertModal.propTypes = {
  isFetching: PropTypes.bool,
  setAlertModal: PropTypes.func,
  dispatch: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  content: PropTypes.array,
}

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  show: state.alertModal.show,
  title: state.alertModal.title,
  message: state.alertModal.message,
  content: state.alertModal.content,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    setAlertModal,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertModal);

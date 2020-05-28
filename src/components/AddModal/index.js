import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { setAddModal, fetchAddCounter } from './actions';
import { addCounter } from '../../routes/Main/actions';
import { setAlertModal } from '../AlertModal/actions';

import Button from '../Button';
import Loading from '../Loading';
import Badge from '../Badge';
import { ReactComponent as Plus } from '../../assets/plus.svg';

import './style.css';

Modal.setAppElement('#root');

const drinkExamples = [
  'Cup of coffee',
  'Glasses of water',
  'Cans of cola',
  'Milk shakes',
]

const foodExamples = [
  'Hot-dogs',
  'Cupcakes',
  'Chicken wings',
  'Chocolate',
  'Apples',
  'Salads',
]

const miscExamples = [
  'Times sneezed',
  'Naps',
  'Day dreaming',
  'Yawns',
]

const styles = {
  text: {
    margin: '0px 16px',
  },
  exampleSubTitle: {
    margin: '28px 0px',
  }
}

const ExampleContent = ({ handleBadgeClick }) => (
  <div>
    <p className='small' style={styles.exampleSubTitle}>
      Select an example to add it to your counters.
    </p>
    <div>
      <p className='bold'>Drinks</p>
      <div className='hide-scroll container'>
        {drinkExamples.map(t => (
          <Badge key={t} onClick={handleBadgeClick}>
            {t}
          </Badge>
        ))}
      </div>
      <p className='bold'>Food</p>
      <div className='hide-scroll container'>
        {foodExamples.map(t => (
          <Badge key={t} onClick={handleBadgeClick}>
            {t}
          </Badge>
        ))}
      </div>
      <p className='bold'>Misc</p>
      <div className='hide-scroll container'>
        {miscExamples.map(t => (
          <Badge key={t} onClick={handleBadgeClick}>
            {t}
          </Badge>
          ))}
      </div>
    </div>
  </div>
)

class AddModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      example: false,
    }
  }

  handleExampleClick = () => {
    this.setState(state => ({
      ...state,
      example: true,
    }))
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

  handleAfterClose = () => {
    this.setState(state => ({
      ...state,
      example: false,
    }))
  }

  handleInputClick = () => {
    this.input.focus()
  }

  handleSaveClick = async e => {
    if (e) e.preventDefault()
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

  handleBadgeClick = badge => {
    this.setState(state => ({
      ...state,
      name: badge,
    }), () => this.handleSaveClick())
    this.handleClose()
  }

  render() {
    const { isFetching, show } = this.props
    const { example } = this.state

    return (
      <Modal
        className='addmodal-content container column'
        overlayClassName='addmodal-overlay container center'
        onRequestClose={this.handleClose}
        onAfterClose={this.handleAfterClose}
        shouldCloseOnOverlayClick
        closeTimeoutMS={500}
        isOpen={show}
      >
        <div className='addmodal-container'>
          <div className='container center'>
            <div onClick={this.handleClose} className='addmodal-icon center'><Plus /></div>
            <p className='title' style={styles.text}> {example ? 'Examples' : 'Create Counter'}</p>
            <div className='container' />
            {!example && (
              <Button
                disabled={isFetching || !this.state.name}
                onClick={this.handleSaveClick}
              >
                Save
              </Button>
            )}
          </div>
          <hr className='addmodal-dividor' />
          {isFetching ? <Loading /> : (
            example ? <ExampleContent handleBadgeClick={this.handleBadgeClick} /> : (
              <form onSubmit={this.handleSaveClick}>
                <p className='name-label bold'>Name</p>
                <div className='input-content name-input' onClick={this.handleInputClick}>
                  <input
                    autoFocus
                    ref={inp => this.input = inp}
                    placeholder='Cups of coffee'
                    onChange={this.handleInputOnChange}
                  />
                </div>
                <p className='small'>
                  Give it a name. Creative block? See <span className='link' onClick={this.handleExampleClick}>
                    examples
                  </span>.
                </p>
              </form>
            )
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

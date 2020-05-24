import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ReactComponent as Plus } from '../../assets/plus-color.svg';
import { ReactComponent as Minus } from '../../assets/minus-color.svg';
import { ReactComponent as MinusWhite } from '../../assets/minus.svg';

import { fetchCounterPlus, fetchCounterMinus } from '../../routes/Main/actions';
import { setAlertModal } from '../AlertModal/actions';

import './style.css';

const styles = {
  disabledText: {
    color: '#888B90',
  }
}

class CounterItem extends Component {
  handlePlusClick = async () => {
    const res = await this.props.fetchCounterPlus(this.props.counter.id)
    if (!res.ok) {
      const title = `Couldn’t update “${this.props.counter.title}” to ${this.props.counter.count + 1}`
      const message = 'The Internet connection appears to be offline.'
      const content = [
        {
          text: 'Retry',
          action: fetchCounterPlus(this.props.counter.id),
        },
        {
          text: 'Dismiss',
          props: { white: true },
          action: setAlertModal(false),
        }
      ]
      this.props.setAlertModal(true, title, message, content)
    }
  }

  handleMinusClick = async () => {
    if (this.props.counter.count <= 0) return

    const res = await this.props.fetchCounterMinus(this.props.counter.id)
    if (!res.ok) {
      const title = `Couldn’t update “${this.props.counter.title}” to ${this.props.counter.count - 1}`
      const message = 'The Internet connection appears to be offline.'
      const content = [
        {
          text: 'Retry',
          action: fetchCounterMinus(this.props.counter.id),
        },
        {
          text: 'Dismiss',
          props: { white: true },
          action: setAlertModal(false),
        }
      ]
      this.props.setAlertModal(true, title, message, content)
    }
  }

  render() {
    const { counter, selected } = this.props

    let contentClass = "counter-content" + (selected ? " content-selected" : "")

    return (
      <div className={contentClass}>
        <div>
          <p style={{ textAlign: 'start' }}>{counter.title}</p>
        </div>
        <div className='container' />
        <div>
          <div className='counter-buttons'>
            <div onClick={this.handleMinusClick} className='container center'>
              {counter.count <= 0 ? <MinusWhite /> : <Minus />}
            </div>
            <p
              className='counter-count-text'
              style={counter.count <= 0 ? styles.disabledText : {}}
            >
              {counter.count}
            </p>
            <div onClick={this.handlePlusClick} className='container center'>
              <Plus />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CounterItem.propTypes = {
  selected: PropTypes.bool,
  counter: PropTypes.object,
  fetchCounterPlus: PropTypes.func,
  fetchCounterMinus: PropTypes.func,
  setAlertModal: PropTypes.func,
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchCounterPlus,
  fetchCounterMinus,
  setAlertModal,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CounterItem);
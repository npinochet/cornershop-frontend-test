import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ReactComponent as Plus } from '../../assets/plus-color.svg';
import { ReactComponent as Minus } from '../../assets/minus-color.svg';
import { ReactComponent as MinusWhite } from '../../assets/minus.svg';

import { fetchCounterModify } from '../../routes/Main/actions';
import { setAlertModal } from '../AlertModal/actions';

import './style.css';

class CounterItem extends Component {
  handleChangeClick = async amount => {
    const { counter } = this.props
    if (amount < 0 && counter.count <= 0) return

    const res = await this.props.fetchCounterModify(counter.id, amount)

    if (!res.ok) {
      const title = `Couldn’t update “${counter.title}” to ${counter.count + amount}`
      const message = 'The Internet connection appears to be offline.'
      const content = [
        {
          text: 'Retry',
          fetch: true,
          action: fetchCounterModify(counter.id, amount),
        },
        {
          text: 'Dismiss',
          props: { white: true },
          action: setAlertModal(false),
        }
      ]
      content[0].onFail = setAlertModal(true, title, message, content)
      this.props.setAlertModal(true, title, message, content)
    }
  }

  render() {
    const {
      counter,
      selected,
      onTouchStart,
      onMouseDown,
      onTouchEnd,
      onMouseUp,
      onMouseLeave,
    } = this.props

    let contentClass = "counter-content" + (selected ? " content-selected" : "")

    return (
      <div>
        <div 
          className={contentClass}
          onTouchStart={onTouchStart}
          onMouseDown={onMouseDown}
          onTouchEnd={onTouchEnd}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <div className='counter-title'>
            <p className='counter-title-text'>{counter.title}</p>
          </div>
          <div className='container' />
          <div>
            <div className='container'>
              <div onClick={() => this.handleChangeClick(-1)} className='container center'>
                {counter.count <= 0 ? <MinusWhite /> : <Minus />}
              </div>
              <p
                className={'counter-count-text' + (counter.count <= 0 ? ' counter-disabled' : '')}
              >
                {counter.count}
              </p>
              <div onClick={() => this.handleChangeClick(1)} className='container center'>
                <Plus />
              </div>
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
  fetchCounterModify: PropTypes.func,
  setAlertModal: PropTypes.func,
  onTouchStart: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchCounterModify,
  setAlertModal,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CounterItem);
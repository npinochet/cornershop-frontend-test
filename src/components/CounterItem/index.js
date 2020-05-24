import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ReactComponent as Plus } from '../../assets/plus-color.svg';
import { ReactComponent as Minus } from '../../assets/minus-color.svg';
import { ReactComponent as MinusWhite } from '../../assets/minus.svg';

import { fetchCounterPlus, fetchCounterMinus } from '../../routes/Main/actions';

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
      // show error modal
    }
  }

  handleMinusClick = async () => {
    if (this.props.counter.count <= 0) return

    const res = await this.props.fetchCounterMinus(this.props.counter.id)
    if (!res.ok) {
      // show error modal
    }
  }

  render() {
    const { counter } = this.props

    return (
      <div className='counter-content'>
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
  counter: PropTypes.object,
  fetchCounterPlus: PropTypes.func,
  fetchCounterMinus: PropTypes.func,
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchCounterPlus,
  fetchCounterMinus,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CounterItem);
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCounterRemoveSelected, clearSelectCounter } from '../../routes/Main/actions';
import { setAddModal } from '../AddModal/actions';
import { setAlertModal } from '../AlertModal/actions';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Share } from '../../assets/share.svg';
import { ReactComponent as Remove } from '../../assets/remove.svg';
import Button from '../Button';

import './style.css';

class AddBar extends Component {
  handleAddClick = () => {
    this.props.setAddModal(true)
  }

  handleRemoveClick = () => {
    const { selected, counters } = this.props

    const firstName = counters.filter(c => c.id === selected[0])[0].title
    const counterName = selected.length === 1 ? `"${firstName}"` : 'selected'

    const backup = setAlertModal(
      true,
      `Couldn’t delete ${counterName} counter` + (selected.length === 1 ? '' : 's'),
      'The Internet connection appears to be offline.',
      [
        {
          text: 'Retry',
          fetch: true,
          action: fetchCounterRemoveSelected(),
        },
        {
          text: 'Dismiss',
          props: { white: true },
          action: setAlertModal(false),
        }
      ]
    )

    const title = `Delete the ${counterName} counter` + (selected.length === 1 ? '?' : 's?')
    const message = 'This cannot be undone.'
    const content = [
      {
        text: 'Cancel',
        action: setAlertModal(false),
      },
      {
        text: 'Delete',
        props: { white: true, textProps: { style: { color: '#FF3B30' } } },
        fetch: true,
        action: fetchCounterRemoveSelected(),
        backup,
      }
    ]
    this.props.setAlertModal(true, title, message, content)
  }

  render() {
    const { isFetching, show, selectMode } = this.props
    if (!show) return <Fragment />

    return (
      <div>
        <hr />
        <div className='bar-container'>
          <div className='container'>
            {selectMode && (
              <Fragment>
                <Button
                  white
                  onClick={this.handleRemoveClick}
                  disabled={isFetching}
                >
                  <Remove />
                </Button>
                <div style={{ marginRight: '18px' }} />
                <Button white><Share /></Button>
              </Fragment>
            )}
            <div className='container' />
            <Button
              disabled={isFetching}
              onClick={this.handleAddClick}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AddBar.propTypes = {
  isFetching: PropTypes.bool,
  show: PropTypes.bool,
  setAddModal: PropTypes.func,
  selected: PropTypes.array,
  counters: PropTypes.array,
  selectMode: PropTypes.bool,
  setAlertModal: PropTypes.func,
  clearSelectCounter: PropTypes.func,
}

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  show: state.addBar.show,
  selected: state.main.selected,
  selectMode: state.main.selectMode,
  counters: state.main.counters,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  setAddModal,
  setAlertModal,
  clearSelectCounter,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(AddBar);

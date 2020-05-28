import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import { fetchCounterRemoveSelected, clearSelectCounter } from '../../routes/Main/actions';
import { setAddModal } from '../AddModal/actions';
import { setAlertModal } from '../AlertModal/actions';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Share } from '../../assets/share.svg';
import { ReactComponent as Remove } from '../../assets/remove.svg';
import Button from '../Button';

import './style.css';


class CopyToolTipOverlay extends Component {
  constructor(props) {
    super(props)
    this.state = { copied: false }
  }

  handleCopyClipboard = () => {
    const { selected, counters, setToolTipVisible } = this.props

    const text = counters
      .filter(c => selected.includes(c.id))
      .map(c => `${c.count} X ${c.title}`)
      .join('\n')

    navigator.clipboard.writeText(text)
    setToolTipVisible(false)

    this.setState(state => ({
      ...state,
      copied: true,
    }))

    setTimeout(() => {
      this.setState(state => ({
        ...state,
        copied: false,
      }))
    }, 800)
  }

  render() {
    const { selected, counters } = this.props
    const { copied } = this.state

    return (
      <div className='container'>
        <div className='container column'>
          <p className='copy-tooltip-text'>
            {copied ? 'Copied!' :
              `Share ${selected.length} counter${selected.length > 1 ? 's' : ''}`
            }
          </p>
          <div className='copy-tooltip-separator'>
            <Button
              white
              disabled={copied}
              onClick={this.handleCopyClipboard}
            >
              Copy
            </Button>
          </div>
        </div>
        <div className='copy-preview'>
          {counters.filter(c => selected.includes(c.id)).map(c => (
            <p
              key={c.id}
              className='bold copy-preview-text'
            >
              {`${c.count} X ${c.title}`}
            </p>
          ))}
        </div>
      </div>
    )
  }
}

class OptionBar extends Component {
  constructor(props) {
    super(props)
    this.state = { toolTipVisible: false }
  }

  setToolTipVisible = visible => {
    this.setState(state => ({
      ...state,
      toolTipVisible: visible,
    }))
  }

  handleAddClick = () => {
    this.props.setAddModal(true)
  }

  handleRemoveClick = () => {
    const { selected, counters } = this.props

    const firstName = counters.filter(c => c.id === selected[0])[0].title
    const counterName = selected.length === 1 ? `"${firstName}"` : 'selected'

    const onFail = setAlertModal(
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
    onFail.payload.content[0].onFail = onFail

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
        onFail,
      }
    ]
    this.props.setAlertModal(true, title, message, content)
  }

  render() {
    const {
      isFetching,
      show,
      selectMode,
      counters,
      selected,
    } = this.props
  
    if (!show) return <Fragment />

    return (
      <div>
        <hr />
        <div className='container optionbar-container'>
          {selectMode && (
            <Fragment>
              <Button
                white
                onClick={this.handleRemoveClick}
                disabled={isFetching}
              >
                <Remove />
              </Button>
              <div className="optionbar-separator" />
              <Tooltip
                prefixCls='copy-tooltip'
                placement='top'
                trigger={'click'}
                overlay={<CopyToolTipOverlay
                  selected={selected}
                  counters={counters}
                  setToolTipVisible={this.setToolTipVisible}
                />}
                visible={this.state.toolTipVisible}
                onVisibleChange={this.setToolTipVisible}
                transitionName='rc-tooltip-zoom'
              >
                <Button white><Share /></Button>
              </Tooltip>
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
    );
  }
}

OptionBar.propTypes = {
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
  show: state.optionBar.show,
  selected: state.main.selected,
  selectMode: state.main.selectMode,
  counters: state.main.counters,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  setAddModal,
  setAlertModal,
  clearSelectCounter,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(OptionBar);

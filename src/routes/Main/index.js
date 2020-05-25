import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCounters, selectCounter } from './actions';
import { setSearchBar } from '../../components/SearchBar/actions';
import { setAddBar } from '../../components/AddBar/actions';

import Loading from '../../components/Loading';
import CounterItem from '../../components/CounterItem';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';
import { ReactComponent as RefreshColor } from '../../assets/refresh-color.svg';

import './style.css';

const styles = {
  text: {
    margin: '0px 50px',
  },
}

class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: false,
      message: false,
      refreshing: false,
    }
    this.pressTimer = false
  }

  refreshCounters = async debouncer => {
    const res = await this.props.fetchCounters(debouncer)

    if (!res.ok) {
      this.setState(state => ({
        ...state,
        title: 'Couldn’t load the counters',
        message: 'The Internet connection appears to be offline.',
      }))
      return res
  }
    
    if (this.props.counters.length <= 0) {
      this.setState(state => ({
        ...state,
        title: 'No counters yet',
        message: '“When I started counting my blessings, my whole life turned around.”\n —Willie Nelson',
      }))
      return res
    }

    if (this.state.title) this.setState(state => ({
      ...state,
      title: false,
      message: false,
    }))

    return res
  }

  componentDidMount() {
    this.props.setSearchBar(true)
    this.props.setAddBar(true)

    if (!this.props.initialFetch) this.refreshCounters(false)
  }

  componentDidUpdate() {
    if (this.props.update) this.refreshCounters(false)
  }

  handleRefreshClick = async () => {
    this.setState(state => ({
      ...state,
      refreshing: true,
    }))
    await this.props.fetchCounters(true)
    this.setState(state => ({
      ...state,
      refreshing: false,
    }))
  }

  getTotalCounts = () => (
    this.props.counters.map(i => i.count).reduce((a, b) => a + b, 0)
  )

  handleCounterPress = c => {
    if (this.props.selectMode) {
      this.props.selectCounter(c.id, this.props.selected.includes(c.id))
      return
    }

    this.pressTimer = setTimeout(() => this.props.selectCounter(c.id), 500);
  }

  handleCounterRelease = e => {
    if (this.props.selectMode) {
      if (e) e.preventDefault()
      return
    }
    clearTimeout(this.pressTimer)
  }

  render() {
    const { isFetching, counters, selected, selectMode } = this.props
    let { title, message, refreshing } = this.state
    if (isFetching) return <Loading />

    if (title) {
      return (
        <div className='container column center' style={styles.text}>
          <p className='title'>{title}</p>
          <p>{message}</p>
        </div>
      )
    }

    return (
      <div className='container' style={{ justifyContent: 'center' }}>
        <div className='container column main-content'>
          <div className='info'>
            {selectMode ? (
              <p className='main-times-text' style={{ color: '#FF9500', marginRight: '6px' }}>
                {selected.length} selected
              </p>
            ) : (
              <Fragment>
                <p className='main-times-text'>
                {counters.length} items
                </p>
                <p className='main-items-text'>
                  {this.getTotalCounts()} times
                </p>
              </Fragment>
            )}
            {!refreshing ? <Refresh onClick={this.handleRefreshClick} /> : (
              <div className='container' style={{ alignItems: 'center' }}>
                <RefreshColor style={{ marginRight: '6px' }} />
                <p style={ {fontWeight: 500, color: '#FF9500' }}>Refreshing...</p>
              </div>
            )}
          </div>
          <div className='column main-scroll'>
            {counters.map(c => <CounterItem
              selected={selectMode && selected.includes(c.id)}
              key={c.id}
              counter={c}
              onTouchStart={() => this.handleCounterPress(c)}
              onMouseDown={() => this.handleCounterPress(c)}
              onTouchEnd={this.handleCounterRelease}
              onMouseUp={this.handleCounterRelease}
              onMouseLeave={this.handleCounterRelease}
            />)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  initialFetch: state.main.initialFetch,
  counters: state.main.counters,
  update: state.main.update,
  selected: state.main.selected,
  selectMode: state.main.selectMode,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchCounters,
  setSearchBar,
  setAddBar,
  selectCounter,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

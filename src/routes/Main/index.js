import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCounters, selectCounter } from './actions';
import { setSearchBar } from '../../components/SearchBar/actions';
import { setOptionBar } from '../../components/OptionBar/actions';

import Loading from '../../components/Loading';
import CounterItem from '../../components/CounterItem';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';
import { ReactComponent as RefreshColor } from '../../assets/refresh-color.svg';

import './style.css';

const styles = {
  text: {
    margin: '0px 50px',
  },
  results: {
    fontWeight: 500,
    color: '#888B90',
  }
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
    this.props.setOptionBar(true)

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
    await this.refreshCounters()
    this.setState(state => ({
      ...state,
      refreshing: false,
    }))
  }

  handleCounterPress = c => {
    if (this.props.selectMode) {
      this.props.selectCounter(c.id, this.props.selected.includes(c.id))
      return
    }

    this.pressTimer = setTimeout(() => this.props.selectCounter(c.id), 300);
  }

  handleCounterRelease = e => {
    if (this.props.selectMode) {
      if (e) e.preventDefault()
      return
    }
    clearTimeout(this.pressTimer)
  }

  render() {
    const { isFetching, selected, selectMode, search } = this.props
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

    let counters = this.props.counters
    if (search) counters = counters.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

    if (search && counters.length <= 0) {
      return (
        <div className='container center'>
          <p className='title' style={styles.results}>No results</p>
        </div>
      )
    }

    return (
      <div className='container main-container'>
        <div className='container column main-content'>
          <div className='info'>
            <p className={'main-times-text' + (selectMode ? ' main-text-color' : '')}>
              {selectMode ? selected.length : counters.length} {selectMode ? 'selected' : 'items'}
            </p>
            {!selectMode && (
              <Fragment>
                <p className='bold main-items-text'>
                  {counters.map(i => i.count).reduce((a, b) => a + b, 0)} times
                </p>
              </Fragment>
            )}
            {!refreshing ? <Refresh className='main-icon' onClick={this.handleRefreshClick} /> : (
              <Fragment>
                <RefreshColor className='main-icon' />
                <p className='main-text-color bold'>Refreshing...</p>
              </Fragment>
            )}
          </div>
          <div className='column hide-scroll main-scroll'>
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
  search: state.searchBar.search,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchCounters,
  setSearchBar,
  setOptionBar,
  selectCounter,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

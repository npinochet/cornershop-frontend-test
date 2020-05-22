import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCounters } from './actions';
import { setSearchBar } from '../../components/SearchBar/actions';
import { setAddBar } from '../../components/AddBar/actions';

import Loading from '../../components/Loading';

const styles = {
  text: {
    margin: '0px 50px',
  },
}

const noCountersText = {
  title: 'No counters yet',
  message: '“When I started counting my blessings, my whole life turned around.”\n —Willie Nelson',
}

class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: false,
      message: false,
    }
  }

  async componentDidMount() {
    this.props.setSearchBar(true)
    this.props.setAddBar(true)

    if (!this.props.initialFetch) {
      const res = await this.props.fetchCounters()

      if (!res.ok) this.setState(state => ({
        ...state,
        title: 'Oops!',
        message: 'There seems to be a problem with your conexión',
      }))
    }
  }

  render() {
    const { isFetching, counters } = this.props
    let { title, message } = this.state
    if (isFetching) return <Loading />

    if (title || counters.length <= 0) {
      title = title || noCountersText.title
      message = message || noCountersText.message
      return (
        <div className='container column center' style={styles.text}>
          <p className='title'>{title}</p>
          <p>{message}</p>
        </div>
      )
    }

    return (
      <div className='container evenly column'>
        <div><p>Hello</p></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  initialFetch: state.main.initialFetch,
  counters: state.main.counters,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchCounters,
  setSearchBar,
  setAddBar,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

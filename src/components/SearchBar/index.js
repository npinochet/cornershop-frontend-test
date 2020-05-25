import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../Button';
import { ReactComponent as Glass } from '../../assets/glass.svg';

import './style.css';

const styles = {
  icon: {
    marginRight: '16px',
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  handleClick = () => {
    this.input.focus()
  }

  handleOnFocus = () => {
    this.setState(state => ({
      ...state,
      focused: true,
    }))
  }

  handleOnBlur = () => {
    this.setState(state => ({
      ...state,
      focused: false,
    }))
  }

  render() {
    const { show } = this.props
    const { focused } = this.state
    if (!show) return <Fragment />

    return (
      <div className='input-container'>
        <div className='input-content' onClick={this.handleClick}>
          <Glass style={styles.icon} />
          <input
            ref={inp => this.input = inp}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            type='search'
            placeholder='Search Counters'
          />
        </div>
        {focused && (
          <Button
            white
            style={{marginLeft: '12px'}}
            textProps={{style: {color: '#4A4A4A'}}}
          >
            Cancel
          </Button>
        )}
      </div>
    );
  }
}

SearchBar.propTypes = {
  show: PropTypes.bool,
}

const mapStateToProps = state => ({
  show: state.searchBar.show,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

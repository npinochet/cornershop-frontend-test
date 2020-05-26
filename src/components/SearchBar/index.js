import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSearch, setFocus } from './actions';

import Button from '../Button';
import { ReactComponent as Glass } from '../../assets/glass.svg';

import './style.css';

class SearchBar extends Component {
  handleClick = () => {
    this.input.focus()
  }

  handleOnFocus = () => {
    this.props.setFocus(true)
  }

  handleOnBlur = () => {
    if (!this.props.search) this.props.setFocus(false)
  }

  handleOnChange = e => {
    this.props.setSearch(e.target.value)
  }

  handleCancelClick = () => {
    this.props.setFocus(false)
    this.props.setSearch(false)
  }

  render() {
    const { show, search, focused } = this.props
    if (!show) return <Fragment />

    return (
      <div className='search-container'>
        <div className='input-content' onClick={this.handleClick}>
          <Glass className='search-glass-icon' />
          <input
            ref={inp => this.input = inp}
            value={search}
            onChange={this.handleOnChange}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            type='search'
            placeholder='Search Counters'
          />
        </div>
        {focused && (
          <Button
            white
            className='search-button'
            textProps={{ style: { color: '#4A4A4A' } }}
            onClick={this.handleCancelClick}
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
  search: PropTypes.string,
  setSearch: PropTypes.func,
  setFocus: PropTypes.func,
}

const mapStateToProps = state => ({
  show: state.searchBar.show,
  search: state.searchBar.search,
  focused: state.searchBar.focused,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  setSearch,
  setFocus,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

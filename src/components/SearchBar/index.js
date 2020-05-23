import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ReactComponent as Glass } from '../../assets/glass.svg';

import './style.css';

const styles = {
  icon: {
    marginRight: '16px',
  }
}

class SearchBar extends Component {
  handleClick = () => {
    this.input.focus()
  }

  render() {
    const { show } = this.props
    if (!show) return <Fragment />

    return (
      <div className='input-container'>
        <div className='input-content search-input' onClick={this.handleClick}>
          <Glass style={styles.icon} />
          <input
            ref={inp => this.input = inp}
            type='search'
            placeholder='Search Counters'
          />
        </div>
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

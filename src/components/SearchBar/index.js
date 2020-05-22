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
  onClickHandle = e => {
    this.input.focus()
  }

  render() {
    const { show } = this.props
    if (!show) return <Fragment />

    return (
      <div className='input-container'>
        <div className='input-content' onClick={this.onClickHandle}>
          <Glass style={styles.icon} />
          <input
            ref={inp => this.input = inp}
            className='input'
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

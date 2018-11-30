import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSplitPane from 'react-split-pane';

import './splitPane.scss';

class SplitPane extends Component {
  render() {
    const { children, defaultSize } = this.props;

    let def = localStorage.getItem('splitPos');
    if (def) def = def * 100 + '%';
    else def = defaultSize;

    return (
      <ReactSplitPane
        {...this.props}
        defaultSize={def}
        onChange={size => localStorage.setItem('splitPos', size / window.innerWidth)}
      >
        {children}
      </ReactSplitPane>
    );
  }
}

SplitPane.propTypes = {
  children: PropTypes.node,
  defaultSize: PropTypes.string,
};

export default SplitPane;

import React, { Component } from 'react';

import { ThemeContext } from 'theme';

import './editor.scss';

class Editor extends Component {
  static contextType = ThemeContext;

  render() {
    const { panel } = this.context;

    return (
      <div styleName='container'>
        <div styleName='editor' style={panel}>
          Editor
        </div>
      </div>
    );
  }
}

export default Editor;

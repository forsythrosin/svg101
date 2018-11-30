import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from 'theme';

import './header.scss';

class Header extends Component {
  static contextType = ThemeContext;

  renderThemeSwitch() {
    const { switchTheme } = this.props;
    const { name, header } = this.context;

    return (
      <div styleName={'themeSwitch'} onClick={switchTheme}>
        <p>{name}</p>
        <div styleName="switch">
          <div styleName={['handle', name].join(' ')} style={{ backgroundColor: header.color }} />
        </div>
      </div>
    );
  }

  render() {
    const { header, primary } = this.context;

    return (
      <div styleName="header" style={header}>
        <div styleName="logo">svg<span style={{ color: primary }}>101</span></div>
        {this.renderThemeSwitch()}
      </div>
    );
  }
}

Header.propTypes = {
  switchTheme: PropTypes.func,
};

export default Header;

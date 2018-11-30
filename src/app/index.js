import React, { Component } from 'react';

import Workspace from 'workspace';
import Editor from 'editor';

import { ThemeContext, themes } from 'theme';
import SplitPane from './splitPane';
import Header from './header';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    const stored = localStorage.getItem('theme');
    this.state = {
      theme: stored ? themes[stored] : themes.light,
    };
  }

  toggleTheme() {
    const { theme } = this.state;

    const newTheme = theme === themes.light ? 'dark' : 'light';

    this.setState({
      theme: themes[newTheme],
    });
    localStorage.setItem('theme', newTheme);
  }

  render() {
    const { theme } = this.state;
    const { backgroundColor, color } = theme;

    return (
      <div styleName="app">
        <style dangerouslySetInnerHTML={{
          __html: `body { background: ${backgroundColor}; color: ${color}; }} }`
        }}/>
        <ThemeContext.Provider value={theme}>
          <Header
            switchTheme={() => this.toggleTheme()}
          />
          <SplitPane split="vertical" defaultSize="50%">
            <Workspace />
            <Editor />
          </SplitPane>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export { ThemeContext };

export default App;

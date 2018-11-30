import React from 'react';

const themes = {
  light: {
    name: 'light',
    primary: '#93bf6e',
    header: {
      backgroundColor: '#222',
      color: '#f7f7f7'
    },
    panel: {
      backgroundColor: '#f7f7f7',
      color: '#222',
    },
    backgroundColor: '#fff',
    color: '#222',
  },
  dark: {
    name: 'dark',
    primary: '#93bf6e',
    header: {
      backgroundColor: '#000',
      color: '#e7e7e7'
    },
    panel: {
      backgroundColor: '#222',
      color: '#f7f7f7'
    },
    backgroundColor: '#111',
    color: '#f7f7f7'
  },
};

const ThemeContext = React.createContext(themes.light);
const ThemeProvider = ThemeContext.Provider;

export {
  themes,
  ThemeContext,
  ThemeProvider,
};

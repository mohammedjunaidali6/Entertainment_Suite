import React, { useState, useLayoutEffect } from 'react';

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
});

export default ThemeContext;

export function ThemeProvider (props) {
  // keeps state of the current theme
  const [dark, setDark] = useState(false);
  
  // paints the app before it renders elements
  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem('darkTheme');
    
    if (lastTheme === 'true') {
      setDark(true);
      applyTheme(darkTheme);
    } else {
      setDark(false);
      applyTheme(lightTheme);
    } 
  // if state changes, repaints the app
  }, [dark]);

  // rewrites set of css variablels/colors
  const applyTheme = theme => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = theme.join(';');
  }

  const toggle = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.cssText = 'transition: background .5s ease';

    setDark(!dark);
    window.localStorage.setItem('darkTheme', !dark);
  };

  return (
    <ThemeContext.Provider value={{
      dark,
      toggle,
    }}>
      {props.children}
    </ThemeContext.Provider>
  )
}


// styles
const lightTheme = [
  '--bodyBg: rgb(242 244 245)',
  '--headerBg: #6B9CF3', 
  '--headerAltBg: #4C83E5', 
  '--sideMenuBg: #ffffff',
  '--sideMenuSubBg: rgb(237 238 240)',
  '--sideMenuActiveBg: #EDEEF0'
];

const darkTheme = [
  '--bodyBg: rgb(242 244 245)',
  '--headerBg: #585d65',
  '--headerAltBg: #4C83E5',
  '--sideMenuBg: #ffffff',
  '--sideMenuSubBg: rgb(237 238 240)',
  '--sideMenuActiveBg: #EDEEF0'
];
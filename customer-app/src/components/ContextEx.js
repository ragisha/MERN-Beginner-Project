import React,{useContext} from 'react';

const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee",
      name:"Light theme"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222",
      name:"Dark theme"
    }
  };
  
  //const ThemeContext = React.createContext(themes.light);
  const ThemeContext = React.createContext(themes.light);
  
  function ContextApp() {
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
  
  function Toolbar(props) {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }
  
  function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
      <div>
        <h4>The theme is {theme.name}</h4>
        <button style={{ background: theme.background, color: theme.foreground }}>
          I am styled by theme context!
        </button>
      </div>

    );
  }
  export default ContextApp;

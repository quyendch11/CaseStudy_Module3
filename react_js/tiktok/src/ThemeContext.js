import {useState,createContext} from "react";

const themeContext = createContext()

function ThemeProvider({children}) {
    const [theme,setTheme] = useState('dark')
    const toggleTheme = ()=> {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    const value = {
        theme,
        toggleTheme
    }
    return(
        <themeContext.Provider value={value}>
            {children}
        </themeContext.Provider>
        )
}
export {themeContext, ThemeProvider}
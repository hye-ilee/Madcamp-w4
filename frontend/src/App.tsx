import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Tester from './pages/Tester';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path="/" element={<Tester />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Tester from './pages/Tester';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import Search from './pages/Search';
import SearchLabs from './pages/SearchLabs';
import LabInfo from './pages/LabInfo';
import LabBoard from './pages/LabBoard';
import DeptSearch from './pages/DeptSearch';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/search" element={<Search />} />
              <Route path="/search/:major" element={<DeptSearch />} />
              <Route path="/search/labs" element={<SearchLabs />} />
              <Route path="/search/labs/:LabName" element={<LabInfo />} />
              <Route path="/search/labs/:LabName/:Index" element={<LabBoard />} />
              <Route path="/tester" element={<Tester />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;

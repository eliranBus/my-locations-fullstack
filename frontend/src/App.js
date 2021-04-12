import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './global';
import Entities from './components/Entities';
import AddEntity from './components/AddEntity';
import Category from './components/Category';
import Location from './components/Location';
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import {fetchCategories} from './redux/actions/categoriesActions';
import {fetchLocations} from './redux/actions/locationsActions';

export const toCamelCase = (string) => {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories(dispatch);
    fetchLocations(dispatch);
  }, [dispatch])

  return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className="App">
          <Router basename="/">
            <Header />
            <Switch>
              <Route exact path="/">
                <Entities />
              </Route>
              <Route path="/categories/:category">
                <Category />
              </Route>
              <Route path="/locations/:location">
                <Location />
              </Route>
              <Route path={["/add-category", "/add-location"]}>
                <AddEntity />
              </Route>
            </Switch>
            <BottomBar/>
          </Router>
        </div>
      </ThemeProvider>
  );
}

export default App;

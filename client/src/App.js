import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import Blogpost from './Blogpost'
import EditBlog from './EditBlog'
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />

        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route exact path='/blogs'>
            <Blog />
          </Route>
          <Route exact path='/blogs/create'>
            <CreateBlog />
          </Route>
          <Route path={'/blogs/:id/edit'} component={EditBlog} />
          <Route exact path={'/blogs/:id'} component={Blogpost} />
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

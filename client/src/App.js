import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header';
import CreatePost from './components/create_post';
import Notes from './components/Notes';
import Edit_Post from './components/Edit_Post';
import Teste from './components/Teste';


function App() {
  return (
    <Router>
      <Header></Header>
      <Route path="/" exact component={Notes}></Route>
      <Route path="/create-post" component={CreatePost}></Route>
      <Route path="/edit/:id" exact component={Edit_Post}></Route>
      <Route path="/teste" component={Teste}></Route>
    </Router>
  );
}

export default App;

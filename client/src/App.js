import React from 'react'
import './App.css'
import axios from 'axios'

import TickList from './components/ticklist/ticklist'
import Login from './components/login/login'
import Registration from './components/registration/registration'

const API = 'http://localhost:9000/'

function App() {
   return (
      <div>
         <Registration />
         <Login />
         <TickList />
      </div>
   );
}

export default App;

import React from 'react'
import './App.css'
import axios from 'axios'

import TickList from './components/ticklist'
import Login from './components/login'

const API = 'http://localhost:9000/'

function App() {
   return (
      <div>
         <Login />
         <TickList />
      </div>
   );
}

export default App;

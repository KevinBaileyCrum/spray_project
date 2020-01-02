import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const API = 'http://localhost:9000/'

class Tick extends React.Component{
    state = {
        ticks: []
    }

    componentDidMount() {
        console.log('here')
        axios.get(API)
            .then(res => {
                const ticks = res.data
                console.log(ticks)
                this.setState({ticks})
            })
    }

    render() {
        return (
            <ul>
                { this.state.ticks.map(tick => <li>{tick.routeName}</li>) }
            </ul>
        )
    }
}

function App() {
    return (
        <Tick />
    );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <Tick />
//       </header>
//     </div>
//   );
// }

export default App;


import React from 'react';
import './App.css';
import axios from 'axios'

const API = 'http://localhost:9000/'

class TickList extends React.Component{
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
                    <div className="tick-card-list">
                { this.state.ticks.map(tick =>
                    <table>
                        <tbody>
                            <tr>
                                <td>{tick.userName}</td>
                                <td>{tick.routeId}</td>
                                <td>{tick.date}</td>
                                <td>{tick.style}</td>
                                <td>{tick.notes}</td>
                                <td>{tick.stars}</td>
                                <td>{tick.routeName}</td>
                                <td>{tick.routeGrade}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                    </div>
        )
    }
}

function App() {
    return (
        <TickList />
    );
}

export default App;

import React from 'react'
import './ticklist.css'  // consider localized css
import axios from 'axios'

const API = 'http://localhost:9000/ticks' // pass this to component from app?

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
                <div className="tick-card-item" key={tick.tickId}>
                    <div className="tick-card">
                        <div className="tick-card-content">
                            <div className="tick-card-userName">{tick.userName}</div>
                            {/* <div className="tick-card-routeId">{tick.routeId}</div> */}
                            <div className="tick-card-date">{tick.date}</div>
                            <div className="tick-card-style">{tick.style}</div>
                            <div className="tick-card-notes">{tick.notes}</div>
                            <div className="tick-card-stars">{tick.stars}</div>
                            <div className="tick-card-routeName">{tick.routeName}</div>
                            <div className="tick-card-routeGrade">{tick.routeGrade}</div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default TickList
